import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBikes } from "../redux/actions/bikeActions";
import { Row, Col, DatePicker, Checkbox } from "antd";
import DefaultLayout from "../components/DefaultLayout";
import Loader from "../components/Loader";
// import StripeCheckout from "react-stripe-checkout";
import { bookingBike } from "../redux/actions/bookingAction";
import moment from "moment";

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
      setTotalAmount(hour * bike.rentPerHour + (driver ? hour * 30 : 0));
    }
  }, [driver, hour, bike]);

  function selectTimeSlot(e) {
    if (e && e.length === 2) {
      const fromDate = e[0];
      const toDate = e[1];

      const fromTime = fromDate.format("MMM DD YYYY HH:mm");
      const toTime = toDate.format("MMM DD YYYY HH:mm");

      console.log(fromTime);
      console.log(toTime);

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
          <p>Fuel: {bike.fuelType}</p>
          <p>Max Persons: {bike.capacity}</p>
        </div>
      </>
    );
  }

  // const stripePublishableKey =
  //   "pk_test_51NVqR0SIqS8BsIk6en8v7YHELAeHu4ATaFxchE1T6QR5mfpjakM8CMy9ZaQDfBMQqsuXsIh2F3rIJFAcpR21rYTk00Z80cRUs7"; // Replace with your actual Stripe publishable key
  const x = localStorage.getItem("user");
  const userObject = JSON.parse(x);
  const userId = userObject.data.user._id;

  const onToken = () => {
    const reqObj = {
      user: userId,
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
      <div className="container  px-4 py-8 flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            {bike && (
              <img
                src={bike.image}
                className="w-full h-auto rounded-lg border border-gray-300"
                alt="Bike"
              />
            )}
          </div>
          <div className="mt-5">
            {bike && (
              <div className="text-right">
                <h1 className=" fancy text-3xl font-semibold mb-4">
                  {bike.name}
                </h1>
                <p className="text-lg mb-2">
                  Rent Per Hour: ₹{bike.rentPerHour}
                </p>
                <p className="text-lg mb-2">Fuel Type: {bike.fuelType}</p>
                <p className="text-lg mb-2">Max Persons: {bike.capacity}</p>
              </div>
            )}

            <div className=" text-right mt-8">
              <h1 className=" fancy text-2xl font-semibold mb-4">
                Selected Time Slot
              </h1>
              <RangePicker
                disabledDate={(current) =>
                  current && current < moment().startOf("day")
                }
                showTime={{ format: "HH:mm" }}
                format="MMM DD YYYY HH:mm"
                onChange={selectTimeSlot}
                okButtonProps={{ className: "text-black" }}
              />

              {isDatePickerSelected && (
                <div className="mt-4">
                  <p className="text-lg mb-2">
                    Total Hours: <b>{hour}</b> Hours
                  </p>
                  {bike && (
                    <p className="text-lg mb-2">
                      Rent Per Hour: <b>₹{bike.rentPerHour}</b>
                    </p>
                  )}

                  <Checkbox
                    className="text-lg mb-4"
                    onChange={(e) => {
                      setDriver(e.target.checked);
                    }}
                  >
                    Driver Required
                  </Checkbox>

                  <h2 className="text-xl mb-2">
                    Total Amount: <b>₹{totalAmount}</b>
                  </h2>

                  <button
                    onClick={() => onToken()}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Book Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default BookingBike;
