// Model
const { User, List } = require('../models');

module.exports = {
  async index (req, res) {
    try {
      const user = await User.findById(req.query.userId)
      const lists = await List.find({userId: user._id}, 'name movies')

      res.status(200).json(lists);
    } catch (err) {
      res.status(403).send({ err });
    }
  },

  async show (req, res) {
    try {
      const list = await List.findById(req.params.listId, 'name movies')
      res.status(200).json(list);
    } catch (err) {
      res.status(403).send({ err });
    }
  },

  async create (req, res) { 
    try {
      const user = await User.findById(req.body.userId)
      if (!user) {
        res.status(403).send('User not found');
        return;
      }

      const list = await List.create(req.body);
      const lists = await List.find({userId: user._id}, 'name movies')

      res.status(200).json(lists);
    } catch (err) {
      res.status(403).send({ err });
    }
  },
  
  async edit (req, res) { 
    try {
      const list = await List.findById(req.params.listId);
      
      if (!list.movies.includes(req.body.movieId)) {
        list.movies.push(req.body.movieId);
        await list.save();
      } 

      const lists = await List.find({userId: list.userId}, 'name movies')
      res.status(200).json(lists);
    } catch (err) {
      res.status(403).send({ err });
    }
  },

  async delete (req, res) { 
    try {
      const list = await List.findById(req.params.listId)
      
      if (list) {
        await list.remove();
        const lists = await List.find({userId: list.userId}, 'name movies')
        res.status(200).json(lists);
      } else {
        res.status(404).json({error: "Post not found"});
      }
    } catch (err) {
      res.status(403).send({ err });
    }
  },
}

const movieIsRepeated = (movies, movieId) => {
  movies
}
