import React from "react";
import { Link } from "react-router-dom";
import {
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  Heart,
} from "lucide-react";

function Footer() {
  const categories = [
    "Tech",
    "Design",
    "Career",
    "Lifestyle",
    "Tutorials",
    "Resources",
  ];

  const quickLinks = ["About", "Contact", "Write for Us", "Newsletter", "RSS"];

  const socialLinks = [
    { icon: Twitter, path: "#", label: "Twitter" },
    { icon: Github, path: "#", label: "GitHub" },
    { icon: Linkedin, path: "#", label: "LinkedIn" },
    { icon: Instagram, path: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold mb-4 inline-block">
              Mega<span className="text-blue-400">Blog</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Thoughts, stories, and ideas about web development, design, and
              technology.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 bg-white focus:outline-none"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg">
                  <Mail size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/category/${category.toLowerCase()}`}
                  className="bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-400 hover:text-white"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social */}
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.path}
                  className="text-gray-400 hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} BlogLog. All content is licensed
              under CC BY-SA 4.0
            </p>
            <p className="text-gray-500 text-xs mt-2 md:mt-0 flex items-center">
              Made with <Heart size={12} className="mx-1 text-red-500" /> by the
              community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
