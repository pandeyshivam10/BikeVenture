import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllBookings } from "../redux/actions/bookingAction";
import { getAllBikes } from './../redux/actions/bikeActions';

export function MyBooking() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.custom2);
  const { bikes } = useSelector((state) => state.custom);

  useEffect(() => {
    dispatch(getAllBookings());
    dispatch(getAllBikes());
  }, [dispatch]);

  const getBikeImage = (bikeId) => {
    const bike = bikes.find((b) => b._id === bikeId);
    return bike ? bike.image : null;
  };

  return (
    <DefaultLayout>
      {bookings.map((booking) => (
        <div className="card my-3" key={booking._id}>
          <div className="card-body">
            {booking.bike && (
              <img
                src={getBikeImage(booking.bike)}
                alt={`Bike ${booking.bike}`}
                className="card-img-top"
              />
            )}
            <p className="card-text">From: {booking.bookedTimeSlots.from}</p>
            <p className="card-text">To: {booking.bookedTimeSlots.to}</p>
            <p className="card-text">Hours: {booking.hour}</p>
            <p className="card-text">Total Amount: {booking.totalAmount}</p>
            <p className="card-text">Transaction ID: {booking.transactionId}</p>
            <p className="card-text">
              Driver Required: {booking.driverRequire ? "Yes" : "No"}
            </p>
          </div>
        </div>
      ))}
    </DefaultLayout>
  );
}
