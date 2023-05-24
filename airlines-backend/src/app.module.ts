import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './database/db-config';
import { AirportModule } from './airport/airport.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
    }),
    TypeOrmModule.forRoot(dbConfig()),
    AirportModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
