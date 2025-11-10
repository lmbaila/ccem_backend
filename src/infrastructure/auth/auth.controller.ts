import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Post('login')
  @ApiOperation({ summary: 'Autentica e gera JWT' })
  @ApiBody({ type: LoginDto })
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.username, dto.password);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  @ApiOperation({ summary: 'Perfil autenticado' })
  profile(@Req() req: any) {
    return this.auth.profile(req.user.sub);
  }
}
