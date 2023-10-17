const router = require('express').Router();
const { User } = require('../../models');
const validator = require('validator');

router.post('/', async (req, res) => {
  try {
    
    const password = req.body.password;
    const options = {
      minLength: 8,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
      returnScore: false
      
    };
    if (validator.isStrongPassword(password, options)) {
      console.log('Password is strong');
    } else {
      res
        .status(400)
        .json({ message: 'Not a strong password, please try again' });
      return;
    }
    
    
    const userData = await User.create(req.body);

    
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      console.log("Session after Signup", req.session); // Log the session object
      
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      console.log("Session after Login", req.session); // Log the session object
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
