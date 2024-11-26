import { useState } from "react";

function DiscussionPage() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      setPosts([{ id: Date.now(), content: newPost.trim() }, ...posts]);
      setNewPost("");
    }
  };

  return (
    <div>
      <h1 style={styles.header}>Discussion Page</h1>
      <form onSubmit={handlePostSubmit} style={styles.form}>
        <textarea
          style={styles.textarea}
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write something..."
        />
        <button style={styles.button} type="submit">
          Post
        </button>
      </form>
      <div>
        {posts.length === 0 ? (
          <p style={styles.noPosts}>No posts yet. Start the discussion!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} style={styles.post}>
              {post.content}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
  },
  header: {
    color: "#333",
  },
  form: {
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  postsContainer: {
    textAlign: "left",
  },
  post: {
    backgroundColor: "#f9f9f9",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  noPosts: {
    color: "#888",
    fontStyle: "italic",
  },
};

export default DiscussionPage;
