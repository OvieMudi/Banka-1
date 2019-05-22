import { verifyToken } from '../helpers/auth';

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader === undefined) {
    res.status(403).json({
      status: 403,
      error: 'Authorization token required',
    });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      status: 403,
      error: 'Authorization fail! Invalid token',
    });
  }
};

export const adminAuth = (req, res, next) => {
  const { isAdmin, type } = req.user;
  if (type !== 'staff' || isAdmin !== true) {
    res.status(403).json({
      status: 403,
      error: 'Unauthorized! Accessible to admin only',
    });
  }
  next();
};

export const staffAuth = (req, res, next) => {
  const { type } = req.user;
  if (type !== 'staff') {
    res.status(403).json({
      status: 403,
      error: 'Unauthorized! Accessible to staff only',
    });
  }
  next();
};

export const cashierAuth = (req, res, next) => {
  const { type, isAdmin } = req.user;
  if (type !== 'staff' || isAdmin === true) {
    res.status(403).json({
      status: 403,
      error: 'Unauthorized! Resource accessible to cashier only',
    });
  }
  next();
};
