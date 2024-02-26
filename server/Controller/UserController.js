import asyncHandler from '../utils/AsyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import User from '../models/UserModel.js';


export const createUser = asyncHandler(async (req, res, next) => {
    const newUser = await User.create(req.body);

    if (!newUser) throw new ErrorResponse(`User ${req.body.username} could not be created`, 422);

    res.status(201).json(newUser);
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