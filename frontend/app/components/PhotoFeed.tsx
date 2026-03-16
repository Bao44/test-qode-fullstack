"use client";
import { useEffect, useState } from "react";
import {
  addComment,
  getPhotos,
  deletePhoto,
  deleteComment,
} from "../services/api";
import { TrashIcon, MessageSquare } from "lucide-react";
import { formatDate } from "@/utils/formatTime";
import { Photo } from "@/utils/interface";

export default function PhotoFeed({
  refreshTrigger,
}: {
  refreshTrigger: number;
}) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [commentTexts, setCommentTexts] = useState<{ [key: string]: string }>(
    {},
  );

  const fetchPhotos = async () => {
    try {
      const res = await getPhotos();
      setPhotos(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [refreshTrigger]);

  const handleDeletePhoto = async (id: string, url: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa ảnh này?")) return;
    const fileName = url.split("/").pop();
    await deletePhoto(id, fileName!);
    fetchPhotos();
  };

  const handleDeleteComment = async (id: number) => {
    if (!confirm("Xóa bình luận này?")) return;
    await deleteComment(id);
    fetchPhotos();
  };

  const handleAddComment = async (photoId: string) => {
    const content = commentTexts[photoId];
    if (!content?.trim()) return;
    await addComment({ photo_id: photoId, content });
    setCommentTexts({ ...commentTexts, [photoId]: "" });
    fetchPhotos();
  };

  return (
    <div className="grid grid-cols-1 gap-12">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="group bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden transition-all hover:shadow-2xl"
        >
          {/* Image Container */}
          <div className="relative aspect-4/5 sm:aspect-video overflow-hidden">
            <img src={photo.url} className="w-full h-full object-cover" />
            <button
              onClick={() => handleDeletePhoto(photo.id, photo.url)}
              className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md text-red-500 rounded-full cursor-pointer hover:bg-red-50 transition-colors"
            >
              <TrashIcon size={20} />
            </button>
            <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] text-white">
              Đăng lúc: {formatDate(photo.created_at)}
            </div>
          </div>

          <div className="p-6">
            <p className="text-gray-800 font-semibold text-lg mb-4 leading-relaxed">
              {photo.caption || "Khoảnh khắc không tên"}
            </p>

            {/* Comments Area */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <MessageSquare size={16} />
                <span className="text-sm font-medium">
                  Bình luận ({photo.comments?.length || 0})
                </span>
              </div>

              {photo.comments?.map((c) => (
                <div
                  key={c.id}
                  className="flex justify-between items-start group/item bg-gray-50/50 p-3 rounded-2xl border border-transparent hover:border-gray-200 hover:bg-white transition-all"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-700 text-sm">{c.content}</span>
                    <span className="text-[10px] text-gray-400">
                      {formatDate(c.created_at)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteComment(c.id)}
                    className="cursor-pointer text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <TrashIcon size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-100 focus-within:bg-white focus-within:border-blue-200 transition-all">
              <input
                value={commentTexts[photo.id] || ""}
                onChange={(e) =>
                  setCommentTexts({
                    ...commentTexts,
                    [photo.id]: e.target.value,
                  })
                }
                placeholder="Chia sẻ cảm nghĩ của bạn..."
                className="flex-1 bg-transparent px-3 py-2 text-sm outline-none"
              />
              <button
                onClick={() => handleAddComment(photo.id)}
                className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-100 cursor-pointer"
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
