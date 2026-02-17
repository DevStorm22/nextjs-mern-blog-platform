"use client";
import { useState } from "react";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = async () => {
    await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify({ title, content }),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Create Blog</h1>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Title"
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 mb-4 rounded"
          placeholder="Content"
          rows={4}
          onChange={e => setContent(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Create
        </button>
      </div>
    </div>
  );
}
