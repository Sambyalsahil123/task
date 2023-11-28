import React from "react";
import Typography from "@material-ui/core/Typography";

const Dashboard = () => {
  return (
    <div 
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4">Welcome to the Dashboard!</Typography>
      <Typography variant="body1"></Typography>
    </div>
  );
};

export default Dashboard;
