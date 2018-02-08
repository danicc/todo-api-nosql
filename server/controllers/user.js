import jwt from 'jsonwebtoken';
import moment from 'moment';
import User from '../models/user';

const createToken = (user) => {
  console.log('process', process.env.SECRET_TOKEN);
  console.log('process', process.env.DB_HOST);

  const payload = {
    // TODO: should not be the same of the database
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix(),
  };

  return jwt.sign(payload, process.env.SECRET_TOKEN);
};

const signUp = (req, res) => {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password,
  });
  user.save((error) => {
    if (error) {
      res.status(500).send({ message: `Error al crear el usuario: ${error}` });
    } else {
      res.status(200).send({ token: createToken(user) });
    }
  });
};

const signIn = (req, res) => {
  User.findOne({ email: req.body.email }, (error, user) => {
    if (error) {
      res.status(500).send({ message: error });
    } else if (!user) {
      res.status(404).send({ message: 'User Not found' });
    } else if (!user.comparePassword(req.body.password)) {
      res.status(403).send({ message: 'Authentication failed.' });
    } else {
      req.user = user;

      res.status(200).send({
        message: 'Login action successful',
        token: createToken(user),
      });
    }
  });
};

export {
  signIn,
  signUp,
};
