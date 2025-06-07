import React from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Divider,
  Paper,
  Skeleton,
  Alert,
} from "@mui/material";
import { GET_POEM_OF_THE_DAY, GET_TOP_RATED_POEMS } from "../../queries";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const {
    loading: loadingPoemOfDay,
    error: errorPoemOfDay,
    data: poemOfDayData,
  } = useQuery(GET_POEM_OF_THE_DAY);

  const {
    loading: loadingTopPoems,
    error: errorTopPoems,
    data: topPoemsData,
  } = useQuery(GET_TOP_RATED_POEMS);

  const renderPoemOfTheDay = () => {
    if (loadingPoemOfDay) {
      return (
        <Card>
          <CardContent>
            <Skeleton variant="text" height={40} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="text" height={100} />
          </CardContent>
        </Card>
      );
    }

    if (errorPoemOfDay) {
      return (
        <Alert severity="error">
          Error loading Poem of the Day: {errorPoemOfDay.message}
        </Alert>
      );
    }

    const poem = poemOfDayData?.poemOfTheDay;
    if (!poem) return null;

    return (
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {poem.title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            by {poem.user.name} • {new Date(poem.date).toLocaleDateString()}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {poem.content}
          </Typography>
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate(`/poems/${poem._id}`)}
            sx={{ mt: 2 }}
          >
            Read More
          </Button>
        </CardContent>
      </Card>
    );
  };

  const renderTopRatedPoems = () => {
    if (loadingTopPoems) {
      return (
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5].map((key) => (
            <Grid item xs={12} key={key}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" height={30} />
                  <Skeleton variant="text" height={20} />
                  <Skeleton variant="text" height={60} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      );
    }

    if (errorTopPoems) {
      return (
        <Alert severity="error">
          Error loading Top Rated Poems: {errorTopPoems.message}
        </Alert>
      );
    }

    return (
      <Grid container spacing={2}>
        {topPoemsData?.topRatedPoems.map((poem: any, index: number) => (
          <Grid item xs={12} key={poem._id}>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateX(8px)",
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/poems/${poem._id}`)}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    mr: 2,
                    color: "primary.main",
                    fontWeight: "bold",
                  }}
                >
                  #{index + 1}
                </Typography>
                <Typography variant="h6">{poem.title}</Typography>
              </Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                by {poem.user.name} • {new Date(poem.date).toLocaleDateString()}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {poem.content}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Poem of the Day
        </Typography>
        {renderPoemOfTheDay()}
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h4" component="h2" gutterBottom>
          Top Rated Poems
        </Typography>
        {renderTopRatedPoems()}
      </Box>
    </Box>
  );
};

export default Home;
