import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const { email, senha } = loginDto;
        const token = await this.authService.login(email, senha);
        return { token };
    }
    
}
