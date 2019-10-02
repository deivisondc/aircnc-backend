const User = require('../models/User');

module.exports = {
  store: (req, res) => {
    const { email } = req.body;

    const user = User.create({ email });
  },
};
