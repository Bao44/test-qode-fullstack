"use client";

import UploadForm from "./components/UploadForm";
import PhotoFeed from "./components/PhotoFeed";
import { useState } from "react";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  return (
    <main className="min-h-screen bg-[#fafbfc] text-gray-900 selection:bg-blue-100">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-100/50">
        <div className="max-w-2xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-2xl">
            Test qode Full Stack - Trương Quốc Bảo
          </h1>
          <div className="w-12 h-12">
            <img
              src="/logo.png"
              alt="Avatar"
            />
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <section className="mb-20">
          <UploadForm onUploadSuccess={() => setRefreshTrigger((t) => t + 1)} />
        </section>

        <section>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-bold tracking-tight">
              Khoảng khắc gần đây
            </h2>
            <div className="h-px flex-1 bg-gray-100" />
          </div>
          <PhotoFeed refreshTrigger={refreshTrigger} />
        </section>
      </div>
    </main>
  );
}
