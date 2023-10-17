const router = require('express').Router();
const blogpostRoutes = require('./blogpostRoutes');
const userRoutes = require('./userRoutes');

router.use('/', blogpostRoutes);
router.use('/users', userRoutes);

module.exports = router;