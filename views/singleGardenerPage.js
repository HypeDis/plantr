module.exports = function(gardener, veggies) {
  const plot = gardener.plot;
  const page = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Plantr</title>
      <!-- other metadata, links to css -->
    </head>
    <body>
    <h1> ${gardener.name} </h1>
    <h2> Plot ${plot.id}</h2>
    <h2>Veggies Grown</h2>
    <ul>
      ${veggies
        .map(veggy => {
          return `<li>
          <div>
            ${veggy.name}
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
