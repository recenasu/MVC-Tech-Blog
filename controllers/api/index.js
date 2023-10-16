const router = require('express').Router();
const blogpostRoutes = require('./blogpostRoutes');

router.use('/', blogpostRoutes);

module.exports = router;