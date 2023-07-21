import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBikes } from "../redux/actions/bikeActions";
import { Row, Col, DatePicker, Checkbox } from "antd";
import DefaultLayout from "../components/DefaultLayout";
import Loader from "../components/Loader";
import StripeCheckout from "react-stripe-checkout";
import { bookingBike } from "../redux/actions/bookingAction";

const { RangePicker } = DatePicker;

function BookingBike() {
  const { bikes } = useSelector((state) => state.custom);
  const { loading } = useSelector((state) => state.custom1);

  const [bike, setBike] = useState(null);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [hour, setHour] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isDatePickerSelected, setIsDatePickerSelected] = useState(false);
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

  useEffect(() => {
    if (bike) {
      setTotalAmount(hour * bike.rentPerHour + (driver && hour * 30));
    }
  }, [driver, hour, bike]);

  function selectTimeSlot(e) {
    if (e && e.length === 2) {
      const fromDate = e[0];
      const toDate = e[1];

      const fromTime = fromDate.format("MMM DD YYYY HH:mm");
      const toTime = toDate.format("MMM DD YYYY HH:mm");

      setFrom(fromTime);
      setTo(toTime);

      const diffInMilliseconds = toDate.diff(fromDate);
      const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));

      setHour(diffInHours);
      setIsDatePickerSelected(true);
    } else {
      setFrom(null);
      setTo(null);
      setHour(0);
      setIsDatePickerSelected(false);
    }
  }

  let bikeInfo = null;

  if (bike) {
    bikeInfo = (
      <>
        <div className="text-right">
          <h1 className="fancy">Bike Info</h1>
          <p>{bike.name}</p>
          <p>₹{bike.rentPerHour} Rent/Hour</p>
          <p> Fuel: {bike.fuelType} </p>
          <p> Max Persons: {bike.capacity} </p>
        </div>
      </>
    );
  }

  const stripePublishableKey =
    "pk_test_51NVqR0SIqS8BsIk6en8v7YHELAeHu4ATaFxchE1T6QR5mfpjakM8CMy9ZaQDfBMQqsuXsIh2F3rIJFAcpR21rYTk00Z80cRUs7";

  const onToken = (token) => {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      bike: bike._id,
      hour,
      totalAmount,
      driverRequire: driver,
      bookedTimeSlots: { from, to },
    };

    dispatch(bookingBike(reqObj));
  };

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
            <div className="text-right">
              <h1 className="fancy">Selected Time Slot</h1>
              <br />
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="MMM DD YYYY HH:mm"
                onChange={selectTimeSlot}
              />
              <div>
                <p>
                  Total Hours : <b> {hour} </b> Hours{" "}
                </p>
                {bike && (
                  <p>
                    Rent Per Hour : <b> ₹{bike.rentPerHour} </b> /Hour
                  </p>
                )}

                {isDatePickerSelected && (
                  <div>
                    <Checkbox
                      onChange={(e) => {
                        setDriver(e.target.checked);
                      }}
                    >
                      Driver Required
                    </Checkbox>
                    <h2>
                      Total Amount : <b>₹{totalAmount}/</b>
                    </h2>

                    <StripeCheckout
                      shippingAddress
                      token={onToken}
                      currency="inr"
                      amount={totalAmount * 100}
                      stripeKey={stripePublishableKey}
                    >
                      <button className="loginbtn">Book Now</button>
                    </StripeCheckout>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </DefaultLayout>
  );
}

export default BookingBike;
