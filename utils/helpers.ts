import { request } from '@playwright/test';
import { ENV } from './env'

const API_URL = ENV.BASE_URL;
const CREDENTIALS = {
    username: ENV.USER,
    password: ENV.PASSWORD
};

export async function getAuthToken(): Promise<string> {
    const context = await request.newContext();
    const response = await context.post(`${API_URL}/auth`, {
        data: CREDENTIALS
    });

    const responseBody = await response.json();
    return responseBody.token;
}
