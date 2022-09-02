import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { tableData } from "../constants";
import { CampaignContext } from "./CampaignContext";

export const CurrentContext = createContext({});

const CurrentContextProvider = ({ children }) => {
  const location = useLocation();
  const [table, setTable] = useState({
    columns: [],
    data: [],
  });
  const [campaignId, setCampaignId] = useState("");
  const [tabIndex, setTabIndex] = useState("1");
  const [campaign, setCampaign] = useState({});
  const [campaignMain, setCampaignMain] = useState([]);
  const [campaignInfo, setCampaignInfo] = useState([]);
  const [campaignContact, setCampaignContact] = useState([]);
  const [campaignInvoice, setCampaignInvoice] = useState([]);
  const [campaignAnalytics, setCampaignAnalytics] = useState([]);

  const { fetchCampaign, artists } = useContext(CampaignContext);

  useEffect(() => {
    async function fetchData() {
      let temp = await fetchCampaign(campaignId);
      temp.data.totalAverageViews = getTotal(
        temp.data.selectedArtists,
        "averageViews"
      );
      temp.data.totalCreator = temp.data.selectedArtists.length.toString();
      temp.data.agencyFees = getTotal(temp.data.selectedArtists, "agencyFees");
      console.log({ temp });
      setCampaign(temp.data);
      setCampaignMain(
        artists.map((item) => ({
          key: item._id,
          _id: item._id,
          name: item.name,
          link: item.link || "",
          followers: item.followers,
          averageViews: item.averageViews,
          deliverable: temp.data.deliverable,
          commercialCreator: item.commercialCreator || 0,
          brandCommercial: item.brandCommercial || 0,
          cpvBrand: item.cpvBrand || 0,
          agencyFees:
            item.agencyFees ||
            parseInt(item.brandCommercial) - parseInt(item.commercialCreator) ||
            0,
        }))
      );
      setCampaignInfo(
        artists.map((item) => ({
          key: item._id,
          _id: item._id,
          name: item.name,
          gender: item.gender,
          location: item.location,
          languages: item.languages,
          categories: item.categories,
          type: item.type,
        }))
      );
      setCampaignContact(
        artists.map((item) => ({
          key: item._id,
          _id: item._id,
          name: item.name,
          agencyName: item.agencyName,
          manager: item.manager,
          contact: item.contact,
          email: item.email,
        }))
      );
      setCampaignInvoice(
        artists.map((item) => ({
          key: item._id,
          _id: item._id,
          name: item.name,
          invoice: item.invoice,
          date: item.date,
          note: item.note,
        }))
      );
      setCampaignAnalytics(
        artists.map((item) => ({
          key: item._id,
          _id: item._id,
          name: item.name,
          deliverableLink: item.deliverableLink || "NA",
          views: item.views,
          comments: item.comments,
          roi: item.roi,
        }))
      );
      // handleTable(location);
    }
    if (campaignId) {
      fetchData();
    }
  }, [campaignId, fetchCampaign]);

  return (
    <CurrentContext.Provider
      value={{
        campaign,
        setCampaign,
        table,
        setTable,
        campaignId,
        setCampaignId,
        setTabIndex,
        tabIndex,
        campaignMain,
        campaignInfo,
        campaignContact,
        campaignInvoice,
        campaignAnalytics,
        setCampaignMain,
        setCampaignInfo,
        setCampaignContact,
        setCampaignInvoice,
        setCampaignAnalytics,
      }}
    >
      {children}
    </CurrentContext.Provider>
  );
};

export default CurrentContextProvider;

function getTotal(data, key) {
  return data.reduce((acc, item) => acc + item[key], 0);
}
