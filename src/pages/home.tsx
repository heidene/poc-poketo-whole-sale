import { DefaultLayout } from "../layout/default";
import { Header } from "../components/header";

export function HomePage(
  props: Html.PropsWithChildren<{
    user: { name: string | null; id: number; password: string | null };
    orderCount: number;
  }>,
) {
  const scriptText = `
    const loader = document.getElementById('poketo-list-loader');
    setInterval(function(addition) {
      const value = loader.value;
      loader.value = value + addition;
    }, 250, 5)
  `;

  return (
    <DefaultLayout title="Hello Pokemen whole saler">
      <Header orderCount={props.orderCount} />
      <br />
      <main>
        <div
          class="mt-32"
          hx-get={`/poketo-list?offset=0&userId=${props.user.id}`}
          hx-trigger="load delay:250ms"
          hx-swap="outerHTML"
        >
          <progress
            id="poketo-list-loader"
            class="nes-progress is-pattern"
            value="50"
            max="100"
          ></progress>
          <script type="text/javascript">{scriptText}</script>
        </div>
      </main>
    </DefaultLayout>
  );
}
