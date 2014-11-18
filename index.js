var mongoose;


module.exports = function (req, res, next) {
  try {
    if (!mongoose)
      mongoose = require('mongoose');
    mongoose.connection.db.admin().ping(function (err, result) {
      if (err || !result)
        return next(err || new Error('no ping result'));
      if (!req.accepts('txt') && req.accepts('json'))
        return res.json({ ping: 'PONG' });
      res.type('txt');
      res.send('PONG');
    });
  } catch (err) {
    process.nextTick(next.bind(next, err));
  };
};
