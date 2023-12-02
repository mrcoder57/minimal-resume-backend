import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.secret_key;

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token not provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }

    req.userId = decoded.userId;
    next();
  });
};

export { authenticateToken };
