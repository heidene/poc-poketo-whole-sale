import { db } from "./db";
import * as schema from "./schema";

await db.insert(schema.users).values({ name: "ash", password: "ash123" }).run();
