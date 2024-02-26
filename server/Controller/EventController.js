import Event from '../models/EventModel.js';
import asyncHandler from '../utils/AsyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

// @desc    Get all events
// @route   GET /v1/events
// @access  Public
export const getEvents = asyncHandler(async (req, res, next) => {
  const events = await Event.find();

  res.status(200).json({ success: true, data: events });
});

// @desc    Get single event
// @route   GET /v1/events/:id
// @access  Public
export const getEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(
      new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: event });
});

// @desc    Create new event
// @route   POST /events
// @access  Private
export const createEvent = asyncHandler(async (req, res, next) => {
  const { actionDate, title, text, image, eventNR, user
   } = req.body;
   const existingEvent = await Event.findOne
    ({ eventNR });
  if (existingEvent)
    throw new ErrorResponse('An event with this eventNR already exists', 409);

  const event = await Event.create(
    {
      actionDate,
      title,
      text,
      image,
      eventNR,
      user
    }
  );

  res.status(201).json({
    success: true,
    data: event,
  });
});

// @desc    Update event
// @route   PUT /events/:id
// @access  Private
export const updateEvent = asyncHandler(async (req, res, next) => {

  const event = await Event.findByIdAndUpdate
  (req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!event) {
    return next(
      new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: event });
}
);




// @desc    Delete event
// @route   DELETE /events/:id
// @access  Private
export const deleteEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findByIdAndDelete(req.params.id);

  if (!event) {
    return next(
      new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});










