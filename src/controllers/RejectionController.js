const Booking = require('../models/Booking');

module.exports = {
  async store(req, res) {
    const bookingId = req.params.booking_id;

    const booking = await Booking.findById(bookingId).populate('spot');

    booking.approved = false;

    await booking.save();

    const bookingUserSocket = req.connectedUsers[booking.user];

    if (bookingUserSocket) {
      req.io.to(bookingUserSocket).emit('booking_response', booking);
    }

    return res.json(booking);
  },
};
