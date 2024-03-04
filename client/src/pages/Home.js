import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBikes } from "../redux/actions/bikeActions";
import moment from "moment";

import { Button, Row, Col, DatePicker } from "antd";

import Loader from "../components/Loader";
import { Link } from "react-router-dom";
// import { configureStore } from "@reduxjs/toolkit";
const { RangePicker } = DatePicker;

function Home() {
  const { bikes } = useSelector((state) => state.custom);
  const { loading } = useSelector((state) => state.custom1);

  const [totalBikes, setTotalBikes] = useState([]);

  // const [flag, setFlag] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBikes());
  }, [dispatch]);

  // console.log(bikes);

  useEffect(() => {
    setTotalBikes(bikes);
  }, [bikes]);

  

  return (
    <DefaultLayout>
   

      {loading && <Loader />}

      <div>
        <Row justify="center" gutter={20} className="mt-5">
          {bikes.map((bike) => {
            return (
              <Col lg={5} sm={24} xs={24} key={bike.name}>
                <div className="bike bs-1 p-3 mt-5">
                  <img src={bike.image} className="bikeimg" alt="load" />
                  <div className="bike-content d-flex align-items-center justify-content-between">
                    <div>
                      <p>{bike.name}</p>
                      <p>₹{bike.rentPerHour} Rent/Hour</p>
                    </div>
                    <div>
                      <Button type="primary" className="btn1">
                        <Link to={`/booking/${bike._id}`}>Book Now</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </DefaultLayout>
  );
}

export default Home;
