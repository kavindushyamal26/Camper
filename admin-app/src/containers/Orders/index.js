import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import Modal from "../../components/UI/Modal";
import Input from "../../components/UI/Input";

import "./style.css";

const Orders = (props) => {
  const order = useSelector((state) => state.order);
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const [sortedOrders, setsortedOrders] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [reStatus, setreStatus] = useState({
    id: "",
    status: "",
  });
  const [updating, setupdating] = useState("");

  const onOrderUpdate = (orderId) => {
    alert("Successfully Updated");
    const payload = {
      orderId,
      type,
    };
    //console.log("ll", { payload });
    dispatch(updateOrder(payload));
  };

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };
  // const sorted = order.orders[0].orderStatus.sort(compare);
  // const compare = (a, b) => {
  //   if (a.date < b.date) {
  //     return -1;
  //   }
  //   if (a.date > b.date) {
  //     return 1;
  //   }
  //   return 0;
  // };

  const setReturnStatus = () => {
    console.log("reStatus", reStatus);
  };

  return (
    <Layout sidebar>
      {order.orders.map((orderItem, index) => (
        <Card
          style={{
            margin: "10px 0",
          }}
          key={index}
          headerLeft={`${orderItem._id} - ${orderItem.user.firstName} ${orderItem.user.lastName} `}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 30px 10px 30px",
              alignItems: "center",
            }}
          >
            <div>
              <div className="title">Items</div>
              {orderItem.items.map((item, index) => (
                <div className="value" key={index}>
                  {item.productId.name}
                </div>
              ))}
            </div>
            <div>
              <span className="title">Total Price</span>
              <br />
              <span className="value">{orderItem.totalAmount}</span>
            </div>
            <div>
              <span className="title">Payment Type</span> <br />
              <span className="value">{orderItem.paymentType}</span>
            </div>
            <div>
              <span className="title">Payment Status</span>
              <br />
              {/* <span className="value">{orderItem.paymentStatus}</span> */}
              <span className="value">
                {orderItem.orderStatus.map((status, index) =>
                  status.isCompleted ? (
                    <span key={index}>{status.type}&nbsp;-&nbsp;</span>
                  ) : null
                )}
              </span>
              {/* <span className="value">orderItem.orderStatus[0].type</span> */}
            </div>
            <div>
              <span className="title">Time Period</span>
              <br />
              {orderItem.reserveddates && (
                <span className="value">
                  {new Date(orderItem.reserveddates.from).toLocaleDateString()}{" "}
                  -{new Date(orderItem.reserveddates.to).toLocaleDateString()}{" "}
                </span>
              )}
            </div>
          </div>

          <div
            style={{
              boxSizing: "border-box",
              padding: "50px 100px 50px 100px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="orderTrack">
              {orderItem.orderStatus.map((status) => (
                <div
                  className={`orderStatus ${
                    status.isCompleted ? "active" : ""
                  }`}
                >
                  <div
                    className={`point ${status.isCompleted ? "active" : ""}`}
                  ></div>
                  <div className="orderInfo">
                    <div className="status">{status.type}</div>
                    <div className="date">{formatDate(status.date)}</div>
                  </div>
                </div>
              ))}

              {/* <div className="orderStatus">
                <div className="point"></div>
                <div className="orderInfo">
                  <div className="status">Packd</div>
                  <div className="date">Fri, 2021</div>
                </div>
              </div>

              <div className="orderStatus">
                <div className="point"></div>
                <div className="orderInfo">
                  <div className="status">Shipped</div>
                  <div className="date">Fri, 2021</div>
                </div>
              </div>

              <div className="orderStatus">
                <div className="point"></div>
                <div className="orderInfo">
                  <div className="status">Delivered</div>
                  <div className="date">Fri, 2021</div>
                </div>
              </div> */}
            </div>

            {/* select input to apply order action */}
            <div
              style={{
                padding: "0 50px",
                boxSizing: "border-box",
                marginLeft: "50px",
              }}
            >
              <select className="ss" onChange={(e) => setType(e.target.value)}>
                <option value={""}>select status</option>
                {orderItem.orderStatus.map((status) => {
                  return (
                    <>
                      {!status.isCompleted ? (
                        <option key={status.type} value={status.type}>
                          {status.type}
                        </option>
                      ) : null}
                    </>
                  );
                })}
              </select>
            </div>

            {/* button to confirm action */}
            <div
              style={{
                padding: "0 50px",
                boxSizing: "border-box",
              }}
            >
              <button
                className="bb"
                onClick={() => onOrderUpdate(orderItem._id)}
              >
                confirm
              </button>
            </div>
            {/* <div>
              {updating == orderItem._id && (
                <>
                  <input
                    value={reStatus.status}
                    onChange={(e) =>
                      setreStatus({ id: orderItem._id, status: e.target.value })
                    }
                    type="text"
                  />
                  <button onClick={setReturnStatus} className="bb">
                    Set
                  </button>
                </>
              )}
              {updating != orderItem._id && (
                <button
                  onClick={() => setupdating(orderItem._id)}
                  className="bb"
                >
                  Return status
                </button>
              )}
            </div> */}
          </div>
        </Card>
      ))}
    </Layout>
  );
};

export default Orders;
