import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
@Injectable()
export class SharedService {
  #iv = randomBytes(16);
  #key = this.confingSerive.get<string>('secret.key');

  constructor(private readonly confingSerive: ConfigService) {}
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
}
