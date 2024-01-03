import { PoemType } from "../../../types/types";
import { Box, Card, Typography } from "@mui/material";
import { poemStyles } from "../../../styles/poems.styles";

interface SinglePoemProps {
  poem: PoemType;
}

const SinglePoem: React.FC<SinglePoemProps> = ({ poem }) => {
  return (
    <Card key={poem.id} sx={poemStyles.singlePoem}>
      <Box sx={poemStyles.poemPlate}></Box>
      <Typography variant="h5" sx={poemStyles.poemTitle}>
        {poem.title}
      </Typography>
      <Box sx={poemStyles.poemDetails}>
        <Typography sx={poemStyles.poemDate}>
          Date: {poem.date.toString()}
        </Typography>
        <Typography sx={poemStyles.poemAuthor}>
          Author: {poem?.user?.name ? poem?.user?.name : "XD"}
        </Typography>
      </Box>
    </Card>
  );
};

export default SinglePoem;
