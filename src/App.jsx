import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import CardInfo from "./pages/CardInfo/CardInfo";
import Favourites from "./pages/Favourites/Favourites";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movies/:id" element={<CardInfo />} />
        <Route path="/movies/favourites" element={<Favourites />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
