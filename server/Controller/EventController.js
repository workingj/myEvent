import Event from '../models/EventModel.js';
import asyncHandler from '../utils/AsyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

// @desc    Get all events
// @route   GET /events
// @access  Public
export const getEvents = asyncHandler(async (req, res, next) => {
  const {user}=req.body

  const events = await Event.find({user});

  res.status(200).json({ success: true, data: events });
});

// @desc    Get single event
// @route   GET /events/:id
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
  const { actionDate, title, text, image, eventNR, user, contact,time, coupon
   } = req.body;
   
   console.log(req.body)

  const event = await Event.create(
    {
      actionDate,
      title,
      text,
      image,
      eventNR,
      user,
      contact,
      time,
      coupon,

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


// @desc    del all events for user

export const deleteAllEvents = asyncHandler(async (req, res, next) => {
  console.log(req.body)

  const {user}=req.body

  const event = await Event.deleteMany({user});

  if (!event) {
    return next(
      new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});


// @desc    del all events for contact
export const deleteAllEventsForContact = asyncHandler(async (req, res, next) => {
  console.log(req.body)

  const {contact,user}=req.body

  const event = await Event.deleteMany({contact,user});

  if (!event) {
    return next(
      new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
    );
  }
});

// @desc    activate event by active field
// @route   PUT /events/activate/:id
// @access  Private
export const activateEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findByIdAndUpdate
  (req.params.id, {active:true}, {
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










