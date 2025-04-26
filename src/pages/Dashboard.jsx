import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  CircularProgress,
  Alert,
} from "@mui/material";
import { API_BASE_URL } from "../config";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

    // Read the "search" query from URL
    const searchQuery = new URLSearchParams(location.search).get("search");

    useEffect(() => {
        const fetchBlogs = async () => {
          setLoading(true);
          setError("");
    
          try {
            const url = searchQuery
              ? `${API_BASE_URL}/blogs/search?query=${encodeURIComponent(searchQuery)}`
              : `${API_BASE_URL}/blogs`;
    
            const res = await fetch(url);
            const data = await res.json();
    
            if (!res.ok) throw new Error(data.message || "Failed to fetch blogs");
    
            setBlogs(data);
            setLoading(false);
          } catch (err) {
            console.error("Error fetching blogs:", err);
            setError(err.message || "Error loading blogs");
            setLoading(false);
          }
        };
    
        fetchBlogs();
      }, [searchQuery]); // <-- rerun when URL query changes

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        📝 {searchQuery ? `Results for "${searchQuery}"` : "All Blogs"}
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={3} style={{display: 'grid'}}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id} style={{cursor: 'pointer',border: 'solid 1px'}}>
            <Card onClick={() => navigate(`/blog/${blog.id}`)}>
              <CardHeader
                avatar={<Avatar>{blog.name.charAt(0)}</Avatar>}
                title={blog.title}
                subheader={blog.email}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {blog.content.length > 200
                    ? blog.content.slice(0, 200) + "..."
                    : blog.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
