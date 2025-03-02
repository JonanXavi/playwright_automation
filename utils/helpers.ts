import { request } from '@playwright/test';

const API_URL = 'https://restful-booker.herokuapp.com';
const CREDENTIALS = {
    username: 'admin',
    password: 'password123'
};

export async function getAuthToken(): Promise<string> {
    const context = await request.newContext();
    const response = await context.post(`${API_URL}/auth`, {
        data: CREDENTIALS
    });

    const responseBody = await response.json();
    return responseBody.token;
}
