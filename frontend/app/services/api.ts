import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getPhotos = () => api.get("/photos");
export const uploadPhoto = (formData: any) => api.post("/photos", formData);
export const addComment = (commentData: any) =>
  api.post("/comments", commentData);
export const deletePhoto = (id: string, fileName: string) =>
  api.delete(`/photos/${id}`, { data: { fileName } });

export const deleteComment = (id: number) => api.delete(`/comments/${id}`);

export default api;
