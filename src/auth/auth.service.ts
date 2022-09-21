import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserLoginType } from './types/user-login.type';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
    private jwtService: JwtService
  ) {}
  
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async createLogin(userLoginParams: UserLoginType) {
    const user = await this.validateUser(userLoginParams.email,userLoginParams.password)
    if(user){
      return {
        access_token: this.jwtService.sign(user),
        user: user
      };
    }else{
      throw new UnauthorizedException();
    }
  }
}
