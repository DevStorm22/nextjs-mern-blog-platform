"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then(res => res.json())
      .then(setBlogs);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Blog Platform
      </h1>

      <div className="max-w-2xl mx-auto space-y-4">
        {blogs.length === 0 && (
          <p className="text-center text-gray-500">
            No blogs available
          </p>
        )}

        {blogs.map(blog => (
          <div
            key={blog._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-600">{blog.content}</p>
            </div>

            <div className="flex gap-2">
              <Link
                href={`/edit/${blog._id}`}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Edit
              </Link>

              <button
                onClick={async () => {
                  await fetch(`/api/blogs/${blog._id}`, { method: "DELETE" });
                  setBlogs(prev => prev.filter(b => b._id !== blog._id));
                }}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
