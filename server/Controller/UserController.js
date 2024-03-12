import asyncHandler from "../utils/AsyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = asyncHandler(async (req, res, next) => {
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    birthDate,
    avatar,
    role,
  

  } = req.body;
  const existingUser = await User.findOne({ email });
  const existingUsername = await User.findOne({ username });
  if (existingUsername)
    throw new ErrorResponse(
      "An account with this username already exists",
      409
    );
  if (existingUser)
    throw new ErrorResponse("An account with this Email already exists", 409);

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hash,
    firstName,
    lastName,
    birthDate,
    avatar,
    role,
   
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(201).json({ success: true, token });
});

// export const getUser = asyncHandler(async (req, res, next) => {
//   const id = req.params.id;

//   const user = await User.findById(id);
//   if (!user) throw new ErrorResponse(`user ${id} does not exist`, 404);

//   res.send(user);
// });

export const updateUser = asyncHandler(async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;
  console.log(req.body);
  const user = await User.findByIdAndUpdate
  (id, body, {
    new: true,
    runValidators: true,
  });
  if (!user) throw new ErrorResponse(`User ${id} does not exist`, 404);
  res.json(user);
});


export const deleteUser = asyncHandler(async (req, res, next) => {
const id = req.params.id;
const {email, password} = req.body;
  const found = await User.findById(id).select("+password");
  if (!found) throw new ErrorResponse(`User ${id} does not exist`, 404);

  const match = await bcrypt.compare(password, found.password);
  console.log(match? 'Password match': 'Password does not match');
  if (!match) throw new ErrorResponse("Password is not correct", 401);
  if (found.email !== email) throw new ErrorResponse("Email is not correct", 401);
  

  await User.findByIdAndDelete(id);
  res.json({ success: `User ${id} was deleted` });
});


//Login
export const login = asyncHandler(async (req, res, next) => {
  
  const { email, password } = req.body;
  const isUserExist = await User.findOne({ email }).select("+password");
  if (!isUserExist) throw new Error("Email doest not exist", 404);
  const match = await bcrypt.compare(password, isUserExist.password);
  if (!match) throw new Error("Password is not correct", 401);
  const token = jwt.sign({ uid: isUserExist._id }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });

  res.cookie("token", token, { maxAge: 1800000 }); //30min, with Cookie schould use ms
  res.send({ status: "success" });
});

//verify User

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.uid);
  res.json(user);
});

//Logout

export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");
  res.send({ status: "success" });
});


// Change Password
// export const changePassword = asyncHandler(async (req, res, next) => {
//   const
//     { oldPassword, newPassword, confirmPassword} = req.body;
//     const { id } = req.params;
//     console.log(req.body);
//   if (newPassword !== confirmPassword)
//     throw new ErrorResponse("Password does not match", 400);
//   const user =
//     await User.findById(id);
//   if (!user) throw new ErrorResponse(`User ${id} does not exist`, 404);
//   const match = await bcrypt.compare(oldPassword, user.password);
//   if (!match) throw new ErrorResponse("Old Password is not correct", 401);
//   try {
//     const hash = await bcrypt.hash(newPassword, 10);
//     await User.findByIdAndUpdate(id, { password: hash });
//     res.send({ status: "success" });
//   } catch (error) {
 
//     throw new ErrorResponse("Error updating password", 500);
//   }
  
// }
// );
export const changePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword} = req.body;
  const { id } = req.params;
  console.log(req.body);
  console.log(req.params);
  const user = await User.findById(id).select("+password");
  if (!user) throw new ErrorResponse(`User ${id} does not exist`, 404);
  //  bcrypt.hash(password, 10);
  const match = await bcrypt.compare(oldPassword, user.password);

  if (!match) {
    throw new ErrorResponse("Password does not match", 401);
  }
  

  
  const hash = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(id, {
    password: hash,
  });
  res.send({ status: "success" });
}
);



// get Image from Cloudinary by user id
export const getImage = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ErrorResponse(`User ${req.params.id} does not exist`, 404);
  res.json(user.avatar);
}
);
// upload Image to Cloudinary by user id
export const uploadImage = asyncHandler(async (req, res, next) => {
  const user =
    await User.findByIdAndUpdate(req.params.id, { avatar: req.file.path });
 console.log('file: '+req.file.path);
  if (!user) throw new ErrorResponse(`User ${req.params.id} does not exist`, 404);
  res.json(user.avatar);
}
);
