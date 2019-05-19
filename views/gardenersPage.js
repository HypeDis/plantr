module.exports = function(gardeners) {
  const page = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Plantr</title>
      <!-- other metadata, links to css -->
    </head>
    <body>
    <h1> Gardeners </h1>
    <ul>
      ${gardeners
        .map(gardener => {
          return `<li>
          <div>
            <a href="/gardeners/${gardener.id}">${gardener.name}</a>
          </div>
        </li>`;
        })
        .join('')}
    </ul>

    </body>
  </html>
  `;
  return page;
};
