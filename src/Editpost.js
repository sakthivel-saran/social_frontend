import { useEffect}  from "react";
import { useParams, Link } from "react-router-dom";
 const Editpost = ({ posts, handleEdit, setEditTitle, setEditBody, editTitle, editBody, editVideo, setEditVideo, editThumbnail, setEditThumbnail }) => {
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);
    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
            setEditVideo(post.videoUrl || '');
            setEditThumbnail(post.thumbnailUrl || '');
        }
    }, [post, setEditTitle, setEditBody, setEditVideo, setEditThumbnail])

    const handleFileChange = (e, setter) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setter(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };





return (
        <main className="NewPost">
            {editTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />

                        {editThumbnail && (
                             <img src={editThumbnail} alt="Thumbnail preview" style={{width: "150px", marginTop: "10px", borderRadius: "5px"}}/>
                        )}
                        <label htmlFor="postThumbnail">Thumbnail Image:</label>
                        <input
                            id="postThumbnail"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, setEditThumbnail)}
                        />
                        
                        {editVideo && (
                            <p style={{fontSize: "12px", color: "green", marginTop: "10px"}}>Video uploaded.</p>
                        )}
                        <label htmlFor="postVideo">Video:</label>
                        <input
                            id="postVideo"
                            type="file"
                            accept="video/*"
                            onChange={(e) => handleFileChange(e, setEditVideo)}
                        />

                        <label htmlFor="postBody">Caption:</label>
                        <textarea
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </>
            }
        </main>
    )
}



export default Editpost
