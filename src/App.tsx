// import { createContext } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
// import { AllPosts } from "./AllPosts";
import AllPosts  from "./AllPosts";
import "./App.css";
import MessageBoard from "./MessageBoard";
import NavBar from "./NavBar";
// import { PostView } from "./Post";
import PostView from "./PostView";
// import { SupashipUserInfo, useSession } from "./use-session";
// import { Welcome, welcomeLoader } from "./Welcome";
import Welcome from "./Welcome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <MessageBoard />,
        children: [
          {
            path: ":pageNumber",
            element: <AllPosts />,
          },
          {
            path: "post/:postId",
            element: <PostView />,
          },
        ],
      },
      {
        path: "welcome",
        element: <Welcome />,
        // loader: welcomeLoader,
      },
    ],
  },
]);

import "./App.css";

function App() {
  return <RouterProvider router={router} />;
}

export default App;

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
