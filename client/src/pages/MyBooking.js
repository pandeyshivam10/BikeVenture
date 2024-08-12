import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.data?.user?._id;

  // Filter bookings for the current user
  const filteredData = bookings.filter((booking) => booking.user === userId).reverse();

  useEffect(() => {
    dispatch(getAllBookings());
    dispatch(getAllBikes());
  }, [dispatch]);

  const getBikeDetails = (bikeId) => {
    return bikes.find((b) => b._id === bikeId);
  };

  return (
    <DefaultLayout>
      {loading && <Loader />}
      <h1 className="text-center text-3xl mt-3">My Bookings</h1>
<br></br>
      {filteredData.length === 0 ? (
        <h1>You have no Bookings</h1>
      ) : (
        <Row className="justify-center">
          <Col lg={20} sm={24}>
            {filteredData.map((booking) => {
              const bike = getBikeDetails(booking.bike);
              return (
                <div key={booking._id} className="border p-4 my-4 rounded-lg">
                  <Row className="gap-y-4">
                    <Col lg={7} sm={24}>
                      <h2 className="font-bold text-lg">{bike?.name}</h2>
                      <p className="text-xl">Total Hours: {booking.hour}</p>
                      <p className="text-xl">Rent per Hour: {bike?.rentPerHour}</p>
                      <p className="text-xl">Total Amount: ₹{booking.totalAmount}</p>
                    </Col>

                    <Col lg={10} sm={24}>
                      <p className="text-xl">From: {booking.bookedTimeSlots.from}</p>
                      <p className="text-xl">To: {booking.bookedTimeSlots.to}</p>
                      <p className="text-xl">
                        Driver Required: {booking.driverRequire ? "YES" : "NO"}
                      </p>
                      <p className="text-xl">
                        Date of Booking: {moment(booking.createdAt).format("MMM DD YYYY")}
                      </p>
                    </Col>

                    <Col lg={7} sm={24} className="text-right">
                      <div className="w-full h-48 overflow-hidden">
                        <img
                          src={bike?.image}
                          alt={bike?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              );
            })}
          </Col>
        </Row>
      )}
    </DefaultLayout>
  );
}

export default MyBooking;
