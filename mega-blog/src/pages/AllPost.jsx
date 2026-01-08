import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { BookOpen } from "lucide-react";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts();
        if (response?.rows) {
          setPosts(response.rows);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="w-full min-h-screen bg-gray-950 text-white py-10">
      <Container>
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BookOpen size={20} />
            </div>
            <h1 className="text-2xl font-bold">
              All <span className="text-blue-400">Posts</span>
            </h1>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-400 text-lg">Loading posts...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-800 p-4 rounded-full mb-4">
              <BookOpen size={32} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-1">No Posts Found</h2>
            <p className="text-gray-400">
              Start by creating your first blog post.
            </p>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && posts.length > 0 && (
          <div className="flex flex-wrap -m-2">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/4">
                <div className="h-full bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-600 transition-colors">
                  <PostCard {...post} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export default AllPost;
