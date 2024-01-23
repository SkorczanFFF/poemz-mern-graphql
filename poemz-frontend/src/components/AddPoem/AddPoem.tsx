import { Box, Button, Typography } from "@mui/material";
import { addPoemStyles } from "../../styles/addPoem.styles";
import { useRef } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POEM } from "../../mutations/mutations";

const AddPoem = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLParagraphElement | null>(null);
  const [addPoem] = useMutation(ADD_POEM);

  const handleSubmit = async () => {
    if (
      titleRef.current &&
      titleRef?.current?.innerText.trim().length > 1 &&
      contentRef.current &&
      contentRef?.current?.innerText
    ) {
      const title = titleRef?.current?.innerText;
      const content = contentRef?.current?.innerText;
      const date = new Date();
      const user = JSON.parse(localStorage.getItem("userData") as string).id;
      console.log(user);

      try {
        const res = await addPoem({
          variables: {
            title,
            content,
            date,
            user,
          },
        });
        console.log(res?.data);
        alert("poem added successfully");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Box sx={addPoemStyles.container}>
      <Typography sx={addPoemStyles.heading}>Add new poem</Typography>
      <form>
        <Box sx={addPoemStyles.formContainer}>
          <h2 ref={titleRef} contentEditable>
            Title
          </h2>
          <p contentEditable ref={contentRef}>
            Your poem goes here
          </p>
          <Button
            color="success"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddPoem;
