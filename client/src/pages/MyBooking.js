import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllBookings } from "../redux/actions/bookingAction";
import { getAllBikes } from "./../redux/actions/bikeActions";
import { Col, Row } from "antd";
import moment from "moment";
import Loader from "../components/Loader";

export function MyBooking() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.custom2);
  const { bikes } = useSelector((state) => state.custom);
  const { loading } = useSelector((state) => state.custom1);
  const x = localStorage.getItem("user");
  const userObject = JSON.parse(x);
  const userId = userObject.data.user._id;

  const filteredData = bookings.filter((booking) => booking.user === userId);
  console.log(filteredData);
  console.log("ff",bookings);

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
      {loading && <Loader />}
      <h1 className="text-center text-3xl mt-2">My Bookings</h1>

      <Row className="justify-center">
        <Col lg={20} sm={24}>
          {filteredData.map((booking) => (
            <div key={booking._id} className="border p-4 my-4 rounded-lg">
              <Row className="gap-y-4">
                <Col lg={7} sm={24}>
                  <h2 className="font-bold text-lg">
                    {getBike(booking.bike)?.name}
                  </h2>
                  <p className="text-xl">Total Hours: {booking.hour}</p>
                  <p className="text-xl">
                    Rent per Hour:{" "}
                    {bikes.find((b) => b._id === booking.bike)?.rentPerHour}
                  </p>
                  <p className="text-xl">Total Amount: ₹{booking.totalAmount}</p>
                </Col>

                <Col lg={10} sm={24}>
                  <p className="text-xl">
                    From: {booking.bookedTimeSlots.from}
                  </p>
                  <p className="text-xl">To: {booking.bookedTimeSlots.to}</p>
                  <p className="text-xl">
                    Driver Required:{" "}
                    {booking.driverRequire === true ? "YES" : "NO"}
                  </p>
                  <p className="text-xl">
                    Date of Booking:{" "}
                    {moment(booking.createdAt).format("MMM DD YYYY")}
                  </p>
                </Col>

                <Col lg={7} sm={24} className="text-right">
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={getBikeImage(booking.bike)}
                      alt={getBike(booking.bike)?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Col>
              </Row>
            </div>
          ))}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default MyBooking;
