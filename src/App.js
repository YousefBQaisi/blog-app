import logo from "./logo.svg";
import "./App.css"
import PostFrom from "./components/forms/postForm";
import { useEffect, useState } from "react";
import AppPosts from "./components/posts";
import { Container } from "semantic-ui-react";

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    var dataPost = localStorage.getItem("posts");
    setPosts(JSON.parse(dataPost));
  }, [
    JSON.parse(localStorage.getItem("posts")) != null
      ? JSON.parse(localStorage.getItem("posts")).length
      : 0,
  ]);
  return (
    <div className="App ">
      <Container as={"div"}>
      <PostFrom />
      <div className="pt-4">
      <AppPosts posts={posts} />
      </div>
     

      </Container>
    </div>
  );
}

export default App;
