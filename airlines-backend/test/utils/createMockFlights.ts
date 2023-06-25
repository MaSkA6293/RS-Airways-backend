import * as moment from 'moment';
import { AirportEntity } from '../../src/airport/entities/airport.entity';
import { MOCK_FLIGHT_DAYS, SEATS_TOTAL } from '../../src/flight/constants';
import { CreateFlightDto } from '../../src/flight/dto/create-flight.dto';
import {
  getFlightDuration,
  getPrice,
  getRandomDate,
  getRandomIntInclusive,
} from '../../src/utils';
import { flightsRoutes } from '../endpoints';

export const createMockFlights = async (airports: AirportEntity[], request) => {
  const flightsArr = airports.reduce((prev, curr, index, arr) => {
    const promArr = [];

    for (let i = 0; i < arr.length; i++) {
      if (i === index) {
        continue;
      }

      for (let j = 0; j < MOCK_FLIGHT_DAYS; j++) {
        const createFlightDto = {
          fromId: curr.id,
          toId: arr[i].id,
          takeOffDate: moment(getRandomDate()).add(j, 'days').toDate(),
          seatsAvailable: getRandomIntInclusive(0, SEATS_TOTAL),
          seatsTotal: SEATS_TOTAL,
          price: getPrice(getFlightDuration(curr.gps, arr[i].gps)),
        } as CreateFlightDto;

        const createResponse = new Promise((resolve) => {
          resolve(
            request
              .post(flightsRoutes.create)
              .set('Accept', 'application/json')
              .send(createFlightDto),
          );
        });
        promArr.push(createResponse);
      }
    }
    return [...prev, promArr];
  }, []);

  return await Promise.all(flightsArr);
};
