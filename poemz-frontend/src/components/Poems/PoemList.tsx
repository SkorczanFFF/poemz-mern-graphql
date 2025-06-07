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
  Skeleton,
  Alert,
} from "@mui/material";
import { GET_POEMS } from "../../queries";
import { Poem } from "../../types";

const PoemList: React.FC = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_POEMS);

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((key) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <Card>
              <CardContent>
                <Skeleton variant="text" height={40} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={100} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error loading poems: {error.message}
      </Alert>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1">
          Poems
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/poems/new")}
        >
          Write New Poem
        </Button>
      </Box>

      <Grid container spacing={3}>
        {data.poems.map((poem: Poem) => (
          <Grid item xs={12} sm={6} md={4} key={poem._id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                "&:hover": {
                  boxShadow: 6,
                },
              }}
              onClick={() => navigate(`/poems/${poem._id}`)}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {poem.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  by {poem.user.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {poem.content}
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {new Date(poem.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {poem.comments.length} comments
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {data.poems.length === 0 && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No poems found
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => navigate("/poems/new")}
          >
            Write the First Poem
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PoemList;
