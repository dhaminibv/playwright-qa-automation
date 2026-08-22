import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const API_BASE_URL = 'https://restful-booker.herokuapp.com';

function createBookingPayload() {
  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.number.int({ min: 100, max: 5000 }),
    depositpaid: true,
    bookingdates: {
      checkin: '2026-09-01',
      checkout: '2026-09-05'
    },
    additionalneeds: 'Breakfast'
  };
}

test('create booking and validate response @smoke @api', async ({ request }) => {
  const payload = createBookingPayload();

  const response = await request.post(`${API_BASE_URL}/booking`, {
    data: payload
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.bookingid).toBeTruthy();
  expect(body.booking.firstname).toBe(payload.firstname);
  expect(body.booking.lastname).toBe(payload.lastname);
  expect(body.booking.bookingdates.checkin).toBe(payload.bookingdates.checkin);
  expect(body.booking.bookingdates.checkout).toBe(payload.bookingdates.checkout);
});

test('create booking, retrieve it and validate the stored data @regression @api', async ({ request }) => {
  const payload = createBookingPayload();

  const createResponse = await request.post(`${API_BASE_URL}/booking`, {
    data: payload
  });

  expect(createResponse.ok()).toBeTruthy();

  const createBody = await createResponse.json();
  const bookingId = createBody.bookingid;

  const getResponse = await request.get(`${API_BASE_URL}/booking/${bookingId}`);

  expect(getResponse.status()).toBe(200);

  const getBody = await getResponse.json();

  expect(getBody.firstname).toBe(payload.firstname);
  expect(getBody.lastname).toBe(payload.lastname);
  expect(getBody.totalprice).toBe(payload.totalprice);
  expect(getBody.depositpaid).toBe(payload.depositpaid);
});

test('filter bookings by firstname and lastname @regression @api', async ({ request }) => {
  const payload = createBookingPayload();

  const createResponse = await request.post(`${API_BASE_URL}/booking`, {
    data: payload
  });

  const createBody = await createResponse.json();
  const bookingId = createBody.bookingid;

  const response = await request.get(`${API_BASE_URL}/booking`, {
    params: {
      firstname: payload.firstname,
      lastname: payload.lastname
    }
  });

  expect(response.status()).toBe(200);

  const bookingIds = await response.json();
  expect(bookingIds.map(item => item.bookingid)).toContain(bookingId);
});
