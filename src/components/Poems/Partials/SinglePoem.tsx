import { PoemType } from "../../../types/types";
import { Box, Card, Typography, Button, Collapse } from "@mui/material";
import { poemStyles } from "../../../styles/poems.styles";
import { useState } from "react";
import Comments from "../../Comments/Comment";

interface SinglePoemProps {
  poem: PoemType;
}

const SinglePoem: React.FC<SinglePoemProps> = ({ poem }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card key={poem.id} sx={poemStyles.singlePoem}>
      <Box sx={poemStyles.poemPlate}></Box>
      <Typography variant="h5" sx={poemStyles.poemTitle}>
        {poem.title}
      </Typography>
      <Box sx={poemStyles.poemDetails}>
        <Typography sx={poemStyles.poemDate}>
          Date: {new Date(poem.date).toLocaleDateString()}
        </Typography>
        <Typography sx={poemStyles.poemAuthor}>
          Author: {poem?.user?.name ? poem?.user?.name : "Unknown"}
        </Typography>
      </Box>

      <Button
        variant="text"
        onClick={() => setExpanded(!expanded)}
        sx={{ mt: 1 }}
      >
        {expanded ? "Hide content" : "Show content"}
      </Button>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ p: 2, whiteSpace: "pre-line" }}>
          <Typography variant="body1">{poem.content}</Typography>

          <Comments poemId={poem.id} comments={poem.comments || []} />
        </Box>
      </Collapse>
    </Card>
  );
};

export default SinglePoem;
