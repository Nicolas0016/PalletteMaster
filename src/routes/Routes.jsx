import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Pallette from "../pages/Pallete";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pallette/:palletteName" element={<Pallette />} />
    </Routes>
  );
}
