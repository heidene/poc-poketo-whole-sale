import { DefaultLayout } from "../layout/default";
import { Header } from "../components/header";

/*
 * All information that a card needs:
 * name
 * quantity
 *
 */

export function CartOverviewPage(
  props: Html.PropsWithChildren<{
    order:
    | {
      open: boolean | null;
      id: number;
      userId: number | null;
      count: number | null;
      orderData: unknown;
    }
    | undefined;
  }>,
) {
  const orderData = props.order?.orderData as { [key: string]: number };
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
          <input class="hidden" name="poketoName" type="text" value={poke} />
          <input
            class="hidden"
            name="userId"
            type="number"
            value={props.order?.userId?.toString() ?? ""}
          />
          <button class="nes-btn is-error" type="submit">
            X
          </button>
        </form>
      </li>,
    );
  }

  return (
    <DefaultLayout title="Hello Pokemen whole saler">
      <Header orderCount={props.order?.count ?? 0} />
      <br />
      <main
        id="order-content"
        hx-on-htmx-before-swap="htmx.trigger('body', 'updateCart')"
      >
        <h2>My Order</h2>
        <ul id="order-list" class="flex flex-col gap-4">
          {poketos}
        </ul>
        <div class="flex gap-4">
          <button class="nes-btn is-error">Cancel</button>
          <form class="contents" hx-post="/buy" hx-target="#order-content">
            <input
              class="hidden"
              name="userId"
              type="number"
              value={props.order?.userId?.toString() ?? ""}
            />
            <button class="nes-btn is-primary" type="submit">
              Buy
            </button>
          </form>
        </div>
      </main>
    </DefaultLayout>
  );
}
