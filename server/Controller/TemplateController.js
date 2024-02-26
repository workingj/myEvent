import AdminTemplates from '../models/TemplateModel.js';
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getAllTemplates = asyncHandler(async (req, res, next) => {
    const result = await AdminTemplates.find({ author: 'admin' }, { _id: 0 });
    if (!result) throw new Error('No Tempalte to find !!', 404);
    res.json(result);
});

export const getSingleTemplate = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const result = await AdminTemplates.findById({ _id: id , author: 'admin' });
    if (!result) throw new Error(`Template with ID ${id} does not exist`, 404);
    res.send(result);
});

export const createTemplate = asyncHandler(async (req, res, next) => {
  const { body, uid } = req;

  const newTemplate = await AdminTemplates.create({ ...body, author: "admin" });
  const addedTemplate = await AdminTemplates.findById(newTemplate._id);
  res.status(201).json(addedTemplate);
});

export const updateTemplate = asyncHandler(async (req, res, next) => {
  const {
    body,
    params: { id },
      } = req;
  const find = await AdminTemplates.findById({ _id: id, author: "admin" });
  if (!find) throw new ErrorResponse(`Template with ID  ${id} does not exits`, 404);

  const updated = await AdminTemplates.findByIdAndUpdate(
    { _id: id, author: "admin" },
    body,
    {
      new: true,
    }
  );
  res.json(updated);
});


export const deleteTemplate = asyncHandler(async (req, res, next) => {
  const {
    body,
    params: { id },
      } = req;
  const find = await AdminTemplates.findById({ _id: id, author: "admin" });
  if (!find) throw new ErrorResponse(`Post {id} does not exits`, 404);

  await AdminTemplates.findByIdAndDelete({ _id: id, author: "admin" }, body, {
    new: true,
  });
  res.json({ success: `Post with id {id} was deleted !!!` });
});