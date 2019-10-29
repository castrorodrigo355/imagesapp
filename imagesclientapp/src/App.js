import React, { useState, useEffect } from 'react';
import ImagesForm from "./components/ImagesForm";
import ImagesList from "./components/ImagesList";
import axios from "axios";
import './App.css';

function App() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then(res => res.json())
      .then(response => setPosts(response))
      .catch(err => console.log(err))
  }, [])

  const onGetPost = id => {
    fetch("http://localhost:3000/image/" + id)
      .then(res => res.json())
      .then(post => console.log(post))
      .catch(err => console.log(err))
  }

  const onDeletePost = id => {
    fetch("http://localhost:3000/image/" + id, 
      { method: 'DELETE' })
      .then(res => res.json())
      .then(response => setPosts(response))
      .catch(err => console.log(err));
  }

  const onAddPost = (file, post) => {
    const { title, description } = post;
    if (!file || title === "" || description === "") {
      alert("Complete field please")
    } else {
      const fd = new FormData();
      fd.append("image", file, file.name);
      fd.append("title", post.title);
      fd.append("description", post.description);
      axios.post("http://localhost:3000/upload", fd)
          .then(response => setPosts(response.data))
          .catch(err => console.log(err))
    }
  }

  return (
    <div className="App container">
      <hr/>
      <ImagesForm onAddPost={onAddPost}/>
      <hr/>
      <ImagesList posts={posts} onGetPost={onGetPost} onDeletePost={onDeletePost}/>
    </div>
  );
}

export default App;