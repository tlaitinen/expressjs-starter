module.exports = f => (req,res,next) => {
  if (req.authId !== null) {
    f(req,res,next);
  } else {
    res.status(403).end('Not authorized');
  }
};
