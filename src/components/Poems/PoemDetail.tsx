import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Alert,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { GET_POEM } from "../../queries";
import { CREATE_COMMENT, DELETE_POEM, DELETE_COMMENT } from "../../mutations";
import { RootState } from "../../store";

const PoemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);

  const { loading, error, data, refetch } = useQuery(GET_POEM, {
    variables: { id },
  });

  const [createComment] = useMutation(CREATE_COMMENT);
  const [deletePoem] = useMutation(DELETE_POEM);
  const [deleteComment] = useMutation(DELETE_COMMENT);

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error loading poem: {error.message}
      </Alert>
    );
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await createComment({
        variables: {
          poemId: id,
          text: newComment,
        },
      });
      setNewComment("");
      refetch();
    } catch (err) {
      console.error("Error creating comment:", err);
    }
  };

  const handleDeletePoem = async () => {
    try {
      await deletePoem({
        variables: { id },
      });
      navigate("/poems");
    } catch (err) {
      console.error("Error deleting poem:", err);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment({
        variables: { id: commentId },
      });
      refetch();
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const { poem } = data;

  return (
    <Box>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {poem.title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
              >
                by {poem.user.name} • {new Date(poem.date).toLocaleDateString()}
              </Typography>
            </Box>
            {user?._id === poem.user._id && (
              <Box>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate(`/poems/edit/${poem._id}`)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  Delete
                </Button>
              </Box>
            )}
          </Box>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {poem.content}
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Comments ({poem.comments.length})
        </Typography>
        {user ? (
          <form onSubmit={handleCommentSubmit}>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!newComment.trim()}
            >
              Post Comment
            </Button>
          </form>
        ) : (
          <Alert severity="info">
            Please <Button onClick={() => navigate("/login")}>login</Button> to
            comment
          </Alert>
        )}
      </Box>

      <Box>
        {poem.comments.map((comment: any) => (
          <Paper key={comment._id} sx={{ p: 2, mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Box>
                <Typography variant="subtitle2">{comment.user.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(comment.date).toLocaleDateString()}
                </Typography>
              </Box>
              {user?._id === comment.user._id && (
                <Button
                  size="small"
                  color="error"
                  variant="text"
                  onClick={() => handleDeleteComment(comment._id)}
                >
                  Delete
                </Button>
              )}
            </Box>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {comment.text}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Poem</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this poem? This action cannot be
          undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeletePoem} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PoemDetail;
