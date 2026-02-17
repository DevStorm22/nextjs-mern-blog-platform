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
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>

        <input
          className="w-full border p-2 mb-3 rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 mb-4 rounded"
          rows={4}
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        <button
          onClick={updateBlog}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update
        </button>
      </div>
    </div>
  );
}
