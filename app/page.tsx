"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then(res => res.json())
      .then(setBlogs);
  }, []);

  const deleteBlog = async (id: string) => {
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    setBlogs(prev => prev.filter(b => b._id !== id));
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Blogs</h1>

          <Link
            href="/create"
            className="px-4 py-2 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-900"
          >
            Create Blog
          </Link>
        </div>

        <div className="space-y-4">
          {blogs.length === 0 && (
            <p className="text-gray-500">No blogs available</p>
          )}

          {blogs.map(blog => (
            <div
              key={blog._id}
              className="bg-white border rounded-lg p-5 flex justify-between"
            >
              <div className="pr-4">
                <h2 className="text-lg font-medium">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {blog.content}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href={`/edit/${blog._id}`}
                  className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 text-center"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteBlog(blog._id)}
                  className="px-3 py-1 text-sm border border-red-400 text-red-600 rounded-md hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
