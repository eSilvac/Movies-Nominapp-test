const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Model
const { User } = require('../models');

module.exports = {
  async register (req, res) {
    const password = req.body.password ? bcrypt.hashSync(req.body.password, 10) : '';
    
    try {
      const user = await User.create({
        email: req.body.email,
        password
      });

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: 1000 * 60 * 60 * 24 * 365 }
      );
      
      res.send({ token });
    } catch (err) {
      res.status(403).send({ error });
    }
  },
  async login (req, res) {
    try {
      const user = await User.findOne({ username: req.body.username })
      
      if (user) {
        const isValidPassword = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!isValidPassword) {
          res.status(403).res('Invalid Password');
          return;
        }

        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET,
          { expiresIn: 1000 * 60 * 60 * 24 * 365 }
        );

        res.send({ token });
      } else {
        res.status(403).res('User Not Found');
      }
        
    } catch (err) {
      res.status(403).send({ error });
    } 
  }
}
