import { PokeCard } from "../components/pokecard";

function Pagination(props: Html.PropsWithChildren<{ prev: string | null; next: string | null; currentOffset: number; userId: number; }>) {
  return (
    <div class="flex justify-center gap-4">
      {props.prev ? <button type="button" class="nes-btn is-primary" hx-get={`/poketo-list?offset=${props.currentOffset - 20}&userId=${props.userId}`} hx-trigger="click"
        hx-target="#poketo-list"
        hx-swap="outerHTML transition:true">Prev</button> : <button type="button" class="nes-btn is-disabled">Prev</button>}
      {props.next ? <button type="button" class="nes-btn is-success" hx-get={`/poketo-list?offset=${props.currentOffset + 20}&userId=${props.userId}`} hx-trigger="click"
        hx-target="#poketo-list"
        hx-swap="outerHTML transition:true">Next</button> : <button type="button" class="nes-btn is-disabled">Prev</button>}
    </div>
  );
}

export async function PoketoList(props: Html.PropsWithChildren<{ offset: number; userId: number; }>) {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=" + props.offset);
  const body = await response.text();
  const data = JSON.parse(body);

  const cards = [];
  for (const pokemon of data.results) {
    cards.push(
      <PokeCard
        name={pokemon.name}
        url={pokemon.url}
        userId={props.userId}
      />);
  }
  return (
    <div id="poketo-list" class="sample-transition">
      <div class="flex justify-center flex-wrap gap-8 mb-8">{cards}</div>
      <Pagination prev={data.previous} next={data.next} currentOffset={props.offset} userId={props.userId} />
      <dialog class="nes-dialog" id="poke-dialog">
        <form method="dialog">
          <div id="poke-dialog-content"></div>
          <menu class="dialog-menu flex">
            <div class="ml-a">
              <button class="nes-btn">Cancel</button>
            </div>
          </menu>
        </form>
      </dialog>
    </div>
  );
}
