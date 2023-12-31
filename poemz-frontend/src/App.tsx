import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Poems from "./components/Poems/Poems";
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/poems" element={<Poems />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
