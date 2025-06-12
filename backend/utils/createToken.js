import jwt from "jsonwebtoken";

const generateToken = (res, userID) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });

  // Set JWT as an HTTP-only
  res.cookie("eComAppJWT", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 2 * 24 * 60 * 60 * 1000,
    path: "/"
  });

  return token;
};

export default generateToken;
