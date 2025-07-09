import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";
import { createQuestionRoute } from "./http/routes/create-question-route.ts";
import { createRoomRoute } from "./http/routes/create-room.ts";
import { getRoomQuestionsRoute } from "./http/routes/get-room-questions.ts";
import { getRoomsRoute } from "./http/routes/get-rooms.ts";

const port = env.PORT;

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	origin: "http://localhost:5173",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get("/health", () => {
	return "OK";
});

app.register(getRoomsRoute);
app.register(createRoomRoute);
app.register(getRoomQuestionsRoute);
app.register(createQuestionRoute);

app.listen({ port }).then(() => {
	console.log(`Server is running on http://localhost:${port}`);
});
