import { Link } from "react-router-dom";
import { useState } from "react";
import appwriteService from "../appwrite/config";
import { ImageOff } from "lucide-react";

function PostCard({ $id, title, featuredImage }) {
  const [imgLoading, setImgLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  const imageUrl = featuredImage
    ? appwriteService.getFilePreview(featuredImage)
    : null;

  return (
    <Link
      to={`/post/${$id}`}
      className={`block h-full ${imgLoading ? "pointer-events-none" : ""}`}
    >
      <div className="h-full bg-gray-900 border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-600/10 group">
        {/* Image Section */}
        <div className="relative w-full h-48 overflow-hidden bg-gray-800">
          {/* Skeleton */}
          {imgLoading && !imgError && (
            <div className="absolute inset-0 animate-pulse bg-gray-700" />
          )}

          {/* Image */}
          {!imgError && imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                imgLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setImgLoading(false)}
              onError={() => {
                setImgLoading(false);
                setImgError(true);
              }}
            />
          )}

          {/* Error Fallback */}
          {imgError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
              <ImageOff size={28} />
              <span className="text-sm mt-1">Image not available</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title Skeleton */}
          {imgLoading ? (
            <div className="h-5 w-3/4 bg-gray-700 rounded animate-pulse" />
          ) : (
            <h2 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
              {title}
            </h2>
          )}
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
