import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { RiArrowUpDownLine } from "react-icons/ri";
import { airports, airlines } from "../airports";
import Card from "../Components/Card";
import Navbar from "../Components/Navbar";
import { config } from "../config";


function Dashboard() {
  let [display, setDisplay] = useState("d-none");
  var airline = [];
  let [price, setPrice] = useState(200);
  let [offer, setOffer] = useState(0);
  for (let i = 0; i < 3; i++) {
    airline[i] = airlines[Math.floor(Math.random() * airlines.length)];
  }
  let showFlight = () => {
    setDisplay("d-block");
    document.querySelector("#date").setAttribute("disabled", true);
  };
  // console.log(today >= '10/26/2022' );
  let showDate = () => {
    setPrice(200);
    setDisplay("d-none");
    document.querySelector("#date").removeAttribute("disabled");
  };
  let changeTab = () => {
    let temp = "",
      temp2;
    let one = document.querySelector("#from");
    let two = document.querySelector("#to");
    temp = one.value;
    one.value = two.value;
    two.value = temp;
    temp2 = formik.values.from;
    formik.values.from = formik.values.to;
    formik.values.to = temp2;
  };
  let calculateOffer = (offer) => {
    if (!(offer == 0)) setPrice(price - (price * offer) / 100);
  };

  const formik = useFormik({
    initialValues: {
      from: "",
      to: "",
      date: "",
      checkDate: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.from) {
        errors.from = "Please enter from";
      }
      if (!values.to) {
        errors.to = "Please enter to";
      }
      if (!values.date) {
        errors.date = "Please enter date";
      }

      if (values.from === values.to) {
        errors.from = "From and To place should be different";
      }

      console.log(errors);
      return errors;
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        let res = await axios.post(`${config.api}/api/date/dashboard`, values, {
          headers: {
            Authorization: `${localStorage.getItem("react_app_token")}`,
          },
        });
        console.log(res.data);
        alert(res.data.message);
        showFlight();
        setPrice(200);
        setOffer(res.data.offer);
        calculateOffer(res.data.offer);
      } catch (error) {
        alert("Date Should not be lesserthan today");
        console.log(error);
      }
    },
  });
  return (
    <>
      <Navbar />

      <div className="container-fluid d-flex justify-content-center mt-5">
        <div className="row fs-3">✈️ Search Your Flight</div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col  d-flex justify-content-center">
            <form className="container" onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col d-flex flex-column">
                  <div className=" d-flex flex-column">
                    <label for="from">From :  <select
                      name="from"
                      className="rounded m-5 btn btn-info dropdown-toggle"
                      id="from"
                      onChange={formik.handleChange}
                      value={formik.values.from}
                    >
                      <option value={"none"}>From</option>
                      {airports.map((airport) => {
                        return (
                          <option
                            value={`${airport.city}`}
                          >{`${airport.city}`}</option>
                        );
                      })}
                    </select></label>

                  </div>
                  <div className="row" >
                    <div className="col " style={{ display: "flex", alignItems: 'flex-start' }}>
                      <RiArrowUpDownLine
                        className="border rounded fs-2 pointer"
                        onClick={() => changeTab()}
                      />
                    </div>
                  </div>
                  <div className=" d-flex flex-column">
                    <label for="to" >    To:   <select
                      name="to"
                      className="rounded m-5 btn btn-info dropdown-toggle"
                      id="to"
                      onChange={formik.handleChange}
                      value={formik.values.to}
                    >
                      <option value={"none"}>To</option>
                      {airports.map((airport) => {
                        return (
                          <option
                            value={`${airport.city}`}
                          >{`${airport.city}`}</option>
                        );
                      })}
                    </select></label>


                  </div>
                  {formik.errors.from ? (
                    <span className="text-danger">{formik.errors.from}</span>
                  ) : null}
                </div>
              </div>
              <div className="row m-5">
                <div className="col d-flex justify-content-center">
                  <label
                    htmlFor="date"
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      marginRight: '0.5rem',
                      color: '#333',
                    }}
                  >
                    Select Date:
                  </label>


                  <input
                    type="date"
                    id="date"
                    name="date"
                    onChange={formik.handleChange}
                    value={formik.values.date}
                  />
                  <button
                    type="button"
                    onClick={() => showDate()}
                    className={`btn btn-warning ${display}`}
                  >
                    Change Date
                  </button>
                </div>
                {formik.errors.checkDate ? (
                  <span className="text-danger">{formik.errors.checkDate}</span>
                ) : null}
              </div>

              <div className="row ">
                <div className="col d-flex justify-content-center">
                  <button className="btn btn-success " type="submit" style={{marginBottom:"50px"}}>
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div
            className={`col  d-flex justify-content-center flex-column  flight ${display}`}
          >
            <div className="container">
              <div className="row">
                <div className="fs-3">Available Flights/Airlines</div>
              </div>
            </div>
            <div className="container">
              {airline.map((item) => {
                return (

                  <Card
                    item={item}
                    from={formik.values.from}
                    to={formik.values.to}
                    offer={offer}
                    price={price}
                    date={formik.values.date}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
