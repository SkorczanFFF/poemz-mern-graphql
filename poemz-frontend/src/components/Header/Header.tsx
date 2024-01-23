import { useState } from "react";
import { AppBar, Button, Tab, Tabs, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import { headerStyles } from "../../styles/header.styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoggedIn from "./Partials/LoggedIn";

const Header = () => {
  const isLogged = useSelector((state: any) => state.isLogged);
  const [tabValue, setTabValue] = useState(0);

  return (
    <AppBar sx={headerStyles.container}>
      <Toolbar>
        <Box sx={headerStyles.logo}>POEMZ</Box>
        <Box sx={headerStyles.menuTabs}>
          <Tabs
            textColor="inherit"
            value={tabValue}
            onChange={(e, value: number) => setTabValue(value)}
          >
            {/* @ts-ignore */}
            <Tab
              disableRipple
              LinkComponent={Link}
              to="/"
              label="Home"
              sx={headerStyles.singleTab}
            />
            {/* @ts-ignore */}
            <Tab disableRipple LinkComponent={Link} to="/poems" label="Poems" />
          </Tabs>
          {isLogged ? (
            <>
              {/* @ts-ignore */}
              <Button LinkComponent={Link} to="/profile">
                Profile
              </Button>
              <LoggedIn />
            </>
          ) : (
            <>
              {/* @ts-ignore */}
              <Button
                LinkComponent={Link}
                to="/auth"
                sx={headerStyles.loginButton}
              >
                Login
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
