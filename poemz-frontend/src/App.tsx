import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Poems from "./components/Poems/Poems";
import Auth from "./components/Auth/Auth";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { authAuctions } from "./store/auth-slice";
import Profile from "./components/Profile/Profile";

function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state: any) => state.isLogged);
  console.log(isLogged);

  useEffect(() => {
    const data = localStorage.getItem("userData") as string;
    if (JSON.parse(data) !== null) {
      dispatch(authAuctions.login());
    }
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/poems" element={<Poems />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
