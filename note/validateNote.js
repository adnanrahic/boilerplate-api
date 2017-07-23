function validateNote(req, res, next) {
  if (typeof req.body.title === 'string' &&
      typeof req.body.description === 'string') 
    return next();

  return res.status(500).send('Please enter a valid Note.');
}

module.exports = validateNote;