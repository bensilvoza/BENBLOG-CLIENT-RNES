// Libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Pages
import Home from "./pages/home";
import Post from "./pages/post";
import Create from "./pages/create";
import Login from "./pages/login";
import Register from "./pages/register";

// contexts
import PostCardContextProvider from "./contexts/home/postCardContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <PostCardContextProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/post/:id" element={<Post />} />
            <Route exact path="/post/create" element={<Create />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </PostCardContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
