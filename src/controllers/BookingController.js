const Booking = require('../models/Booking');

module.exports = {
  async store(req, res) {
    const userId = req.headers.user_id;
    const spotId = req.params.spot_id;
    const { date } = req.body;

    const booking = await Booking.create({
      date,
      user: userId,
      spot: spotId,
    });

    await booking.populate('user').populate('spot').execPopulate();

    return res.json(booking);
  },
};
