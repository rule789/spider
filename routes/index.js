var express = require('express');
var router = express.Router();
var weatherCtl = require('../controller/weatherController');

/* GET home page. */
router.get('/',  async function(req, res, next) {
  let info = await weatherCtl.getTaipeiWeather();

  console.log('info', info);

  res.render('index', { 
    title: 'Weather',
    weather: info
  });
});


module.exports = router;
