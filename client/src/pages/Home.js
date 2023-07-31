import React, { useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBikes } from "../redux/actions/bikeActions";
// import moment from "moment";

import { Button, Row, Col } from "antd";

import Loader from "../components/Loader";
import { Link } from "react-router-dom";
// const { RangePicker } = DatePicker;

function Home() {
  const { bikes } = useSelector((state) => state.custom);
  const { loading } = useSelector((state) => state.custom1);

  // const [totalBikes, setTotalBikes] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBikes());
  }, [dispatch]);

  // useEffect(() => {
  //   setTotalBikes(bikes);
  // }, [bikes]);

  // const setFilter = (e) => {
  //   var fromTime = moment(e[0],'MMM DD YYYY HH:mm');
  //   var toTime = moment(e[1],'MMM DD YYYY HH:mm');

  //   var filteredBikes = [];

  //   for (var bike of bikes) {
  //     if (bike.bookedTimeSlots === 0) {
  //       filteredBikes.push(bike);
  //     } else {
  //       for (var booking of bike.bookedTimeSlots) {
        

  //         if (
  //           fromTime.isBetween(booking.from, booking.to) ||
  //           toTime.isBetween(booking.from, booking.to) ||
  //           moment(booking.from).isBetween(fromTime, toTime) ||
  //           moment(booking.to).isBetween(fromTime, toTime)
  //         ) {
  //         } else {
  //           filteredBikes.push(bike);
  //         }
  //       }
  //     }
  //   }

    
  //   setTotalBikes(filteredBikes);
  // };

  return (
    <DefaultLayout>
      {/* <Row className="mt-4" justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-left">
          <RangePicker
            // onChange={setFilter}
            showTime={{ format: "HH:mm" }}
            format="MMM DD YYYY HH:mm"
          />
        </Col>
      </Row> */}

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
                        <Link to={`/booking/${bike._id}`}>Book Now !</Link>
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
