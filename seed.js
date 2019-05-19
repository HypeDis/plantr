const { db, Gardener, Vegetable, Plot } = require('./models.js');

const insertVegetable = (name, color = null, planted_on = Date.now()) => {
  return Vegetable.create({
    name,
    color,
    planted_on,
  });
};

const insertPlot = (size, shaded = false) => {
  return Plot.create({ size, shaded });
};

const insertGardener = (name, age) => {
  return Gardener.create({ name, age });
};

db.sync({ force: true })
  .then(() => {
    console.log('synced');
    return Promise.all([
      insertVegetable('mushrooms', 'brown'),
      insertVegetable('broccoli', 'green'),
      insertVegetable('garlic', 'white', '2012-08-30'),
      insertPlot(5000, true),
      insertPlot(400),
      insertPlot(6000, false),
      insertGardener('Roy', 29),
      insertGardener('Benson', 27),
      insertGardener('Mark', 31),
    ]);
  })
  .then(
    ([mushrooms, broccoli, garlic, plot1, plot2, plot3, roy, benson, mark]) =>
      Promise.all([
        benson.setFavorite_vegetable(broccoli),
        roy.setFavorite_vegetable(mushrooms),
        mark.setFavorite_vegetable(garlic),
        plot1.setGardener(roy),
        plot2.setGardener(benson),
        plot3.setGardener(mark).then(curPlot => {
          return curPlot.setVegetables([broccoli, garlic, mushrooms], {
            through: 'vegetable_plot',
          });
        }),
        garlic.setPlots([plot1, plot2], { through: 'vegetable_plot' }),
      ])
  )
  // .then(([benson, roy, mark, plot1, plot2, plot3_vegs, garlic_plots]) => {
  //   // do something
  //   return Vegetable.findOne({ where: { name: 'garlic' } });
  // })
  // .then(garlic => {
  //   return garlic.getPlots();
  // })
  // .then(garlicPlots => {
  //   console.log(garlicPlots.map(garlicPlot => garlicPlot.get()));
  // })
  .catch(err => {
    console.error('Error: ', err);
  })
  .finally(() => {
    console.log('closed');
    db.close();
  });
