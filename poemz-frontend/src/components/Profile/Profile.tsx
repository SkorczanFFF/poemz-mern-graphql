import { USER_DELETE } from "../../mutations/mutations";
import { Box, Button, Typography } from "@mui/material";
import { profileStyles } from "../../styles/profile.styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation, useQuery } from "@apollo/client";
import { authActions } from "../../store/auth-slice";
import { GET_USER_POEMS } from "../../queries/queries";
import { PoemType } from "../../types/types";
import { useEffect, useState } from "react";
import { DELETE_POEM } from "../../mutations/mutations";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [deleteUser] = useMutation(USER_DELETE);
  const [deletePoem] = useMutation(DELETE_POEM, {
    refetchQueries: [{ query: GET_USER_POEMS, variables: { id: userId } }],
  });

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      navigate("/auth");
      return;
    }

    const { id, name } = JSON.parse(userData);
    setUserId(id);
    setUsername(name);
  }, [navigate]);

  const { loading, error, data } = useQuery(GET_USER_POEMS, {
    variables: { id: userId },
    skip: !userId,
  });

  const logout = () => {
    localStorage.removeItem("userData");
    dispatch(authActions.logout());
    navigate("/");
  };

  const deleteUserAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        await deleteUser({ variables: { id: userId } });
        localStorage.removeItem("userData");
        dispatch(authActions.logout());
        navigate("/");
      } catch (err) {
        console.error("Error deleting account:", err);
      }
    }
  };

  const handleDeletePoem = async (poemId: string) => {
    if (window.confirm("Are you sure you want to delete this poem?")) {
      try {
        await deletePoem({ variables: { id: poemId } });
      } catch (err) {
        console.error("Error deleting poem:", err);
      }
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error)
    return <Typography>Error loading poems: {error.message}</Typography>;

  return (
    <Box sx={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {username}'s Profile
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/add-poem")}
        >
          Add New Poem
        </Button>

        <Button variant="outlined" color="error" onClick={deleteUserAccount}>
          Delete Account
        </Button>

        <Button variant="outlined" onClick={logout}>
          Logout
        </Button>
      </Box>

      <Typography variant="h5" sx={{ mb: 2 }}>
        My Poems
      </Typography>

      {data?.user?.poems?.length > 0 ? (
        <Box>
          {data.user.poems.map((poem: PoemType) => (
            <Box
              key={poem.id}
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                mb: 2,
              }}
            >
              <Typography variant="h6">{poem.title}</Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                {new Date(poem.date).toLocaleDateString()}
              </Typography>
              <Typography>{poem.content}</Typography>
              <Box sx={{ display: "flex", mt: 2, gap: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => navigate(`/edit-poem/${poem.id}`)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeletePoem(poem.id)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography>You haven't created any poems yet.</Typography>
      )}
    </Box>
  );
};

export default Profile;
