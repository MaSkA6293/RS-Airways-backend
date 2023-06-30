import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { UserIsExistPipe } from './user.isExist.pipe';
import { UserModel } from './models/user.model';

@ApiTags('User')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 201, type: UserModel })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserModel] })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: UserModel })
  @ApiParam({ type: 'String', name: 'uuid' })
  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('uuid', ParseUUIDPipe, UserIsExistPipe) user: UserEntity,
  ) {
    return user;
  }

  @ApiOperation({ summary: 'Remove user by id' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The record was deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The user with this id, does not exist',
  })
  @Delete(':uuid')
  @ApiParam({ type: 'String', name: 'uuid' })
  @HttpCode(204)
  async remove(
    @Param('uuid', ParseUUIDPipe, UserIsExistPipe) user: UserEntity,
  ): Promise<void> {
    return await this.userService.remove(user.id);
  }
}
