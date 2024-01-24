import { useParams } from "react-router-dom";
import { viewPoemStyles } from "../../styles/viewPoem.styles";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_POEM_BY_ID } from "../../queries/queries";

const ViewPoem = () => {
  const id = useParams().id;
  const { data, error, loading } = useQuery(GET_POEM_BY_ID, {
    variables: {
      id,
    },
  });
  console.log(data);

  return (
    data && (
      <Box sx={viewPoemStyles.container}>
        <Typography sx={viewPoemStyles.poemTitle}>{data.poem.title}</Typography>
        <Typography sx={viewPoemStyles.poemContent}>
          {data.poem.content}
        </Typography>
      </Box>
    )
  );
};

export default ViewPoem;
