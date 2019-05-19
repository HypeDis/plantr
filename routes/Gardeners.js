const express = require('express');
const router = express.Router();

const { Gardener, Plot, Vegetable } = require('./../models.js');

const gardenersPage = require('../views/gardenersPage.js');
const singleGardenerPage = require('../views/singleGardenerPage.js');

router.get('/', (req, res, next) => {
  Gardener.findAll()
    .then(gardeners => {
      const gardenersData = gardeners.map(gardener => gardener.get());
      res.send(gardenersPage(gardenersData));
      // console.log('gardener html', usersPage(gardenersData));
      // res.send('hi');
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Gardener.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Plot,
    },
  })
    .then(gardener => {
      if (!gardener) {
        return res.send('user not found');
      }
      return gardener;
    })
    .then(gardenerAndPlot => {
      return Promise.all([
        gardenerAndPlot,
        gardenerAndPlot.plot.getVegetables(),
      ]);
    })
    .then(([gardenerAndPlot, veggies]) => {
      res.send(singleGardenerPage(gardenerAndPlot, veggies));
    })
    .catch(next);
});

module.exports = router;
