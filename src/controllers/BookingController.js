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

    const ownerSocket = req.connectedUsers[booking.spot.user];

    if (ownerSocket) {
      req.io.to(ownerSocket).emit('booking_request', booking);
    }

    return res.json(booking);
  },
};
