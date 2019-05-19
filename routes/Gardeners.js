const express = require('express');
const router = express.Router();

const { Gardener, Plot, Vegetable } = require('./../models.js');

router.get('/', (req, res, next) => {
  Gardener.findAll()
    .then(gardeners => {
      const gardenerData = gardeners.map(gardener => gardener.get());
      res.json(gardenerData);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Gardener.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(gardener => {
      if (!gardener) {
        return res.send('user not found');
      }
      res.json(gardener.get());
    })
    .catch(next);
});

module.exports = router;
