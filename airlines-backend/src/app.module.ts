import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './database/db-config';
import { AirportModule } from './airport/airport.module';
import { FlightModule } from './flight/flight.module';
import { LoggerModule } from './middlewares/logger/logger.module';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { AirportService } from './airport/airport.service';
import { FlightService } from './flight/flight.service';
import { AirportEntity } from './airport/entities/airport.entity';
import { FlightEntity } from './flight/entities/flight.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
    }),
    TypeOrmModule.forRoot(dbConfig()),
    TypeOrmModule.forFeature([FlightEntity, AirportEntity]),
    AirportModule,
    FlightModule,
    LoggerModule,
    UserModule,
    AuthModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AirportService, FlightService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
