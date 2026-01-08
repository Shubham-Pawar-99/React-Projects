import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import { ProtectedRoute } from "../src/components/index.js";
import {
  AddPost,
  EditPost,
  Home,
  Login,
  Post,
  Signup,
  AllPost,
} from "../src/pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <ProtectedRoute authentication={false}>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <ProtectedRoute authentication={false}>
            <Signup />
          </ProtectedRoute>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <ProtectedRoute authentication>
            {" "}
            <AllPost />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-post",
        element: (
          <ProtectedRoute authentication>
            {" "}
            <AddPost />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <ProtectedRoute authentication>
            {" "}
            <EditPost />
          </ProtectedRoute>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <BrowserRouter>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </BrowserRouter>
);
