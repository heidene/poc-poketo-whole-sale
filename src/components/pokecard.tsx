export function PokeCard(
  props: Html.PropsWithChildren<{
    name: string;
    url: string;
    userId: number;
  }>,
) {
  return (
    <div class="nes-container is-rounded inline-flex flex-col">
      <img
        src={`https://img.pokemondb.net/sprites/red-blue/normal/${props.name}.png`}
      />
      <h3 class="text-center">{props.name}</h3>
      <div class="flex gap-4">
        <button
          class="nes-btn"
          hx-get={`/detail?name=${props.name}`}
          hx-trigger="click"
          hx-target="#poke-dialog-content"
          hx-swap="innerHTML"
          hx-on-htmx-after-request="document.getElementById('poke-dialog').showModal();"
        >
          Details
        </button>
        <form
          class="contents"
          hx-post="/addToCart"
          hx-swap="none"
          hx-on-htmx-after-request="htmx.trigger('body', 'updateCart')"
        >
          <input
            class="hidden"
            name="poketoName"
            type="text"
            value={props.name}
          />
          <input
            class="hidden"
            name="userId"
            type="number"
            value={props.userId.toString()}
          />
          <button class="nes-btn" type="submit">
            +
          </button>
        </form>
      </div>
    </div>
  );
}
