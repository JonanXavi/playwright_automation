import { fakerES_MX as faker } from '@faker-js/faker';

export const generateUserData = () => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        zip: faker.location.zipCode()
    };
}

export const generateBookingData = () => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        totalPrice: faker.number.int({ min: 100, max: 1000 }),
        depositPaid: faker.datatype.boolean(),
        bookingDates: {
            checkin: faker.date.soon().toISOString().split('T')[0],
            checkout: faker.date.future().toISOString().split('T')[0]
        },
        additionalNeeds: faker.helpers.arrayElement(['Breakfast', 'Dinner', 'None'])
    };
}