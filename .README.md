# Test qode - Full-stack

### Người thực hiện: Trương Quốc Bảo
**Vị trí ứng tuyển:** Intern Full-stack Developer  
**Live Demo:** [https://test-qode-fullstack.vercel.app/](https://test-qode-fullstack.vercel.app/)

---

## Giới thiệu dự án
Đây là một ứng dụng web test base Full-stack cho phép người dùng tải hình ảnh, viết chú thích và tương tác thông qua hệ thống bình luận theo thời gian thực. 

## Công nghệ sử dụng (Tech Stack)
Dự án được xây dựng dựa trên các công nghệ theo yêu cầu của interviewer:

* **Frontend:** Next.js, TypeScript, Tailwind CSS.
* **Backend:** Node.js, Express.js.
* **Database:** PostgreSQL (thông qua Supabase).
* **Storage:** Supabase Storage (quản lý file vật lý cho hình ảnh).
* **Công cụ khác:** Multer (xử lý file), Axios (giao tiếp API), Lucide React (Icons).

## Các tính năng đã hoàn thiện
Ứng dụng đáp ứng đầy đủ các yêu cầu cốt lõi và bổ sung thêm các tính năng tối ưu trải nghiệm người dùng:

* **Đăng tải hình ảnh:** Cho phép chọn file từ thiết bị, xem trước (Preview) và viết chú thích.
* **Quản lý bình luận:** Người dùng có thể thêm bình luận mới và xóa các bình luận cũ.
* **Thời gian đăng tải:** Hiển thị mốc thời gian đăng bài và bình luận trực quan theo định dạng Việt Nam.
* **Xóa nội dung:** Tính năng xóa ảnh tích hợp dọn dẹp dữ liệu trên cả Database và Cloud Storage.
* **Giao diện sang trọng:** Thiết kế tối giản, hiện đại, hỗ trợ Responsive trên mọi kích thước màn hình.

## 🛠 Kiến trúc hệ thống
Dự án được cấu trúc theo mô hình phân lớp (Layered Architecture):
* **Backend:** Tổ chức theo `Routes` -> `Controllers` -> `Services` giúp tách biệt logic nghiệp vụ và quản lý dữ liệu.
* **Frontend:** Chia nhỏ thành các `Components` tái sử dụng, quản lý state hiệu quả bằng React Hooks.

## 📦 Hướng dẫn chạy dự án (Local Setup)

1.  **Clone mã nguồn:**
    ```bash
    git clone [https://github.com/Bao44/test-qode-fullstack.git](https://github.com/Bao44/test-qode-fullstack.git)
    ```

2.  **Cấu hình Backend:**
    * Di chuyển vào thư mục `/backend`.
    * Tạo file `.env` và điền:
        * `SUPABASE_URL=...`
        * `SUPABASE_SERVICE_ROLE_KEY=...`
    * Chạy lệnh: `npm install` và `npm start`.

3.  **Cấu hình Frontend:**
    * Di chuyển vào thư mục `/frontend`.
    * Tạo file `.env.local` và điền:
        * `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
    * Chạy lệnh: `npm install` và `npm run dev`.

---
*Cảm ơn đội ngũ Qode đã dành thời gian xem xét bài test của tôi!*