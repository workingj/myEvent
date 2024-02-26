import asyncHandler from '../utils/AsyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import User from '../models/UserModel.js';

export const createUser = asyncHandler(async (req, res, next) => {
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

export const getUser = asyncHandler(async (req, res, next) => {
    const id = req.params;

    const user = await User.findById(id);
    if (!user) throw new ErrorResponse(`user ${id} does not exist`, 404);

    res.send(user);
});

export const updateUser = asyncHandler(async (req, res, next) => {
    const {
        body,
        params: { id },
    } = req;

    const found = await User.findById(id);
    if (!found) throw new ErrorResponse(`User ${id} does not exist`, 404);
    const updatedPost = await User.findByIdAndUpdate(id, body, {
        new: true,
    });

    res.json(updatedPost);
});

export const deleteUser = asyncHandler(async (req, res, next) => {
    const {
        body,
        params: { id },
    } = req;

    const found = await User.findById(id);
    if (!found) throw new ErrorResponse(`User ${id} does not exist`, 404);

    await User.findByIdAndDelete(id);
    res.json({ success: `User ${id} was deleted` });
});