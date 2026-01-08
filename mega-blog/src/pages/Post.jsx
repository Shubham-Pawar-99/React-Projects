import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import {
  Edit,
  Trash2,
  Calendar,
  User,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor =
    post && userData ? post.userId === userData?.userData?.$id : false;

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    setLoading(true);
    setError("");

    appwriteService
      .getPost(slug)
      .then((fetchedPost) => {
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          setError("Post not found.");
        }
      })
      .catch((err) => {
        console.error("Error fetching post:", err);
        setError("Failed to load post.");
      })
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  const deletePost = async () => {
    if (!post) return;

    if (
      !window.confirm(
        "Are you sure you want to delete this post? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const status = await appwriteService.deletePost(post.$id);
      if (status) {
        if (post.featuredImage)
          await appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      setError("Failed to delete post.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading post...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white bg-gray-950">
        <Container>
          <div className="text-center max-w-md mx-auto">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <p className="text-xl text-red-400 mb-4">{error}</p>
            <Button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 mx-auto"
            >
              <ArrowLeft size={16} /> Back to Home
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  if (!post) return null;

  return (
    <section className="min-h-screen bg-gray-950 text-white py-10">
      <Container>
        {/* Back button */}
        <div className="mb-6">
          <Button
            onClick={() => navigate(-1)}
            variant="secondary"
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Back to Posts
          </Button>
        </div>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative w-full mb-8 rounded-2xl overflow-hidden border border-gray-800 bg-gray-900">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />

            {/* Author Actions */}
            {isAuthor && (
              <div className="absolute top-4 right-4 flex gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className="flex items-center gap-2 bg-green-600">
                    <Edit size={16} /> Edit
                  </Button>
                </Link>
                <h1>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed
                  perferendis placeat eveniet maxime molestiae ratione inventore
                  earum, fugit illum quidem consequatur tenetur eligendi?
                  Molestiae blanditiis doloremque tempora animi eveniet
                  consequuntur!
                </h1>
                <Button
                  onClick={deletePost}
                  variant="danger"
                  className="flex items-center gap-2 bg-red-600"
                >
                  <Trash2 size={16} /> Delete
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Post Meta Info */}
        <div className="mb-8 space-y-4">
          <div>
            <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(post.$createdAt)}</span>
              </div>

              <div className="flex items-center gap-2">
                {post.status === "active" ? (
                  <>
                    <Eye size={16} className="text-green-500" />
                    <span className="text-green-500">Published</span>
                  </>
                ) : (
                  <>
                    <EyeOff size={16} className="text-yellow-500" />
                    <span className="text-yellow-500">Draft</span>
                  </>
                )}
              </div>

              {isAuthor && (
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span className="text-blue-400">You are the author</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
          {post.title}
        </h1>

        {/* Content */}
        <article className="mb-12">
          <div
            className="prose prose-invert max-w-none 
            prose-headings:text-white 
            prose-p:text-gray-300 
            prose-a:text-blue-400 hover:prose-a:text-blue-300
            prose-strong:text-white
            prose-em:text-gray-400
            prose-blockquote:text-gray-400 prose-blockquote:border-l-blue-500
            prose-ul:text-gray-300
            prose-ol:text-gray-300
            prose-code:text-gray-300 prose-code:bg-gray-800 prose-code:px-1 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700
            prose-img:rounded-lg prose-img:mx-auto
            prose-table:text-gray-300
            prose-th:border-gray-700
            prose-td:border-gray-700"
          >
            {post.content ? (
              parse(post.content)
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-lg">
                <p className="text-gray-400 text-lg">No content available.</p>
              </div>
            )}
          </div>
        </article>
      </Container>
    </section>
  );
}
