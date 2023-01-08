import jwt from "jsonwebtoken";
import User from '../models/user.js';

class authJwt {
  verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.userId = decoded.id;
      next();
    });
  };

  isAdmin = (req, res, next) => {
    User.findById(req.userId).then(user => {
      if (user.role === "admin") {
        next();
        return;
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  };
}

export default new authJwt();
