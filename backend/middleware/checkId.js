import { isValidObjectId } from "mongoose";

function checkId(req, res, next) {
  const { ObjectId } = req.body;

  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error(`Invalid Object of: ${req.params.id}`);
  }
  next();
}

export default checkId;
