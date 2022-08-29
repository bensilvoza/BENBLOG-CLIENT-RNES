// Libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Pages
import Home from "./pages/home";
import ShowPost from "./pages/showPost";
import CreatePost from "./pages/createPost";
import EditPost from "./pages/editPost";
import Login from "./pages/login";
import Register from "./pages/register";

// contexts
import PostCardContextProvider from "./contexts/home/postCardContext";
import NotificationContextProvider from "./contexts/shared/notificationContext";
import UserContextProvider from "./contexts/shared/userContext";
import PostsContextProvider from "./contexts/shared/postsContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <PostsContextProvider>
          <UserContextProvider>
            <NotificationContextProvider>
              <PostCardContextProvider>
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/post/:id" element={<ShowPost />} />
                  <Route exact path="/post/create" element={<CreatePost />} />
                  <Route exact path="/post/edit/:id" element={<EditPost />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/register" element={<Register />} />
                </Routes>
              </PostCardContextProvider>
            </NotificationContextProvider>
          </UserContextProvider>
        </PostsContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
