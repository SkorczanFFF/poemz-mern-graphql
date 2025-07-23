import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { theme } from "./styles/theme";
import { store } from "./store";
import Layout from "./components/Layout/Layout";

// Pages
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import PoemList from "./components/Poems/PoemList";
import PoemDetail from "./components/Poems/PoemDetail";
import AddPoem from "./components/AddPoem/AddPoem";
import EditPoem from "./components/EditPoem/EditPoem";
import Profile from "./components/Profile/Profile";
import NotFound from "./components/NotFound/NotFound";

// Create Apollo Client
const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL || "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/poems" element={<PoemList />} />
              <Route path="/poems/:id" element={<PoemDetail />} />
              <Route path="/poems/new" element={<AddPoem />} />
              <Route path="/poems/edit/:id" element={<EditPoem />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
