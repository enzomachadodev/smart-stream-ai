import { z } from "zod";

const envSchema = z.object({
	PORT: z.coerce.number().default(4000),
	DATABASE_URL: z.string().url().startsWith("postgres://"),
	GOOGLE_GENAI_API_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
