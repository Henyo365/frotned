const ensureAuthenticated = require('../Middleawares/Auth');

const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res) => {
    console.log('---- logged in user detail ---', req.user);
    res.status(200);
res.json([
  {
    name: "mobile",
    price: 1000
  },
  {
    name: "laptop",
    price: 2000
  }
])
})


module.exports = router;