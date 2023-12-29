import { useState } from "react";
import { AppBar, Button, Tab, Tabs, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import { headerStyles } from "../../styles/header.styles";

const Header = () => {
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
            <Tab disableRipple label="Home" sx={headerStyles.singleTab} />
            <Tab disableRipple label="Poems" />
          </Tabs>
          <Button sx={headerStyles.loginButton}>Sign in</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
