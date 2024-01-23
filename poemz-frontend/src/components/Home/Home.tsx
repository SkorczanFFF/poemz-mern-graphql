import { Box, Typography } from "@mui/material";
import { homeStyles } from "../../styles/home.styles";
import { useQuery } from "@apollo/client";
import { GET_RANDOM_POEM } from "../../queries/queries";
import { PoemType } from "../../types/types";

const Home = () => {
  const { loading, error, data } = useQuery<PoemType>(GET_RANDOM_POEM);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("Error fetching random poem:", error.message);
    return <p>Error fetching random poem: {error.message}</p>;
  }

  return (
    <Box sx={homeStyles.container}>
      <Box sx={homeStyles.hello}>Poem of the day</Box>
      {data ? (
        <Box sx={homeStyles.randomPoem}>
          <Box sx={homeStyles.randomPoemDetails}>
            <Typography sx={homeStyles.randomPoemTitle}>
              {data?.title ? data?.title : "title"}
            </Typography>
            <Typography sx={homeStyles.randomPoemDate}>{"ddata"}</Typography>
          </Box>
          <Typography sx={homeStyles.randomPoemContent}>
            {data?.content ? data?.content : "content"}
          </Typography>
        </Box>
      ) : (
        <p>No random poem available.</p>
      )}
    </Box>
  );
};

export default Home;
