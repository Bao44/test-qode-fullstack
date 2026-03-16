const { supabase } = require("../lib/supabase");

const createComment = async (photoId, content) => {
  const { data, error } = await supabase
    .from("comments")
    .insert([{ photo_id: photoId, content: content }])
    .select()
    .single();

  if (error) throw new Error("Lỗi khi lưu bình luận: " + error.message);
  return data;
};

const deleteComment = async (commentId) => {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);
  if (error) throw error;
};

module.exports = { createComment, deleteComment };
