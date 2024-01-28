import { useParams } from "react-router-dom";
import { viewPoemStyles } from "../../styles/viewPoem.styles";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { GET_POEM_BY_ID } from "../../queries/queries";
import { useForm } from "react-hook-form";
import { ADD_COMMENT } from "../../mutations/mutations";

const ViewPoem = () => {
  const { register, handleSubmit } = useForm();
  const id = useParams().id;
  const [addCommentToPoem, addCommentResponse] = useMutation(ADD_COMMENT);
  const { data, error, loading } = useQuery(GET_POEM_BY_ID, {
    variables: {
      id,
    },
  });
  const commentHandler = async (data: any) => {
    const user: string = JSON.parse(
      localStorage.getItem("userData") as string
    ).id;
    const date = new Date();
    const text = data?.comment;

    try {
      const res = await addCommentToPoem({
        variables: {
          text,
          date,
          poem: id,
          user,
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(data?.poem?.comments);

  return (
    data && (
      <Box sx={viewPoemStyles.container}>
        <Box sx={viewPoemStyles.poemContainer}>
          <Typography sx={viewPoemStyles.poemTitle}>
            {data.poem.title}
          </Typography>
          <Typography sx={viewPoemStyles.poemContent}>
            {data.poem.content}
          </Typography>
        </Box>
        <Box sx={viewPoemStyles.commentsContainer}>
          <Typography>Comments:</Typography>
          <Box sx={viewPoemStyles.addCommentContainer}>
            <Typography>Add your comment</Typography>
            <TextField
              {...register("comment")}
              type="textarea"
              sx={viewPoemStyles.commentInput}
            />
            <Button
              sx={viewPoemStyles.sendCommentButton}
              onClick={handleSubmit(commentHandler)}
            >
              SEND
            </Button>
          </Box>
          <Box sx={viewPoemStyles.allCommentsContainer}>
            {data?.poem?.comments.map((comment: any, index: number) => (
              <Paper key={index} elevation={3}>
                {comment.user.name && typeof comment.user === "string" && (
                  <Typography variant="body1">{comment.user}</Typography>
                )}
                {comment.text && typeof comment.text === "string" && (
                  <Typography variant="body1" gutterBottom>
                    {comment.text}
                  </Typography>
                )}
              </Paper>
            ))}
          </Box>
        </Box>
      </Box>
    )
  );
};

export default ViewPoem;
