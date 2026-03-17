import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./App.css";

function Account({ posts, handleDelete }) {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const [view, setView] = useState(null); // null = menu, 'posts' = my posts

  React.useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  const authorTag = `@${user.split('@')[0]}`;
  const myPosts = (posts || []).filter(p => p.author === user);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px 16px", height: "calc(100vh - 140px)", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Profile header */}
      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <div style={{
          width: "70px", height: "70px", borderRadius: "50%",
          background: "linear-gradient(135deg, #4db6c9, #2e8b9e)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 12px auto", fontSize: "28px", color: "#fff", fontWeight: "700"
        }}>
          {user.charAt(0).toUpperCase()}
        </div>
        <h2 style={{ margin: "0 0 4px 0", fontSize: "18px", fontWeight: "700" }}>{authorTag}</h2>
        <p style={{ margin: 0, fontSize: "13px", color: "#888" }}>{user}</p>
      </div>

      {/* Menu or My Posts view */}
      {view === null && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <button
            onClick={() => setView('posts')}
            style={{
              display: "flex", alignItems: "center", gap: "14px",
              padding: "16px 20px", background: "#fff", border: "1.5px solid #e8e8e8",
              borderRadius: "10px", cursor: "pointer", fontSize: "15px", fontWeight: "600",
              color: "#333", textAlign: "left", boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
              transition: "border-color 0.15s"
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#4db6c9"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#e8e8e8"}
          >
            <span style={{ fontSize: "22px" }}>📋</span>
            <div>
              <div>My Posts</div>
              <div style={{ fontSize: "12px", color: "#999", fontWeight: "400" }}>{myPosts.length} post{myPosts.length !== 1 ? 's' : ''}</div>
            </div>
          </button>

          <button
            onClick={handleLogout}
            style={{
              display: "flex", alignItems: "center", gap: "14px",
              padding: "16px 20px", background: "#fff", border: "1.5px solid #e8e8e8",
              borderRadius: "10px", cursor: "pointer", fontSize: "15px", fontWeight: "600",
              color: "#e74c3c", textAlign: "left", boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
              transition: "border-color 0.15s"
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#e74c3c"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#e8e8e8"}
          >
            <span style={{ fontSize: "22px" }}>🚪</span>
            <div>Logout</div>
          </button>
        </div>
      )}

      {/* My Posts View */}
      {view === 'posts' && (
        <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
          <button
            onClick={() => setView(null)}
            style={{ background: "none", border: "none", color: "#4db6c9", cursor: "pointer", fontSize: "14px", marginBottom: "12px", padding: 0, display: "flex", alignItems: "center", gap: "5px", flexShrink: 0 }}
          >
            ← Back
          </button>
          <h3 style={{ margin: "0 0 12px 0", fontSize: "16px", fontWeight: "700", flexShrink: 0 }}>My Posts ({myPosts.length})</h3>

          {myPosts.length === 0 && (
            <p style={{ color: "#888", textAlign: "center", padding: "30px 0" }}>
              No posts yet. <Link to="/post">Create your first post!</Link>
            </p>
          )}

          <div style={{ flex: 1, overflowY: "auto", paddingRight: "4px" }}>
          {myPosts.map(post => (
            <div key={post.id} style={{
              display: "flex", alignItems: "center", gap: "12px",
              background: "#fff", borderRadius: "8px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)", padding: "10px 14px", marginBottom: "10px"
            }}>
              {post.thumbnailUrl ? (
                <img src={post.thumbnailUrl} alt="thumb" style={{ width: "75px", height: "47px", objectFit: "cover", borderRadius: "5px", flexShrink: 0 }} />
              ) : (
                <div style={{ width: "75px", height: "47px", background: "#eee", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "18px" }}>📝</div>
              )}

              <div style={{ flex: 1, overflow: "hidden" }}>
                <Link to={`/post/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <p style={{ fontWeight: "600", fontSize: "13px", margin: "0 0 3px 0", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{post.title}</p>
                </Link>
                <p style={{ fontSize: "11px", color: "#aaa", margin: 0 }}>{post.datetime}</p>
              </div>

              <div style={{ display: "flex", gap: "7px", flexShrink: 0 }}>
                <Link to={`/edit/${post.id}`}>
                  <button style={{ padding: "4px 11px", fontSize: "12px", background: "#4db6c9", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Edit</button>
                </Link>
                <button onClick={() => handleDelete(post.id)} style={{ padding: "4px 11px", fontSize: "12px", background: "#e74c3c", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Delete</button>
              </div>
            </div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
