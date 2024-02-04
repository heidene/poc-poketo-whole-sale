export async function PokeDetails(props: Html.PropsWithChildren<{ name: string; }>) {
  const pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`);
  const pokeBody = await pokeResponse.text();
  const pokeData = JSON.parse(pokeBody);

  const types = [];
  for (const type of pokeData.types) {
    types.push(
      <div class="nes-badge">
        <span class="is-dark">{type.type.name}</span>
      </div>
    );
  }

  return (
    <div>
      <div class="flex gap-4 mb-4">
        <img class="h-32 w-32" src={pokeData.sprites.front_default} alt={pokeData.name} />
        <div>
          <dl>
            <div class="flex gap-4">
              <dt>Nr.</dt>
              <dd>{pokeData.id}</dd>
            </div>
            <div class="flex gap-4">
              <dt>Name</dt>
              <dd>{pokeData.name}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div class="flex gap-4">
        {types}
      </div>
    </div>);
}
