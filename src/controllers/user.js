const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Model
const { User } = require('../models');

module.exports = {
  async user (req, res) {
    const token = req.headers['authorization'];

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const userId = payload.userId;

      const user = await User.findById(userId, 'email');

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(403).send('User Not Found');
      }
    } catch (err) {
      res.status(403).send('Invalid Token');
    }
  },

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
      
      res.send({ token: token, user: {_id: user._id, email: user.email} });
    } catch (err) {
      res.status(403).send({ err });
    }
  },
  async login (req, res) {
    try {
      const user = await User.findOne({ email: req.body.email })
      
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

        res.send({ token: token, user: {_id: user._id, email: user.email} });
      } else {
        res.status(403).send('User Not Found');
      }
        
    } catch (err) {
      console.log(err)
      res.status(403).send({ err });
    } 
  }
}
