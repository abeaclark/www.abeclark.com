
exports.onRenderBody = (
  { setHeadComponents, setHtmlAttributes, setBodyAttributes },
  pluginOptions
) => {
  setHeadComponents([
    <title>Winner of Survivor 43: Abe Clark</title>,
    <meta property="og:title" content="Caution: Only cast me if you're ok with me winning." />,
    <meta property="og:url" content="https://www.abeclark.com" />,
    <meta property="og:image" content="https://media.giphy.com/media/l378ohXSiuBGPdEaI/giphy.gif" />,
  ])
}