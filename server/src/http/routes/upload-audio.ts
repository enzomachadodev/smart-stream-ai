import { eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import { generateEmbeddings, transcribeAudio } from "../../services/gemini.ts";

export const uploadAudioRoute: FastifyPluginCallbackZod = (app) => {
	app.post(
		"/rooms/:roomId/audio",
		{
			schema: {
				params: z.object({
					roomId: z.string(),
				}),
			},
		},
		async (request, reply) => {
			const { roomId } = request.params;

			const room = await db
				.select()
				.from(schema.rooms)
				.where(eq(schema.rooms.id, roomId))
				.limit(1);

			if (!room.length) {
				return reply.status(404).send({ error: "Room not found" });
			}

			const audio = await request.file();

			if (!audio) {
				throw new Error("No audio file provided");
			}

			const audioBuffer = await audio.toBuffer();
			const audioAsBase64 = audioBuffer.toString("base64");

			const transcription = await transcribeAudio(
				audioAsBase64,
				audio.mimetype
			);

			const embeddings = await generateEmbeddings(transcription);

			const result = await db
				.insert(schema.audioChunks)
				.values({
					roomId,
					transcription,
					embeddings,
				})
				.returning();

			const insertedChunk = result[0];

			if (!insertedChunk) {
				throw new Error("Failed to save audio chunk");
			}

			return reply.status(201).send({ chunkId: insertedChunk.id });
		}
	);
};
