import { USER_DELETE } from "../../mutations/mutations";
import { Box, Button } from "@mui/material";
import { profileStyles } from "../../styles/profile.styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { authActions } from "../../store/auth-slice";

const Profile = () => {
  const navigate = useNavigate();
  const [deleteUser] = useMutation(USER_DELETE);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("id");
  console.log("id", userId);
  const isLogged = useSelector((state: any) => state.isLogged);
  console.log(isLogged);

  const deleteUserAccount = async (userId: string) => {
    try {
      // Perform the user deletion
      const res = await deleteUser({ variables: { userId } }); // Consider passing necessary variables if required by the mutation

      // Check if deletion was successful
      if (res?.data?.deleteUser) {
        // Clear local storage
        localStorage.clear();

        // Dispatch logout action (if using Redux or another state management library)
        // Replace authActions.logout() with the appropriate action dispatch from your auth slice
        // For example, if using Redux Toolkit: dispatch(authActions.logout())
        // Make sure to import the correct action from your auth slice
        dispatch(authActions.logout());

        // Navigate to the desired route
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Box sx={profileStyles.container}>
        {/* <Button sx={profileStyles.deleteUserButton} onClick={deleteUserAccount(userId)}>
          Delete account
        </Button> */}
      </Box>
    </div>
  );
};

export default Profile;
