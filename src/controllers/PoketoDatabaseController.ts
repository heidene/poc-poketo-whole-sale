import { eq, and } from "drizzle-orm";

import * as schema from "../db/schema";
import { db } from "../db/db";

export class PoketoDatabaseController {
  constructor() { }

  async getUser(name: string) {
    const result = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.name, name))
      .limit(1);

    return result[0];
  }

  async getOpenOrder(userId: number) {
    const orders = await db
      .select()
      .from(schema.orders)
      .where(
        and(eq(schema.orders.open, true), eq(schema.orders.userId, userId)),
      )
      .limit(1);

    return orders[0];
  }

  async closeOrder(userId: number) {
    return db
      .update(schema.orders)
      .set({ open: false })
      .where(
        and(eq(schema.orders.open, true), eq(schema.orders.userId, userId)),
      );
  }

  async addToOrder(userId: number, name: string) {
    const order = (await this.getOpenOrder(userId)) as {
      count: number;
      orderData: { [key: string]: number };
    };

    if (order) {
      const { count, orderData } = order;

      if (orderData.hasOwnProperty(name)) {
        orderData[name] += 1;
      } else {
        orderData[name] = 1;
      }

      return db
        .update(schema.orders)
        .set({
          count: count + 1,
          orderData,
        })
        .where(
          and(eq(schema.orders.open, true), eq(schema.orders.userId, userId)),
        );
    } else {
      const orderData: { [key: string]: number } = {};
      orderData[name] = 1;

      return db.insert(schema.orders).values({
        userId: userId,
        count: 1,
        orderData,
        open: true,
      });
    }
  }

  async removeFromOrder(userId: number, name: string) {
    const order = (await this.getOpenOrder(userId)) as {
      count: number;
      orderData: { [key: string]: number };
    };

    if (order) {
      const { count, orderData } = order;
      let amount = 0;

      if (orderData.hasOwnProperty(name)) {
        amount = orderData[name];
        delete orderData[name];
      }
      const results = await db
        .update(schema.orders)
        .set({
          count: count - amount,
          orderData,
        })
        .where(
          and(eq(schema.orders.open, true), eq(schema.orders.userId, userId)),
        )
        .returning();
      return results[0];
    }
  }
}
