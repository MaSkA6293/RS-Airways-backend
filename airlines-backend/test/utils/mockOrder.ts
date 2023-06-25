import { CreateOrderDto } from 'src/booking/dto/create-order.dto';

export const mockOrder: CreateOrderDto = {
  order: [
    {
      passengers: {
        adult: [
          {
            firstName: 'John',
            lastName: 'Doe',
            gender: 'male',
            dateOfBirth: new Date('1987-11-06T21:00:00.000Z'),
            specialAssistance: false,
            baggage: {
              light: 1,
              medium: 1,
            },
          },
          {
            firstName: 'Ben',
            lastName: 'Homor',
            gender: 'male',
            dateOfBirth: new Date('1989-11-06T21:00:00.000Z'),
            specialAssistance: true,
            baggage: {
              heavy: 1,
            },
          },
        ],
      },
      flights: [],
    },
  ],
};
