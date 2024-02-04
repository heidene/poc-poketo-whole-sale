export function DefaultLayout(props: Html.PropsWithChildren<{ title?: string }>) {
  return (
    <html lang='en' class="min-h-svh">
      <head>
        <title>{props.title}</title>
        <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet" />
        <script src="https://unpkg.com/htmx.org@1.9.10" integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC" crossorigin="anonymous"></script>
        <link href="https://unpkg.com/nes.css@latest/css/nes.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script>
        <link href="/public/style.css" rel="stylesheet" />
      </head>
      <body class="overflow-x-hidden p-4 flex flex-col min-h-svh">
        <div class="nes-container grow">
          {props.children}
        </div>
      </body>
    </html>
  )
}
