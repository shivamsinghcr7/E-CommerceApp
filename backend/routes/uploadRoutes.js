import express from "express";
import path from "path";
import multer from "multer";

const router = express.Router();

// Creating storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    const extname = path.extname(file.originalname);
    callback(null, `${file.originalname}-${Date.now()}${extname}`);
  },
});

// File filter for preventing .exe uploads
const fileFilter = (req, file, callback) => {
  // Accept jpeg, jpg, png, webp files only
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    callback(null, true);
  } else {
    callback(new Error("Images only allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      res.status(200).send({
        message: "Image uploaded successfully",
        image: `/uploads/${req.file.filename}`,
      });
    } else {
      res.status(400).send({
        message: "No image file provided",
      });
    }
  });
});

export default router;
