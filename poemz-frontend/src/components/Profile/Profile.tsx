import { USER_DELETE } from "../../mutations/mutations";
import { Box, Button } from "@mui/material";
import { profileStyles } from "../../styles/profile.styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { authActions } from "../../store/auth-slice";

const Profile = () => {
  const navigate = useNavigate();
  const [deleteUser] = useMutation(USER_DELETE);
  const dispatch = useDispatch();

  const deleteUserAccount = async () => {
    try {
      const res = await deleteUser({
        variables: {
          //@ts-ignore
          userId: JSON.parse(localStorage.getItem("userData").id as string),
        },
      });
      console.log(res);
      localStorage.clear();
      dispatch(authActions.logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    dispatch(authActions.logout());
    navigate("/");
  };

  return (
    <div>
      <Box sx={profileStyles.container}>
        <Button
          sx={profileStyles.deleteUserButton}
          onClick={() => deleteUserAccount()}
        >
          Delete account
        </Button>

        <Button sx={profileStyles.logoutUserButton} onClick={logout}>
          Logout
        </Button>
      </Box>
    </div>
  );
};

export default Profile;
