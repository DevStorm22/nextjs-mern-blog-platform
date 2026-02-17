"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditBlog() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blogs/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setContent(data.content);
        setLoading(false);
      });
  }, [id]);

  const updateBlog = async () => {
    await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
    });
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading blog...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white border rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-6">
          Edit Blog
        </h1>

        <label className="block text-sm text-gray-600 mb-2">
          Title
        </label>
        <input
          value={title}
          className="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-1 focus:ring-gray-400"
          onChange={e => setTitle(e.target.value)}
        />

        <label className="block text-sm text-gray-600 mb-2">
          Content
        </label>
        <textarea
          rows={5}
          value={content}
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
            onClick={updateBlog}
            className="px-4 py-2 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-900"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
