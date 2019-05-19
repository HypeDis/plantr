const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const GardenersRoutes = require('./routes/Gardeners.js');
app.use('/gardeners', GardenersRoutes);

app.get('/', (req, res, next) => {
  res.redirect('/gardeners');
});

app.use((err, req, res, next) => {
  res.send(err);
});

app.listen(PORT, () => {
  console.log(`connected on port ${PORT}`);
});
