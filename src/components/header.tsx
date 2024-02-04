export const Header = (
  props: Html.PropsWithChildren<{
    orderCount: number;
  }>,
) => (
  <header class="nes-container flex justify-between items-center">
    <a class="flex gap-sm justify-center" href="/">
      <i class="nes-ash"></i>
      <h1 class="flex-self-center nes-text is-primary">
        Poketo monster whole saler
      </h1>
      <i class="nes-pokeball w-6 h-6"></i>
    </a>
      <div class="contents" hx-get="/addToCartButton" hx-trigger="updateCart from:body">
    {props.orderCount > 0 ? <a href="/cartOverview" class="nes-btn">My Cart ({props.orderCount})</a> : <></>}
    </div>
  </header>
);
