import React, { useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBikes } from "../redux/actions/bikeActions";
import { Button } from "antd";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";


function Home() {
  const { bikes } = useSelector((state) => state.custom);
  const { loading } = useSelector((state) => state.custom1);
  const navigate = useNavigate();
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBikes());
  }, [dispatch]);

  const bookbike = (id) => {
    navigate(`/booking/${id}`);
  };

  return (
    <DefaultLayout>
      {loading && <Loader />}

      <div className="container mx-auto mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {bikes.map((bike) => (
            <div
              key={bike.name}
              className="bg-white shadow-lg rounded-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105"
            >
              <img
                src={bike.image}
                className="w-full h-48 object-cover"
                alt="bike"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{bike.name}</h2>
                <p className="text-gray-600 mb-2">
                  ₹{bike.rentPerHour} Rent/Hour
                </p>
                <Button
                  onClick={() => bookbike(bike._id)}
                  type="primary"
                  className="w-full"
                >
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Home;
