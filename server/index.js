const express = require("express");
const cors = require("cors");
const PORT = 4000;
const app = express();
const multer = require("multer");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

app.get((req, res) => {
  res.json({
    message: "Hello this node",
  });
});

app.post("/resume/create", upload.single("headshotImage"), (req, res) => {
  const {
    fullName,
    currentPosition,
    currentLength,
    currentTechnologies,
    workHistory,
  } = req.body;

  console.log(req.body);

  res.json({
    message: "file uploaded successfully",
    data: {},
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
