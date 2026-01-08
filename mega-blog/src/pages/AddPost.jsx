import React from "react";
import { PostForm, Container } from "../components";
import { PlusCircle } from "lucide-react";

function AddPost() {
  return (
    <section className="min-h-screen bg-gray-950 text-white py-10">
      <Container>
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2 rounded-lg">
            <PlusCircle size={20} />
          </div>
          <h1 className="text-2xl font-bold">
            Create <span className="text-blue-400">New Post</span>
          </h1>
        </div>

        {/* Form Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 lg:p-6">
          <PostForm />
        </div>
      </Container>
    </section>
  );
}

export default AddPost;
