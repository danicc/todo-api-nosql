import jwt from 'jsonwebtoken';
import moment from 'moment';

const isAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const token = req.headers.authorization.split(' ')[1];
  return jwt.verify(token, process.env.SECRET_TOKEN, (error, payload) => {
    if (error) {
      res.status(500).send('Internal Server Error');
    } else if (payload.exp <= moment().unix()) {
      res.status(401).send('Token has expired');
    } else {
      req.user = payload;
      next();
    }
  });
};

export default isAuth;
