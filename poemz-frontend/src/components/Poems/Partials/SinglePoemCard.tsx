import { PoemType } from "../../../types/types";
import { Box, Card, Typography } from "@mui/material";
import { poemStyles } from "../../../styles/poems.styles";
import { useNavigate } from "react-router-dom";
import { formatString } from "../../../hooks/formatString";

interface SinglePoemProps {
  poem: PoemType;
}

const SinglePoemCard: React.FC<SinglePoemProps> = ({ poem }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const browserFormatted = formatString(poem.title);
    navigate(`/poem/${poem.id}`);
  };

  return (
    <Card onClick={handleClick} key={poem.id} sx={poemStyles.singlePoem}>
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

export default SinglePoemCard;
