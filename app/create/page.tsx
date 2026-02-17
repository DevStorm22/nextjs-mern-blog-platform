"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const submit = async () => {
    await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify({ title, content }),
    });
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white border rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-6">
          Create Blog
        </h1>

        <label className="block text-sm text-gray-600 mb-2">
          Title
        </label>
        <input
          className="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-1 focus:ring-gray-400"
          onChange={e => setTitle(e.target.value)}
        />

        <label className="block text-sm text-gray-600 mb-2">
          Content
        </label>
        <textarea
          rows={5}
          className="w-full border rounded-md px-3 py-2 mb-6 resize-none focus:outline-none focus:ring-1 focus:ring-gray-400"
          onChange={e => setContent(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            className="px-4 py-2 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-900"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
