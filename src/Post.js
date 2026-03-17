import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    const authorTag = post.author ? `@${post.author.split('@')[0]}` : '@anonymous';

    return (
        <article style={{
            display: 'flex',
            flexDirection: 'row',
            background: '#fff',
            borderRadius: '8px',
            overflow: 'hidden',
            marginBottom: '12px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
            height: '140px',
            textDecoration: 'none',
            color: 'inherit'
        }}>
            {/* Left: Thumbnail */}
            <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', flexShrink: 0, width: '240px', position: 'relative', display: 'block' }}>
                {post.thumbnailUrl ? (
                    <>
                        <img
                            src={post.thumbnailUrl}
                            alt="Thumbnail"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                        {/* Play button overlay */}
                        {post.videoUrl && (
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -60%)', backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '13px solid white', marginLeft: '3px' }}></div>
                            </div>
                        )}
                        {/* @author label below thumbnail */}
                        <div style={{ position: 'absolute', bottom: '5px', left: '6px', backgroundColor: 'rgba(255,255,255,0.85)', color: '#555', fontSize: '11px', fontWeight: '600', padding: '2px 7px', borderRadius: '20px', border: '1px solid #ddd', backdropFilter: 'blur(4px)' }}>
                            {authorTag}
                        </div>
                    </>
                ) : (
                    <div style={{ width: '100%', height: '100%', backgroundColor: '#e4e4e4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '28px' }}>📝</span>
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.85)', color: '#555', fontSize: '11px', fontWeight: '600', padding: '2px 7px', borderRadius: '20px', border: '1px solid #ddd' }}>
                            {authorTag}
                        </div>
                    </div>
                )}
            </Link>

            {/* Right: Content */}
            <Link to={`/post/${post.id}`} style={{ flex: 1, padding: '12px 15px', overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <h2 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 6px 0', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {post.title}
                    </h2>
                    <p style={{ fontSize: '13px', color: '#555', margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.5' }}>
                        {post.body}
                    </p>
                </div>
                <p style={{ fontSize: '11px', color: '#999', margin: '6px 0 0 0' }}>{post.datetime}</p>
            </Link>
        </article>
    );
}

export default Post;

