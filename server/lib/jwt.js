const jwt = require("jsonwebtoken");

exports.createToken = async (user, expiresIn = "1y") => {
  const payload = {
    id: user.id,
    firstname: user.firstname,
    isAdmin: user.isAdmin,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });
};

exports.checkToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return {
      id: decoded.id,
      firstname: decoded.firstname,
      isAdmin: decoded.isAdmin,
    };
  } catch (error) {
    return false;
  }
};
