import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllBookings } from "../redux/actions/bookingAction";
import { getAllBikes } from "./../redux/actions/bikeActions";
import { Col, Row } from "antd";
import moment from "moment";

export function MyBooking() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.custom2);
  const { bikes } = useSelector((state) => state.custom);

  const x = localStorage.getItem("user");
  const userObject = JSON.parse(x);
  const userId = userObject._id;

  const filteredData = bookings.filter((booking) => booking.user === userId);

  useEffect(() => {
    dispatch(getAllBookings());
    dispatch(getAllBikes());
  }, [dispatch]);

  const getBikeImage = (bikeId) => {
    const bike = bikes.find((b) => b._id === bikeId);
    return bike ? bike.image : null;
  };
  const getBike = (bikeId) => {
    const bike = bikes.find((b) => b._id === bikeId);
    return bike;
  };
  filteredData.reverse();

  return (
    <DefaultLayout>
      <h1 className="text-center mt-2 ">My Bookings</h1>

      <Row justify="center">
        <Col lg={20} sm={24}>
          <Row gutter={[16, 16]}>
            {filteredData.map((booking) => (
              <Row
                className="m-2 text-left bookingRow flex-align-items-center"
                key={booking._id}
              >
                <Col lg={7} sm={24}>
                  <h2>
                    <b>{getBike(booking.bike)?.name}</b>
                  </h2>
                  <p className="card-text">Total Hours: {booking.hour}</p>
                  <p className="card-text">
                    Rent per Hour: {getBike(booking.bike).rentPerHour}
                  </p>
                  <p className="card-text">
                    Total Amount: {booking.totalAmount}
                  </p>
                </Col>

                <Col lg={10} sm={24}>
                  <p className="card-text">
                    From: {booking.bookedTimeSlots.from}
                  </p>
                  <p className="card-text">To: {booking.bookedTimeSlots.to}</p>
                  <p className="card-text">
                    Transaction ID: {booking.transactionId}
                  </p>
                  <p className="card-text">
                    Date of Booking:{" "}
                    {moment(booking.createdAt).format("MMM DD YYYY")}
                  </p>
                </Col>

                <Col lg={7} sm={24} className="text-right">
                  <img
                    src={getBikeImage(booking.bike)}
                    alt={getBike(booking.bike)?.name}
                    style={{ width: "100%" }}
                  />
                </Col>
              </Row>
            ))}
          </Row>
        </Col>
      </Row>
    </DefaultLayout>
  );
}
