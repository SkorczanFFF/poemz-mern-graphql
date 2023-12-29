import { Box } from "@mui/material";
import { homeStyles } from "../../styles/home.styles";

const Home = () => {
  return (
    <Box sx={homeStyles.container}>
      <Box sx={homeStyles.hello}>Poem of the day</Box>
    </Box>
  );
};

export default Home;
