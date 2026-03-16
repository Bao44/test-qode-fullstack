const express = require("express");
const router = express.Router();
const photoController = require("../controllers/photo.controller");
const upload = require("../middleware/upload.middleware");

router.post("/", upload.single("image"), photoController.uploadPhoto);
router.get("/", photoController.getPhotos);
router.delete("/:id", photoController.deletePhoto);

module.exports = router;
