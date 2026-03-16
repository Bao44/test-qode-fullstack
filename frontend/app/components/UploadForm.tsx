"use client";
import { useState } from "react";
import { uploadPhoto } from "../services/api";
import { TrashIcon, Upload } from "lucide-react";

export default function UploadForm({ onUploadSuccess }: any) {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);

    try {
      setLoading(true);
      await uploadPhoto(formData);
      setCaption("");
      setFile(null);
      onUploadSuccess();
    } catch (error) {
      alert("Tải lên thất bại, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-6">
      <div className="group relative border-2 border-dashed border-gray-200 rounded-3xl p-8 transition-all hover:border-blue-400 hover:bg-blue-50/30 flex flex-col items-center justify-center gap-4 cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="p-4 bg-blue-50 rounded-full text-blue-600 group-hover:scale-110 transition-transform duration-300">
          <Upload size={24} />
        </div>
        <p className="text-gray-500 font-medium text-center">
          Nhấp để tải lên hoặc kéo thả hình ảnh vào đây
        </p>
      </div>

      {file && (
        <div className="relative rounded-3xl overflow-hidden shadow-lg border border-gray-100">
          <img
            src={URL.createObjectURL(file)}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
          <button
            type="button"
            onClick={() => setFile(null)}
            className="absolute top-2 right-2 bg-white/80 p-1 rounded-full text-red-500 hover:bg-white"
          >
            <TrashIcon size={16} />
          </button>
        </div>
      )}

      <input
        type="text"
        placeholder="Viết chú thích cho bức ảnh..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none text-gray-700 shadow-inner"
      />

      <button
        disabled={loading || !file}
        className="w-full bg-blue-600 disabled:bg-gray-300 text-white py-4 rounded-2xl hover:bg-blue-700 transition-all font-bold tracking-wide shadow-xl shadow-blue-100 active:scale-[0.98] cursor-pointer"
      >
        {loading ? "ĐANG XỬ LÝ..." : "ĐĂNG BÀI VIẾT"}
      </button>
    </form>
  );
}
