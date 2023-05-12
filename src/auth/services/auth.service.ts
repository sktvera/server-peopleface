import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.class';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }

  doesUserExist(email: string): Observable<boolean> {
    return from(this.userRepository.findOne({ email })).pipe(
      switchMap((user: User) => {
        return of(!!user);
      }),
    );
  }

  registerAccount(user: User): Observable<User> {
    const { firstName, lastName, email, password } = user;

    return this.doesUserExist(email).pipe(
      tap((doesUserExist: boolean) => {
        if (doesUserExist)
          throw new HttpException(
            'A user has already been created with this email address',
            HttpStatus.BAD_REQUEST,
          );
      }),
      switchMap(() => {
        return this.hashPassword(password).pipe(
          switchMap((hashedPassword: string) => {
            return from(
              this.userRepository.save({
                firstName,
                lastName,
                email,
                password: hashedPassword,
              }),
            ).pipe(
              map((user: User) => {
                delete user.password;
                return user;
              }),
            );
          }),
        );
      }),
    );
  }

  validateUser(email: string, password: string): Observable<User> {
    return from(
      this.userRepository.findOne(
        { email },
        {
          select: ['id', 'firstName', 'lastName', 'email', 'password', 'role'],
        },
      ),
    ).pipe(
      switchMap((user: User) => {
        if (!user) {
          throw new HttpException(
            { status: HttpStatus.FORBIDDEN, error: 'Invalid Credentials' },
            HttpStatus.FORBIDDEN,
          );
        }
        return from(bcrypt.compare(password, user.password)).pipe(
          map((isValidPassword: boolean) => {
            if (isValidPassword) {
              delete user.password;
              return user;
            }
          }),
        );
      }),
    );
  }

  login(user: User): Observable<{ token: string, user: User }> {
    const { email, password } = user;
    return this.validateUser(email, password).pipe(
      switchMap((user: User) => {
        if (user) {
          // create JWT - credentials
          return from(this.jwtService.signAsync({ user })).pipe(
            map((token: string) => ({ token, user })),
          );
        }
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }),
    );
  }

  getJwtUser(jwt: string): Observable<User | null> {
    return from(this.jwtService.verifyAsync(jwt)).pipe(
      map(({ user }: { user: User }) => {
        return user;
      }),
      catchError(() => {
        return of(null);
      }),
    );
  }



  getAllUsers(): Observable<User[]> {
    return from(this.userRepository.find()).pipe(
      map((users: UserEntity[]) =>
        users.map((user: UserEntity) => this.mapUserEntityToUser(user))
      )
    );
  }

  // Helper method to map UserEntity to User class
  private mapUserEntityToUser(userEntity: UserEntity): User {
    const user: User = {
      id: userEntity.id,
      firstName: userEntity.firstName,
      lastName: userEntity.lastName,
      email: userEntity.email,
      password: userEntity.password,
      imagePath: userEntity.imagePath,
      role: userEntity.role,
      posts: userEntity.feedPosts,
    };
    delete user.password;
    return user;
  }


}
