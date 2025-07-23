import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Box, Button, TextField, Typography } from "@mui/material";
import { ADD_COMMENT, DELETE_COMMENT } from "../../mutations/mutations";
import { GET_POEMS } from "../../queries/queries";
import { CommentType } from "../../types/types";

interface CommentsProps {
  poemId: string;
  comments: CommentType[];
}

const Comments = ({ poemId, comments }: CommentsProps) => {
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

  const userData = localStorage.getItem("userData");
  const userId = userData ? JSON.parse(userData).id : null;

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: GET_POEMS }],
  });

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    refetchQueries: [{ query: GET_POEMS }],
  });

  const handleAddComment = async () => {
    if (!userId) {
      alert("Please login to add a comment");
      return;
    }

    if (commentText.trim().length === 0) {
      alert("Comment cannot be empty");
      return;
    }

    try {
      await addComment({
        variables: {
          text: commentText,
          date: new Date().toISOString(),
          user: userId,
          poem: poemId,
        },
      });
      setCommentText("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteComment({
          variables: {
            id: commentId,
          },
        });
      } catch (err) {
        console.error("Error deleting comment:", err);
      }
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button
        variant="text"
        onClick={() => setShowComments(!showComments)}
        sx={{ mb: 2 }}
      >
        {showComments
          ? "Hide Comments"
          : `Show Comments (${comments?.length || 0})`}
      </Button>

      {showComments && (
        <>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Add a comment"
              multiline
              rows={2}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              sx={{ mb: 1 }}
            />
            <Button variant="contained" size="small" onClick={handleAddComment}>
              Add Comment
            </Button>
          </Box>

          {comments?.length > 0 ? (
            comments.map((comment) => (
              <Box
                key={comment.id}
                sx={{
                  border: "1px solid #eee",
                  borderRadius: "4px",
                  p: 1,
                  mb: 1,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="subtitle2">
                    {comment.user.name}
                  </Typography>
                  <Typography variant="caption">
                    {new Date(comment.date).toLocaleDateString()}
                  </Typography>
                </Box>
                <Typography variant="body2">{comment.text}</Typography>

                {userId && comment.user.id === userId && (
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDeleteComment(comment.id)}
                    sx={{ mt: 1 }}
                  >
                    Delete
                  </Button>
                )}
              </Box>
            ))
          ) : (
            <Typography variant="body2">No comments yet</Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default Comments;
