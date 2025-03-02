import { test, expect } from '@playwright/test';
import { getAuthToken } from '../../utils/helpers';
import { generateBookingData } from '../../utils/testdata';

test.describe('Verify that Booking APIs works correctly', { tag: '@api'}, () => {
    let authToken: string;

    test.beforeAll(async () => {
        authToken = await getAuthToken();
    });

    test('[GET] - Retrieve the reservation list', async ({ request }) => {
        const response = await request.get(`/booking`);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.length).toBeGreaterThan(0);
        expect(responseBody[0]).toHaveProperty('bookingid');
    })

    test('[POST] - Create a new reservation', async ({ request }) => {
        const bookingData = generateBookingData();

        const response = await request.post(`/booking`, {
            data: {
                "firstname": bookingData.firstName,
                "lastname": bookingData.lastName,
                "totalprice": bookingData.totalPrice,
                "depositpaid": bookingData.depositPaid,
                "bookingdates": {
                    "checkin": bookingData.bookingDates.checkin,
                    "checkout": bookingData.bookingDates.checkout
                },
                "additionalneeds": bookingData.additionalNeeds
            }
        });
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const responseBody = await response.json()
        expect(responseBody.booking).toHaveProperty("firstname", bookingData.firstName);
        expect(responseBody.booking).toHaveProperty("lastname", bookingData.lastName);
        expect(responseBody.booking).toHaveProperty("totalprice", bookingData.totalPrice);
        expect(responseBody.booking).toHaveProperty("depositpaid", bookingData.depositPaid);
    })

    test('[PATCH] - Update partial reservation details', async ({ request }) => {
        const bookingData = generateBookingData();

        const updateRequest = await request.patch(`/booking/2`, {
            headers: {
                'Cookie': `token=${authToken}`
            },
            data: {
                "firstname": bookingData.firstName,
                "lastname": bookingData.lastName,
                "additionalneeds": bookingData.additionalNeeds
            }
        });
        expect(updateRequest.status()).toBe(200);

        const responseBody = await updateRequest.json();
        expect(responseBody.firstname).toBe(bookingData.firstName);
        expect(responseBody.lastname).toBe(bookingData.lastName);
        expect(responseBody.additionalneeds).toBe(bookingData.additionalNeeds);
    })

    test('[DELETE] - Delete a reservation', async ({ request }) => {

        const deleteRequest = await request.delete(`/booking/1`, {
            headers: {
                'Cookie': `token=${authToken}`
            },
        });
        expect(deleteRequest.status()).toBe(201);
        expect(deleteRequest.statusText()).toBe('Created');
    })
});