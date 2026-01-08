import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch data with proper loading state and error handling
  const fetchPhotos = async (pageNum) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://picsum.photos/v2/list?page=${pageNum}&limit=14`
      );
      setPhotos(data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ UseEffect to load photos when `page` changes
  useEffect(() => {
    fetchPhotos(page);
  }, [page]);

  // ✅ Pagination handlers
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => prev + 1);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Main Image Grid */}
      <div className="flex flex-wrap justify-center gap-4 p-6 flex-1 overflow-auto">
        {loading ? (
          <h3 className="text-gray-400 text-sm self-center">Loading...</h3>
        ) : (
          photos.map(({ id, author, url, download_url }) => (
            <a
              key={id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center"
            >
              <div className="h-40 w-44 overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform">
                <img
                  src={download_url}
                  alt={author}
                  className="h-full w-full object-cover"
                />
              </div>
              <h1 className="font-semibold text-sm mt-2">{author}</h1>
            </a>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-6 p-4 bg-gray-900">
        <button
          onClick={handlePrev}
          disabled={page === 1 || loading}
          className={`py-2 px-4 rounded font-semibold text-black ${
            page === 1 || loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-amber-400 hover:bg-amber-300 active:scale-95"
          }`}
        >
          Prev
        </button>

        <span className="text-lg font-medium">{page}</span>

        <button
          onClick={handleNext}
          disabled={loading}
          className="bg-amber-400 text-black font-semibold py-2 px-4 rounded hover:bg-amber-300 active:scale-95"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
