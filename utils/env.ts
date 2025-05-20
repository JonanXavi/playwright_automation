import { config } from "dotenv";

config({
    path: `.env.${process.env.ENVIRONMENT || 'dev'}`,
    override: true,
});

export class ENV {
    public static readonly BASE_URL = process.env.URL;
    public static readonly USER = process.env.USER;
    public static readonly PASSWORD = process.env.PASSWORD;
}