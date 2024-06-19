import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { MailerService } from './mailer.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    };
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<User> {
    const newUser = await this.usersService.create({
      email,
      password: password,
      first_name: firstName,
      last_name: lastName,
    });
    return newUser;
  }

  async sendPasswordResetEmail(email: string) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new Error('User not found');
    }

    const token = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { expiresIn: '1h' },
    );
    const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;
    const mailText = `Please click the following link to reset your password: ${resetUrl}`;

    await this.mailerService.sendMail(email, 'Password Reset', mailText);
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findOne(payload.email);
      if (!user) {
        throw new Error('User not found');
      }

      await this.usersService.update(user.id, { password: newPassword });
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const decoded = this.jwtService.verify(token);
      return !!decoded;
    } catch (error) {
      return false;
    }
  }
}
