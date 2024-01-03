import { exit } from "node:process";
import * as dotenv from "dotenv";
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import {migrate} from "drizzle-orm/libsql/migrator";
import * as schema from "./schema";
dotenv.config();

// create the connection
const client = createClient({ url: process.env.DATABASE_URL!, authToken: process.env.DATABASE_AUTH_TOKEN });

export const db = drizzle(client, {schema });

await migrate(db, { migrationsFolder: "drizzle" });
exit();
