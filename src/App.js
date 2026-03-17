import About from "./About";
import Home from "./Home";
import Footer from "./Footer";
import Header from "./Header";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import {  Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import {format} from "date-fns";
import { useNavigate } from "react-router-dom";
import api from  "./api/posts";
import Editpost from "./Editpost";
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxiosFetch";
import Login from "./Login";
import Register from "./Register";
import Account from "./Account";


function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postVideo, setPostVideo] = useState('');
  const [postThumbnail, setPostThumbnail] = useState('');
  
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [editVideo, setEditVideo] = useState('');
  const [editThumbnail, setEditThumbnail] = useState('');
  const navigate = useNavigate();
  const {width} = useWindowSize()
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');




  useEffect(() => {
    setPosts(data);
  }, [data])
    

  useEffect(() => {
    const filteredResults = posts.filter((post) => 
    (post.body).toLowerCase().includes(search.toLowerCase()) ||
    (post.title).toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search])



  const handleSubmit = async (e) => {
        e.preventDefault();
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        
        const formData = new FormData();
        formData.append('title', postTitle);
        formData.append('datetime', datetime);
        formData.append('body', postBody);
        formData.append('author', localStorage.getItem('user') || 'Anonymous');
        
        // Append raw files if selected
        if (postThumbnail) formData.append('thumbnail', postThumbnail);
        if (postVideo) formData.append('video', postVideo);
        
        try {
        const response = await api.post("/posts", formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        const allPosts = [...posts, response.data];
        setPosts(allPosts);
        setPostTitle('');
        setPostBody('');
        setPostVideo(null);
        setPostThumbnail(null);
        navigate("/");
         } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
     
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { 
      id, 
      title: editTitle, 
      datetime, 
      body: editBody,
      videoUrl: editVideo,
      thumbnailUrl: editThumbnail
    };
    try{
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
        setEditTitle('');
        setEditBody('');
        setEditVideo('');
        setEditThumbnail('');
       
        navigate("/");
    }catch (err) {
        console.log(`Error: ${err.message}`);
    }
  };

  const handleDelete = async(id) => {
    try {
      await api.delete(`/posts/${id}`);
       const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
  
    }catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }
   







  return (
    <div className="App">
      
      <Header title="My youtube App" width={width} />
      <Nav search={search} setSearch={setSearch} />

    <Routes>
      <Route path="/" element={<Home 
      posts={searchResults}
      fetcherror={fetchError}
      isLoading={isLoading}
       />} />
      <Route path="post">
        <Route index element={<NewPost 
        handleSubmit={handleSubmit}
        postTitle={postTitle}
        setPostTitle={setPostTitle}
        postBody={postBody}
        setPostBody={setPostBody}
        postVideo={postVideo}
        setPostVideo={setPostVideo}
        postThumbnail={postThumbnail}
        setPostThumbnail={setPostThumbnail}
        />}/>
      
      <Route path=":id" element={<PostPage posts={posts} setPosts={setPosts} />} />  

      </Route>
      <Route path="edit/:id" element={<Editpost 
          posts={posts} 
          handleEdit={handleEdit} 
          setEditTitle={setEditTitle} 
          setEditBody={setEditBody} 
          editTitle={editTitle} 
          editBody={editBody} 
          editVideo={editVideo}
          setEditVideo={setEditVideo}
          editThumbnail={editThumbnail}
          setEditThumbnail={setEditThumbnail}
        />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/account" element={<Account posts={posts} handleDelete={handleDelete} />} />
      <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />  
      

    
    </div>
  );
}

export default App;
