import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { GET_POEMS } from "../../queries/queries";
import { UPDATE_POEM } from "../../mutations/mutations";
import { PoemType } from "../../types/types";

const EditPoem = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [poem, setPoem] = useState<PoemType | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLParagraphElement | null>(null);

  const { loading, error, data } = useQuery(GET_POEMS);
  const [updatePoem] = useMutation(UPDATE_POEM, {
    refetchQueries: [{ query: GET_POEMS }],
  });

  useEffect(() => {
    if (data?.poems) {
      const foundPoem = data.poems.find((p: PoemType) => p.id === id);
      if (foundPoem) {
        setPoem(foundPoem);
      } else {
        // Poem not found, redirect to profile
        navigate("/profile");
      }
    }
  }, [data, id, navigate]);

  const handleSubmit = async () => {
    if (
      titleRef.current &&
      titleRef.current.innerText.trim().length > 1 &&
      contentRef.current &&
      contentRef.current.innerText.trim().length > 0
    ) {
      try {
        const title = titleRef.current.innerText;
        const content = contentRef.current.innerText;

        await updatePoem({
          variables: {
            id,
            title,
            content,
          },
        });

        alert("Poem updated successfully");
        navigate("/profile");
      } catch (err) {
        console.error("Error updating poem:", err);
        alert("Failed to update poem");
      }
    } else {
      alert("Please provide both title and content for your poem");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;
  if (!poem) return <Typography>Poem not found</Typography>;

  return (
    <Box sx={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Edit Poem
      </Typography>

      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "1rem",
          mb: 2,
        }}
      >
        <h2
          ref={titleRef}
          contentEditable
          suppressContentEditableWarning
          style={{
            outline: "none",
            border: "none",
            fontSize: "1.5rem",
            marginBottom: "1rem",
          }}
        >
          {poem.title}
        </h2>
        <p
          ref={contentRef}
          contentEditable
          suppressContentEditableWarning
          style={{
            outline: "none",
            border: "none",
            minHeight: "150px",
            lineHeight: "1.6",
          }}
        >
          {poem.content}
        </p>
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
        <Button variant="outlined" onClick={() => navigate("/profile")}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EditPoem;
