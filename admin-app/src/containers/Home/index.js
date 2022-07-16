import React from "react";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";
import Layout from "../../components/Layout";
import "./style.css";
import { NavLink } from "react-router-dom";
import {
  FiUser,
  FiCheckCircle,
  FiBook,
  FiFileText,
  FiGift,
  FiDatabase,
} from "react-icons/fi";

const Home = () => {
  return (
    <Layout sidebar>
      <div className="s1">
        <h1>
          <FiUser />
          <br /> CAMPER Admin Instructions
        </h1>
      </div>
      <div className="s2">
        <div>
          <h2>
            <FiCheckCircle />
            &nbsp; Please Check All the New Orders
          </h2>
          <div style={{ marginLeft: "30px" }}>
            <li>First Navigate to the orders tab</li>
            <li>Scroll Down</li>
            <li>Check New Orders</li>
            <li>Upadate the Status</li>
          </div>
        </div>

        <div className="c">
          <h2>
            {" "}
            <FiBook />
            &nbsp; Page Tab
          </h2>
          <div style={{ marginLeft: "30px" }}>
            <li>Can Add Advertisments using this</li>
            <li>Navigate to this tab</li>
            <li>Click Create Page Button</li>
            <li>Add all the Banners and Posters in to the popup window</li>
            <li>Confirm</li>
          </div>
        </div>

        <div className="c">
          <h2>
            <FiFileText />
            &nbsp; Category Tab
          </h2>
          <div style={{ marginLeft: "30px" }}>
            <li>Can Update, Edit and Delete Categories</li>
          </div>
        </div>

        <div className="c">
          <h2>
            <FiGift />
            &nbsp; Product Tab
          </h2>
          <div style={{ marginLeft: "30px" }}>
            <li>Add all the products available</li>
            <li>Check the information of available products</li>
            <li>Delete Unnecessary Products</li>
          </div>
        </div>

        <div className="c">
          <h2>
            {" "}
            <FiDatabase /> &nbsp;Reports Tab
          </h2>
          <div style={{ marginLeft: "30px" }}>
            <li>Check all the available repots</li>
          </div>
        </div>
      </div>

      {/* //   <Container fluid>
    //     <Row>
    //       <Col md={"2"} className="sidebar">
    //         <ul>
    //           <li>
    //             <NavLink to={`/`}>Home</NavLink>
    //           </li>
    //           <li>
    //             <NavLink to={`/products`}>Products</NavLink>
    //           </li>
    //           <li>
    //             <NavLink to={`/orders`}>Orders</NavLink>
    //           </li>
    //         </ul>
    //       </Col>
    //       <Col md={"10"} style={{ marginLeft: "auto" }}>
    //         Container
    //       </Col>
    //     </Row>
    //   </Container> */}
      {/* <Jumbotron style={{ margin: "5rem" }} className="text-center">
        <h1>welcome</h1>
      </Jumbotron> */}
    </Layout>
  );
};

export default Home;
