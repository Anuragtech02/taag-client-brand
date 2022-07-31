import axios from "axios";
import { useState, useEffect, createContext, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export const CampaignContext = createContext({});

const CampaignContextProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [artists, setArtists] = useState([]);

  const { currentUser } = useContext(AuthContext);

  async function fetchCampaigns(status = "all") {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URI}/campaigns/all`,
      {
        params: {
          status,
        },
      }
    );
    setCampaigns(
      res.data?.map((campaign) => {
        let newObj = { ...campaign };
        newObj.id = newObj._id;
        delete newObj._id;
        return newObj;
      })
    );
    const art = await axios.get(`${process.env.REACT_APP_API_URI}/artist/all`);
    setArtists(art.data);
  }

  async function fetchCampaign(id) {
    return await axios.get(
      `${process.env.REACT_APP_API_URI}/campaigns/single/`,
      {
        params: { id },
      }
    );
  }

  useEffect(() => {
    fetchCampaigns();
  }, [currentUser]);

  return (
    <CampaignContext.Provider value={{ campaigns, fetchCampaign, artists }}>
      {children}
    </CampaignContext.Provider>
  );
};

export default CampaignContextProvider;
