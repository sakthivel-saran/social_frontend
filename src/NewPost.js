import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewPost = ({
  handleSubmit, postTitle, setPostTitle, postBody, setPostBody, postVideo, setPostVideo, postThumbnail, setPostThumbnail
}) => {
  const navigate = useNavigate();

  // Auth guard: redirect to login if not logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  return (
        <main className="NewPost">
            <h2>New Post</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input
                    id="postTitle"
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                
                <label htmlFor="postThumbnail">Thumbnail Image:</label>
                <input
                    id="postThumbnail"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPostThumbnail(e.target.files[0] || null)}
                />

                <label htmlFor="postVideo">Video:</label>
                <input
                    id="postVideo"
                    type="file"
                    accept="video/*"
                    onChange={(e) => setPostVideo(e.target.files[0] || null)}
                />

                <label htmlFor="postBody">Caption:</label>
                <textarea
                    id="postBody"
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default NewPost