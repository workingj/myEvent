import User from '../models/UserModel.js';
import asyncHandler from '../utils/AsyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// @Register a new user
// @route   POST /api/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  const { username, email, password,firstName,lastName,birthDate, avatar,role} = req.body;
  const existingUser = await User.findOne({ email });
  const existingUsername= await User.findOne({ username });
  if (existingUsername)
    throw new ErrorResponse('An account with this username already exists', 409);
  if (existingUser)
    throw new ErrorResponse('An account with this Email already exists', 409);

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hash,
    firstName,
    lastName,
    birthDate,
    avatar,
    role
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.status(201).json({ success: true, token });

});