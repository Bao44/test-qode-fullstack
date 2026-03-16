const photoService = require("../services/photo.service");

const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng chọn ảnh" });
    }

    const { caption } = req.body;
    const newPhoto = await photoService.uploadAndSavePhoto(req.file, caption);

    return res.status(201).json({
      success: true,
      message: "Upload thành công!",
      data: newPhoto,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getPhotos = async (req, res) => {
  try {
    const photos = await photoService.getAllPhotos();
    return res.status(200).json({ success: true, data: photos });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    await photoService.deletePhoto(id);
    return res.status(200).json({
      success: true,
      message: "Đã xóa ảnh",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { uploadPhoto, getPhotos, deletePhoto };
