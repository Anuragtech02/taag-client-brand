import axios from "axios";
import { useState, useEffect, createContext, useContext } from "react";
import { API_ARTIST, API_CAMPAIGN } from "../API";
import { AuthContext } from "../auth/AuthContext";

export const CampaignContext = createContext({});

const CampaignContextProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [artists, setArtists] = useState([]);

  const { currentUser } = useContext(AuthContext);

  async function fetchCampaigns(status = "all") {
    if (!currentUser) {
      return;
    }
    console.log(currentUser);
    const res = await API_CAMPAIGN().get(`/brand`, {
      params: {
        brand: currentUser.email,
      },
    });
    console.log({ res });
    setCampaigns(
      res.data?.map((campaign) => {
        let newObj = { ...campaign };
        newObj.brandAmount = campaign.selectedArtists?.reduce(
          (acc, curr) => acc + parseInt(curr.brandCommercial) || 0,
          0
        );
        newObj.id = newObj._id;
        delete newObj._id;
        return newObj;
      })
    );
    const art = await API_ARTIST().get(`/all`);
    setArtists(art.data);
  }

  async function fetchCampaign(id) {
    return await API_CAMPAIGN().get(`/single/`, {
      params: { id },
    });
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
