import styles from "./Navbar.module.scss";
import { Logo } from "../";
import {
  IconButton,
  Box,
  LinearProgress,
  linearProgressClasses,
} from "@mui/material";
import { Breadcrumb } from "../";
import { styled } from "@mui/system";
import { icons, images } from "../../assets";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { bell, editing, back } = icons;
const { profile } = images;

const Navbar = ({ titleProps, progress }) => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Logo />
          <Title
            id={titleProps?.id}
            disabled={titleProps?.disabled}
            name={titleProps?.name}
            onChange={titleProps?.onChange}
            isEditIconVisible={titleProps?.isEditIconVisible}
            isBackIconVisible={titleProps?.isBackIconVisible}
            brandName={titleProps?.brandName}
          />
        </div>
        <div className={styles.right}>
          <BellButton newNotifications={true} />
          <ProfileButton onClick={handleLogout} />
        </div>
      </div>
      {progress ? <MUILinearProgress progress={progress} /> : ""}
    </div>
  );
};

const ProfileButton = ({ ...remaining }) => {
  return (
    <div className={styles.profile}>
      <IconButton {...remaining}>
        <img src={profile} alt="Profile" />
      </IconButton>
    </div>
  );
};

const BellButton = ({ newNotifications, ...remaining }) => {
  return (
    <div className={styles.bellButton}>
      <IconButton {...remaining}>
        <img src={bell} alt="Bell" />
        {newNotifications && <span className={styles.newNotifications}></span>}
      </IconButton>
    </div>
  );
};

const Title = ({
  id,
  name,
  isEditIconVisible,
  isBackIconVisible,
  brandName,
  onChange,
  disabled,
  ...remaining
}) => {
  console.log(remaining);
  return (
    <div
      style={brandName ? { alignSelf: "flex-end" } : {}}
      className={styles.title}
    >
      <div className={styles.top}>
        <div className={styles.fixedWidth}>
          {isBackIconVisible && <Breadcrumb />}
        </div>
        <input
          id={id}
          value={name}
          type="text"
          disabled={disabled}
          onChange={onChange}
          {...remaining}
        />
        <label htmlFor={id} className={styles.fixedWidth}>
          {isEditIconVisible && <img src={editing} alt="Editing" />}
        </label>
      </div>
      <p style={brandName ? { marginBottom: "6px" } : {}}>{brandName}</p>
    </div>
  );
};

const MUILinearProgress = ({ progress }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <StyledMUILinearProgress variant="determinate" value={progress} />
    </Box>
  );
};

const StyledMUILinearProgress = styled(LinearProgress)(() => {
  return {
    [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: "#643ad9",
    },
  };
});

export default Navbar;
