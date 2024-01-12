import { Box } from "@mui/material";
import { homeStyles } from "../../styles/home.styles";
import { useQuery } from "@apollo/client";
import { GET_RANDOM_POEM } from "../../queries/queries";

const Home = () => {
  const { loading, error, data } = useQuery(GET_RANDOM_POEM);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const randomPoem = data.randomPoem;

  return (
    <Box sx={homeStyles.container}>
      <Box sx={homeStyles.hello}>Poem of the day</Box>
      <Box sx={homeStyles.randomPoem}>
        {/* Display the random poem */}
        {randomPoem && (
          <div>
            <h3>Random Poem:</h3>
            <h4>{randomPoem.title}</h4>
            <p>{randomPoem.content}</p>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default Home;
