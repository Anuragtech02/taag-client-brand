import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import {
  Home,
  Login,
  NewCampaign,
  Register,
  Campaign,
  Campaigns,
} from "./pages/";
import SelectArtists from "./pages/SelectArtists/SelectArtists";
import UploadArtists from "./pages/UploadArtists/UploadArtists";
import AuthContextProvider from "./utils/auth/AuthContext";
import PrivateRoute from "./utils/auth/PrivateRoute";
import CampaignContextProvider from "./utils/contexts/CampaignContext";
import CurrentContextProvider from "./utils/contexts/CurrentContext";
import "./App.css";
import BrandCampaigns from "./pages/Brand/BrandCampaigns";

const App = () => {
  return (
    <Router basename="/">
      <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <CampaignContextProvider>
          <CurrentContextProvider>
            <Routes>
              <Route path="/" element={<PrivateRoute component={Home} />} />
              <Route
                path="/new-campaign"
                element={<PrivateRoute component={NewCampaign} />}
              />
              <Route
                path="/campaigns"
                element={<PrivateRoute component={Campaigns} />}
              />
              <Route
                path="/campaigns/:id"
                element={<PrivateRoute component={Campaign} />}
              />
              <Route
                path="/campaigns/:id/commercials"
                element={<PrivateRoute component={Campaign} />}
              />
              <Route
                path="/campaigns/:id/analytics"
                element={<PrivateRoute component={Campaign} />}
              />
              <Route
                path="/campaigns/:id/select-artists"
                element={<PrivateRoute component={SelectArtists} />}
              />
              <Route
                path="/upload-artists"
                element={<PrivateRoute component={UploadArtists} />}
              />
              <Route path="/brand" element={<BrandCampaigns />} />
            </Routes>
          </CurrentContextProvider>
        </CampaignContextProvider>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
