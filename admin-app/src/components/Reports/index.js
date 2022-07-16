import React from "react";
import { Route, Redirect } from "react-router-dom";
import Layout from "../Layout";

const Reports = () => {
  // return <Route {...props} />;
  return (
    <Layout sidebar>
      <iframe
        width="100%"
        height="800"
        src="https://app.powerbi.com/reportEmbed?reportId=15d37684-bb19-4465-a875-bedb38ac6dae&autoAuth=true&ctid=aa232db2-7a78-4414-a529-33db9124cba7&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    </Layout>
  );
};

export default Reports;
