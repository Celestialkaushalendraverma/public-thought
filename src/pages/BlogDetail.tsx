import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Box,
} from "@mui/material";
import { API_BASE_URL } from "../config";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/blogs/details/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch blog");

        setBlog(data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading blog:", err);
        setError(err.message || "Error loading blog");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!blog) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" gutterBottom>
          {blog.title}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          By {blog.name} ({blog.email})
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography
            variant="body1"
            sx={{ whiteSpace: "pre-line" }} // preserves new lines in content
          >
            {blog.content}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default BlogDetail;
