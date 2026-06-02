import { HashRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AppShell } from "./components/layout/AppShell";
import { Home } from "./pages/Home";

// Home ships in the initial bundle (it's the landing + LCP page). The rest are
// split into their own chunks so they don't weigh down first paint — each is
// fetched on first navigation. Named exports are adapted to lazy()'s default.
const Events = lazy(() => import("./pages/Events").then((m) => ({ default: m.Events })));
const EventDetail = lazy(() => import("./pages/EventDetail").then((m) => ({ default: m.EventDetail })));
const Rules = lazy(() => import("./pages/Rules").then((m) => ({ default: m.Rules })));
const Inscription = lazy(() => import("./pages/Inscription").then((m) => ({ default: m.Inscription })));
const About = lazy(() => import("./pages/About").then((m) => ({ default: m.About })));

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={null}>
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
      </Suspense>
    </HashRouter>
  );
}
