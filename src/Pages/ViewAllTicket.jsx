import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import TicketCard from "../Components/TicketCard";
import { config } from "../config";

function ViewAllTicket() {
  let params = useParams();
  let [tickets, setTickets] = useState([]);
  let fetchData = async () => {
    let res = await axios.get(
      `${config.api}/api/ticket/allticket/${params.userid}`,
      {
        headers: {
          Authorization: `${localStorage.getItem("react_app_token")}`,
        },
      }
    );
    // console.log(res.data.tickets)
    setTickets(res.data.tickets);
    console.log(tickets);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        {
          tickets.length!=0 ? tickets.map((ticket) => {
            return <TicketCard ticket={ticket} />;
          }) : <div>No Bookings</div>
        }
        
      </div>
    </>
  );
}

export default ViewAllTicket;
