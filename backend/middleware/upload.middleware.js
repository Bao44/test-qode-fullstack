const multer = require("multer");

// Sử dụng Memory Storage để xử lý file dưới dạng Buffer
const storage = multer.memoryStorage();

// Bộ lọc chỉ cho phép các định dạng ảnh phổ biến
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ cho phép tải lên định dạng hình ảnh!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Giới hạn 5MB cho mỗi tấm ảnh
  },
});

module.exports = upload;