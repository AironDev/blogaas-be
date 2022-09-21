import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { LocalStrategy } from './utils/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config';
import { JwtStrategy } from './utils/jwt-strategy';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    PassportModule, 
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: '37000060s' },
    })
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
    LocalStrategy,
    JwtStrategy
  ],
})
export class AuthModule {}
