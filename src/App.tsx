import { HashRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { Home } from "./pages/Home";
import { Events } from "./pages/Events";
import { EventDetail } from "./pages/EventDetail";
import { Rules } from "./pages/Rules";
import { Inscription } from "./pages/Inscription";
import { About } from "./pages/About";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="evenements" element={<Events />} />
          <Route path="event/:id" element={<EventDetail />} />
          <Route path="regles" element={<Rules />} />
          <Route path="inscription" element={<Inscription />} />
          <Route path="a-propos" element={<About />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
