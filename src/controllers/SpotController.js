const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {

  async index(req, res) {
    const { tech } = req.query;

    const spots = await Spot.find({ techs: tech });

    return res.json(spots);
  },

  async store(req, res) {
    const { filename } = req.file;
    const { company, price, techs } = req.body;
    const userId = req.headers.user_id;

    const user = await User.findById(userId);
    if (!user) {
      return req.status(400).json({ error: 'User does not exists' });
    }

    const spot = await Spot.create({
      thumbnail: filename,
      company,
      price,
      techs: techs.split(',').map((tech) => tech.trim()),
      user: userId,
    });

    return res.json(spot);
  },
};
