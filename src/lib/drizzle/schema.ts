import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const urls = sqliteTable('urls', {
    id: text('id').primaryKey(),
    url: text('url').notNull(),
});