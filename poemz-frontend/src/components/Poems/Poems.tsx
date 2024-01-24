import { useQuery } from "@apollo/client";
import { GET_POEMS } from "../../queries/queries";
import { poemStyles } from "../../styles/poems.styles";
import SinglePoem from "./Partials/SinglePoemCard";
import { Box, Typography } from "@mui/material";
import { PoemType } from "../../types/types";

interface PoemsData {
  poems: PoemType[];
}

const Poems = () => {
  const { loading, data, error } = useQuery<PoemsData>(GET_POEMS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  console.log(data);

  return (
    <Box sx={poemStyles.container}>
      <Typography variant="h2" sx={poemStyles.heading}>
        All poemz
      </Typography>
      <Box sx={poemStyles.poemContainer}>
        {data?.poems.map((poem: PoemType) => (
          <SinglePoem key={poem.id} poem={poem} />
        ))}
      </Box>
    </Box>
  );
};

export default Poems;
