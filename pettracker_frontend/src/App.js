import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/layout/Layout";
import { NoPage } from "./pages/no_page/NoPage";
import { Home } from "./pages/home/Home";
import { HelpPage } from "./pages/help/Help";
import { ProfilePageOutlet } from "./pages/profile/ProfilePageOutlet";
import { RegisterView } from "./pages/profile/RegisterView";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { ProfileInfo } from "./pages/profile/ProfileInfo";
import { PetsPage } from "./pages/pets/PetsPage";
import { ClinicsPage } from "./pages/clinics/ClinicsPage";
import { VisitsPage } from "./pages/visits/VisitPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<ProfilePageOutlet />}>
            <Route index element={<ProfilePage />} />
            <Route path="/profile/info" element={<ProfileInfo />} />
            <Route path="/profile/register" element={<RegisterView />} />
          </Route>
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/visits" element={<VisitsPage />} />
          <Route path="/clinics" element={<ClinicsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
