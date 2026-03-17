import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./api/posts";

const PostPage = ({ posts, setPosts }) => {
   const { id } = useParams();
   const post = posts.find(post => (post.id).toString() === id);
   const authorTag = post?.author ? `@${post.author.split('@')[0]}` : '@anonymous';
   
   const currentUser = localStorage.getItem("user");
   const [likes, setLikes] = useState([]);
   const [liking, setLiking] = useState(false);
   const isLiked = currentUser && likes.includes(currentUser);

   // Sync likes from post data (re-fetched on navigation)
   useEffect(() => {
     if (post?.likes) {
       setLikes(post.likes);
     }
   }, [post]);

   const handleLike = async () => {
     if (!currentUser) {
       alert("Please log in to like posts!");
       return;
     }
     if (liking) return;
     setLiking(true);
     try {
       const response = await api.post(`/posts/${post.id}/like`, { userEmail: currentUser });
       const updatedLikes = response.data.likes || [];
       setLikes(updatedLikes);
       
       // Update the parent posts state so likes persist across navigation
       setPosts(prevPosts => prevPosts.map(p => 
         p.id === post.id ? { ...p, likes: updatedLikes } : p
       ));
     } catch (err) {
       console.error("Like failed:", err);
     }
     setLiking(false);
   };

 return (
        <main className="PostPage">
            <article className="post">
                {post &&
                    <>
                        {/* Video player */}
                        {post.videoUrl && (
                          <div style={{ margin: "0 0 20px 0" }}>
                            <video 
                              controls 
                              autoPlay={false}
                              poster={post.thumbnailUrl} 
                              style={{ width: "100%", borderRadius: "8px", maxHeight: "500px", backgroundColor: "#000", display: "block" }}
                            >
                              <source src={post.videoUrl} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        )}
                        
                        {/* Thumbnail only */}
                        {!post.videoUrl && post.thumbnailUrl && (
                          <div style={{ margin: "0 0 20px 0" }}>
                            <img 
                                src={post.thumbnailUrl} 
                                alt="Post Thumbnail" 
                                style={{ width: "100%", borderRadius: "8px", maxHeight: "500px", objectFit: "cover", display: "block" }}
                            />
                          </div>
                        )}

                        {/* Title */}
                        <h2 style={{ fontSize: "20px", fontWeight: "700", margin: "0 0 6px 0" }}>{post.title}</h2>
                        
                        {/* Meta row: time, @author, and like button */}
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
                            <p className="postDate" style={{ margin: 0 }}>{post.datetime}</p>
                            <span style={{ backgroundColor: "#f0f0f0", color: "#555", fontSize: "12px", fontWeight: "600", padding: "3px 10px", borderRadius: "20px", border: "1px solid #ddd" }}>
                                {authorTag}
                            </span>
                            <button
                              onClick={handleLike}
                              disabled={liking}
                              style={{
                                marginLeft: "auto",
                                display: "flex", alignItems: "center", gap: "6px",
                                padding: "6px 14px",
                                background: isLiked ? "#fee2e2" : "#f5f5f5",
                                border: isLiked ? "1.5px solid #f87171" : "1.5px solid #ddd",
                                borderRadius: "20px",
                                cursor: "pointer",
                                fontSize: "14px",
                                fontWeight: "600",
                                color: isLiked ? "#dc2626" : "#666",
                                transition: "all 0.2s ease"
                              }}
                            >
                              <span style={{ fontSize: "16px" }}>{isLiked ? "❤️" : "🤍"}</span>
                              <span>{likes.length}</span>
                            </button>
                        </div>

                        {/* Full Description */}
                        <p className="postBody" style={{ marginTop: "0", whiteSpace: "pre-wrap", lineHeight: "1.7", fontSize: "15px" }}>{post.body}</p>
                    </>
                }
                {!post &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/'>Visit Our Homepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default PostPage;