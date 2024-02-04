import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { HomePage } from "./pages/home";
import { PoketoList } from "./controllers/listcontroller";
import { PokeDetails } from "./controllers/detailcontroller";
import { CartOverviewPage } from "./pages/cartOverview";
import { PoketoDatabaseController } from "./controllers/PoketoDatabaseController";

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .decorate("db", new PoketoDatabaseController())
  .get("/", async ({ db }) => {
    const user = await db.getUser("ash");
    const openOrder = await db.getOpenOrder(user.id);
    return <HomePage user={user} orderCount={openOrder?.count ?? 0} />;
  })
  .get("/cartOverview", async ({ db }) => {
    const user = await db.getUser("ash");
    const openOrder = await db.getOpenOrder(user.id);
    return <CartOverviewPage order={openOrder} />;
  })
  .get("/poketo-list", ({ query }) => (
    <PoketoList
      offset={Number.parseInt(query.offset ?? "0")}
      userId={Number.parseInt(query.userId ?? "0")}
    />
  ))
  .get("/addToCartButton", async ({ db }) => {
    const user = await db.getUser("ash");
    const openOrder = await db.getOpenOrder(user.id);
    return openOrder?.count ?? 0 > 0 ? (
      <a href="/cartOverview" class="nes-btn">
        My Cart ({openOrder.count})
      </a>
    ) : (
      <></>
    );
  })
  .get("/detail", ({ query }) => <PokeDetails name={query.name ?? ""} />)
  .post(
    "/addToCart",
    ({ db, body }) => {
      return db.addToOrder(Number.parseInt(body.userId), body.poketoName);
    },
    { body: t.Object({ userId: t.String(), poketoName: t.String() }) },
  )
  .delete(
    "/removeFromCart",
    async ({ db, body }) => {
      const deleted = await db.removeFromOrder(
        Number.parseInt(body.userId),
        body.poketoName,
      );

      const orderData = deleted?.orderData as { [key: string]: number };
      const poketos = [];

      for (const poke in orderData) {
        poketos.push(
          <li class="nes-container flex items-center gap-4">
            <img
              src={`https://img.pokemondb.net/sprites/red-blue/normal/${poke}.png`}
            />
            <span class="uppercase">{poke}</span>
            <span class="ml-auto">{orderData[poke]}</span>
            <form
              class="contents"
              hx-delete="/removeFromCart"
              hx-target="#order-list"
            >
              <input
                class="hidden"
                name="poketoName"
                type="text"
                value={poke}
              />
              <input
                class="hidden"
                name="userId"
                type="number"
                value={deleted?.userId?.toString() ?? ""}
              />
              <button class="nes-btn is-error" type="submit">
                X
              </button>
            </form>
          </li>,
        );
      }
      return <>{poketos}</>;
    },
    { body: t.Object({ userId: t.String(), poketoName: t.String() }) },
  )
  .post(
    "/buy",
    async ({ db, body }) => {
      await db.closeOrder(Number.parseInt(body.userId));
      return (<>
        <h2>Thank you for buying with Poketo monster whole sale!</h2>
      </>)
    },
    { body: t.Object({ userId: t.String() }) },
  )
  .listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
