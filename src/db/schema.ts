import {
  sqliteTable,
  text,
  integer,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name"),
  password: text("password"),
});

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey(),
  userId: integer("userId").references(() => users.id),
  count: integer("count"),
  open: integer("open", { mode: 'boolean' } ).default(true),
  orderData: text("poketo", { mode: 'json' }),
});
