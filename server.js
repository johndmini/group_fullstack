const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(
  'mongodb://localhost:27017/socialeventsDB',
  console.log('Connected to MongoDB')
);

app.use('/users', require('./routes/userRoutes'));
app.use('/submissions', require('./routes/submissionRoutes'));

app.use((err, req, res, next) => {
  console.log(err);
  return res.send({ error: err.message });
});

app.listen(9000, () => {
  console.log('Express server listening on port 9000');
});
