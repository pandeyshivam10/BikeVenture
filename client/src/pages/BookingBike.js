import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBikes } from "../redux/actions/bikeActions";
import Loader from "../components/Loader";
import { Row, Col, Divider } from "antd";

function BookingBike() {
  const { bikes } = useSelector((state) => state.custom);
  const { loading } = useSelector((state) => state.custom1);

  const [bike, setBike] = useState(null);

  const dispatch = useDispatch();
  const { bikeid } = useParams();

  useEffect(() => {
    dispatch(getAllBikes());
  }, [dispatch]);

  useEffect(() => {
    if (bikes.length > 0) {
      const foundBike = bikes.find((x) => x._id === bikeid);
      if (foundBike) {
        setBike(foundBike);
      }
    }
  }, [bikes, bikeid]);

  let bikeInfo = null;
  let selectedTime = null;
  if (bike) {
    bikeInfo = (
      <>
        <div className="text-right">
          <h1 class="fancy">Bike Info</h1>
          <p>{bike.name}</p>
          <p>{bike.rentPerHour} Rent/Hour</p>
          <p> Fuel : {bike.fuelType} </p>
          <p> Max Persons : {bike.capacity} </p>
        </div>
      </>
    );

    selectedTime = (
      <>
        <div className="text-right">
          <h1 class="fancy">Selected Time Slot</h1>
          
        </div>
      </>
    );
  }

  return (
    <DefaultLayout>
      {loading && <Loader />}

      <div>
        <Row
          justify="center"
          className="d-flex align-items-center"
          style={{ minHeight: "90vh" }}
        >
          <Col lg={10} sm={24} xs={24}>
            {bike && (
              <img
                src={bike.image}
                className="bikeimg2 bs-1"
                alt="loading..."
              />
            )}
          </Col>
          <Col lg={10} sm={24} xs={24}>
            {bikeInfo}
            {selectedTime}
          </Col>
        </Row>
      </div>
    </DefaultLayout>
  );
}

export default BookingBike;
