import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { config } from "../config";

function Ticket() {
  let params = useParams();
  let [ticket, setTicket] = useState({});
  let fetchData = async () => {
    try {
      let res = await axios.get(
        `${config.api}/api/ticket/ticket/${localStorage.getItem("userid")}/${
          params.ticketid
        }`,
        {
          headers: {
            Authorization: `${localStorage.getItem("react_app_token")}`,
          },
        }
      );
      setTicket(res.data.ticket);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  let emailNow = async () => {
    let mailid = prompt("Emter Your Email");
    try {
      let res = await axios.post(`${config.api}/api/mail/message`, {
        mailid,
        ...ticket,
      });
      alert(res.data.message);
    } catch (error) {
      console.log(error)
    }
    console.log(mailid);
  };
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h3>Your Ticket</h3>
        <div className="container d-flex justify-content-end mb-5">
          <Link
            className="btn btn-secondary "
            to={`/allticket/${localStorage.getItem("userid")}`}
          >
            View All your bookings
          </Link>
        </div>

        <div className="card">
          <h5 className="card-header  ">
            Booking Tickets on {`${ticket.airline}`}
          </h5>
          <div className="card-body">
            <h5 className="card-title">{`From ${ticket.from} to ${ticket.to}`}</h5>
            <h5>Date:{`${ticket.date}`} </h5>
            {ticket.food ? <h5>Food Included</h5> : <h5>Food Not Included</h5>}
            <h5>Total Ticket Price : ${ticket.price}</h5>
            <a href="#" className="btn btn-primary" onClick={() => emailNow()}>
              Email Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ticket;
