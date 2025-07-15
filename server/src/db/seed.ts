import { reset, seed } from "drizzle-seed";
import { db, sql } from "./connection.ts";
import { schema } from "./schema/index.ts";

console.log("Resetting database...");

await reset(db, schema);

console.log("Database reset complete. Seeding data...");

await seed(db, { rooms: schema.rooms, questions: schema.questions }).refine(
	(f) => {
		return {
			rooms: {
				count: 20,
				columns: {
					name: f.companyName(),
					description: f.loremIpsum(),
				},
			},
			questions: {
				count: 50,
			},
		};
	}
);

await sql.end();

console.log("Database reset and seeded successfully.");
