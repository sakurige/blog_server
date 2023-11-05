import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createCipheriv, createDecipheriv } from 'crypto';
@Injectable()
export class SharedService {
  #iv = '#ahxihxtpoiz!256';
  #key = this.confingSerive.get<string>('secret.key');

  constructor(
    private readonly confingSerive: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  // 加密
  async encode(str: string): Promise<string> {
    const cipher = createCipheriv('aes-256-ctr', this.#key, this.#iv);
    const encrypted = Buffer.concat([cipher.update(str), cipher.final()]);
    return encrypted.toString('hex');
  }
  // 解密
  async decode(str: string): Promise<string> {
    const decipher = createDecipheriv(
      'aes-256-ctr',
      this.#key,
      Buffer.from(this.#iv),
    );
    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(str, 'hex')),
      decipher.final(),
    ]);

    return decrpyted.toString();
  }
  // 生成token
  async generateToken(userId: number): Promise<{
    token: string;
    refresh_token: string;
  }> {
    const token = this.jwtService.sign(
      {
        userId: userId,
      },
      {
        expiresIn: '1d',
        secret: this.confingSerive.get<string>('jwt.JWT_SECRET'),
      },
    );

    const refresh_token = this.jwtService.sign(
      {
        userId: userId,
      },
      {
        expiresIn: '7d',
        secret: this.confingSerive.get<string>('jwt.JWT_SECRET'),
      },
    );
    return {
      token,
      refresh_token,
    };
  }
}
