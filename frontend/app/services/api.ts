import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getPhotos = () => api.get("/api/photos");
export const uploadPhoto = (formData: any) => api.post("/api/photos", formData);
export const addComment = (commentData: any) =>
  api.post("/api/comments", commentData);
export const deletePhoto = (id: string, fileName: string) =>
  api.delete(`/api/photos/${id}`, { data: { fileName } });

export const deleteComment = (id: number) => api.delete(`/api/comments/${id}`);

export default api;
