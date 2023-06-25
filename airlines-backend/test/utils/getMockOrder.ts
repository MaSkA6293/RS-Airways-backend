import { CreateOrderDto } from 'src/booking/dto/create-order.dto';
import { getTwoFlights } from './getTwoFlights';
import { mockOrder } from './mockOrder';

export const getMockOrder = async (request): Promise<CreateOrderDto> => {
  const order = mockOrder;

  order.order[0].flights = await getTwoFlights(request);

  return order;
};
