import Gift from '../models/GiftModel.js';
import asyncHandler from "../utils/AsyncHandler.js";
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllImages = asyncHandler(async (req, res, next) => {
  try {
    const images = await Gift.find();
    if (!images.length) {
      throw { statusCode: 404, message: 'Image not found' };
    }
    res.json(images);
  } catch (error) {
    next(error);
  }
});

export const getImage = asyncHandler(async (req, res, next) => {
  const image = await Gift.findById(req.params.id);

  if (!image) {
    return next(
      new ErrorResponse(`Gift card not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: image });
});


export const uploadImage = asyncHandler (async (req, res, next) => {
  console.log(req.headers.name, req.headers.price)

  if (!req.file) {
    return next(new ErrorResponse("Please upload a file", 400));
  }
  const image = await Gift.create({
    name: req.headers.name,
    url: req.file.path,
    price: req.headers.price,
  });

  res.status(201).json({ success: true, data: image });
});