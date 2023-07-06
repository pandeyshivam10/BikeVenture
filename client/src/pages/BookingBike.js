import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBikes } from "../redux/actions/bikeActions";
import Loader from "../components/Loader";

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

  return (
    <DefaultLayout>
      {loading ? (
        <div><Loader/></div>
      ) : bike ? (
        <div>
          <div>Booking Car Page</div>
          <h1>Car Name = {bike.name}</h1>
        </div>
      ) : (
        <div>Car not found</div>
      )}
    </DefaultLayout>
  );
}

export default BookingBike;
