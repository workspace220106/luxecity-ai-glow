import { Routes, Route } from "react-router-dom";
import Index from "./routes/index";
import About from "./routes/about";
import Contact from "./routes/contact";
import Explore from "./routes/explore";
import AiAdvisor from "./routes/ai-advisor";
import Matchmaker from "./routes/matchmaker";
import Membership from "./routes/membership";
import Profile from "./routes/profile";
import SalonPage from "./routes/salon.$id";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/ai-advisor" element={<AiAdvisor />} />
      <Route path="/matchmaker" element={<Matchmaker />} />
      <Route path="/membership" element={<Membership />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/salon/:id" element={<SalonPage />} />
    </Routes>
  );
}
