import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import CardInfo from "./pages/CardInfo/CardInfo";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movies/:id" element={<CardInfo />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
