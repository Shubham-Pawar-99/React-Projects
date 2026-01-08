import { useEffect, useMemo, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Flame, Sparkles, Lock } from "lucide-react";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("latest"); // latest | trending
  const authStatus = useSelector((state) => state.auth.status);

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

  /* 🔀 Filtered Posts */
  const filteredPosts = useMemo(() => {
    if (filter === "latest") {
      return [...posts].reverse(); // newest first
    }

    if (filter === "trending") {
      return [...posts].slice(0, 4); // mock trending (can be replaced by views/likes)
    }

    return posts;
  }, [posts, filter]);

  /* 🔒 Not Logged In */
  if (!authStatus) {
    return (
      <section className="min-h-screen bg-gray-950 text-white flex items-center">
        <Container>
          <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="bg-gray-800 p-4 rounded-full mb-4">
              <Lock size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Login to read posts</h2>
            <p className="text-gray-400">
              Please login to access blog content.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-950 text-white">
      {/* ================= HERO SECTION ================= */}
      <div className="border-b border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <Container>
          <div className="py-16 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to <span className="text-blue-400">MegaBlog</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Read, write, and explore high-quality articles from developers
              around the world.
            </p>

            {/* Filters */}
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setFilter("latest")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border transition ${
                  filter === "latest"
                    ? "bg-blue-600 border-blue-600"
                    : "bg-gray-900 border-gray-800 hover:border-blue-600"
                }`}
              >
                <Sparkles size={16} />
                Latest
              </button>

              <button
                onClick={() => setFilter("trending")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border transition ${
                  filter === "trending"
                    ? "bg-blue-600 border-blue-600"
                    : "bg-gray-900 border-gray-800 hover:border-blue-600"
                }`}
              >
                <Flame size={16} />
                Trending
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* ================= POSTS SECTION ================= */}
      <Container>
        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <p className="text-gray-400 text-lg">Loading posts...</p>
          </div>
        )}

        {/* Empty */}
        {!loading && filteredPosts.length === 0 && (
          <div className="flex flex-col items-center py-20">
            <h2 className="text-xl font-semibold mb-1">No posts found</h2>
            <p className="text-gray-400">
              Try switching filters or create a new post.
            </p>
          </div>
        )}

        {/* Grid */}
        {!loading && filteredPosts.length > 0 && (
          <div className="flex flex-wrap -m-2 py-10">
            {filteredPosts.map((post) => (
              <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export default Home;
