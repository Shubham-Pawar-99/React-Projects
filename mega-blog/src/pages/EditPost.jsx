import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container, PostForm } from "../components";
import { FileEdit } from "lucide-react";

function EditPost() {
  const [posts, setPosts] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
          console.log("Post data in EditPost:", post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  if (!posts) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </section>
    );
  }

  return posts ? (
    <section className="min-h-screen bg-gray-950 text-white py-10">
      <Container>
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2 rounded-lg">
            <FileEdit size={20} />
          </div>
          <h1 className="text-2xl font-bold">
            <h1 className="text-2xl font-bold">
              Edit <span className="text-blue-400">Post</span>
            </h1>
          </h1>
        </div>

        {/* Form Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 lg:p-6">
          <PostForm post={posts} />
        </div>
      </Container>
    </section>
  ) : null;
}

export default EditPost;
