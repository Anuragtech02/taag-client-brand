import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button, CustomTable } from "../../components";
import { MainLayout } from "../../layouts";
import { CampaignContext } from "../../utils/contexts/CampaignContext";
import styles from "./Campaign.module.scss";
// import { TabContext, TabPanel, TabList } from "@mui/lab";
import { Box, Tab, Tabs, styled } from "@mui/material";
import { TabIcon } from "../../assets";
import { CurrentContext } from "../../utils/contexts";
import { KMBFormatter } from "../../utils";
import { tableData } from "../../utils/constants";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Campaign = () => {
  // const [campaign, setCampaign] = useState({});
  const { tabIndex, setTabIndex, table, setCampaignId } =
    useContext(CurrentContext);
  const handleTabsChange = (event, newValue) => {
    setTabIndex(newValue);
    setTab(newValue);
  };

  const location = useLocation();

  const [tab, setTab] = useState(0);

  const { campaign, setCampaign, campaignMain, campaignAnalytics } =
    useContext(CurrentContext);
  const { id } = useParams();

  useEffect(() => {
    setCampaignId(id);
  }, [id]);

  useEffect(() => {
    console.log({ campaign });
  }, [campaign]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const temp = await fetchCampaign(id);
  //     setCampaign(temp.data);
  //     console.log({ temp });
  //   }
  //   if (id) {
  //     fetchData();
  //   }
  // }, [id]);

  function handleSelectRow(rows) {
    setCampaign({ ...campaign, selectedArtists: rows });
  }

  return (
    <MainLayout
      classes={[styles.container]}
      isSideMenuVisible
      campaignId={id}
      navbarProps={{
        titleProps: {
          id: "name",
          disabled: true,
          isBackIconVisible: true,
          name: campaign?.name,
        },
      }}
      moreInformationProps={{
        isVisible: true,
        agencyFees: campaign?.agencyFee,
        brandAmount: campaign?.brandAmount,
        totalAverageViews: KMBFormatter(campaign?.totalAverageViews || 0),
        totalCreator: campaign?.selectedArtists?.length.toString() || "0",
        averageROI: "0.4",
      }}
    >
      <div className={styles.tablesContainer}>
        {location.pathname.includes("analytics") && (
          <div className={styles.tableContainer}>
            <CustomTable
              columns={tableData.campaign_analytics.columns}
              data={campaignAnalytics}
              onRowSelect={handleSelectRow}
              selectedRows={campaign?.selectedArtists || []}
            />
          </div>
        )}
        {!location.pathname.includes("analytics") && (
          <div className={styles.tableContainer}>
            <CustomTable
              columns={tableData.campaign.main.columns}
              data={campaignMain}
              onRowSelect={handleSelectRow}
              selectedRows={campaign?.selectedArtists || []}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

// const StyledTabList = styled(TabList)(() => {
//   return {
//     ".MuiTabs-indicator": {
//       backgroundColor: "var(--clr-primary)",
//     },
//   };
// });

export default Campaign;
