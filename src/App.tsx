import { Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Rules } from "@/pages/Rules";
import { Prizes } from "@/pages/Prizes";
import { Faq } from "@/pages/Faq";
import { Register } from "@/pages/Register";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/prizes" element={<Prizes />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
