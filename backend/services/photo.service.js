const { supabase } = require("../lib/supabase");

const uploadAndSavePhoto = async (file, caption) => {
  // Tạo tên file
  const fileName = `${Date.now()}-${file.originalname}`;

  // Upload lên Storage
  const { data: storageData, error: storageError } = await supabase.storage
    .from("images")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (storageError)
    throw new Error("Lỗi upload Storage: " + storageError.message);

  // Lấy Public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("images").getPublicUrl(fileName);

  // Lưu thông tin vào bảng photos
  const { data: dbData, error: dbError } = await supabase
    .from("photos")
    .insert([{ url: publicUrl, caption: caption || "" }])
    .select()
    .single();

  if (dbError) throw new Error("Lỗi lưu Database: " + dbError.message);

  return dbData;
};

const getAllPhotos = async () => {
  // Lấy ảnh và kèm theo các comment liên quan
  const { data, error } = await supabase
    .from("photos")
    .select(
      `
      *,
      comments (*)
    `,
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

const deletePhoto = async (photoId, fileName) => {
  // Xóa file trên Storage
  const { error: storageError } = await supabase.storage
    .from("images")
    .remove([fileName]);
  if (storageError) throw storageError;

  // Xóa trong Database
  const { error: dbError } = await supabase
    .from("photos")
    .delete()
    .eq("id", photoId);
  if (dbError) throw dbError;
};

module.exports = { uploadAndSavePhoto, getAllPhotos, deletePhoto };
