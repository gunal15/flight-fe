import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { config } from "../config";
import StripeCheckout from "react-stripe-checkout";

function BookTicket() {
  const navigate = useNavigate();
  const [price, setPrice] = useState(localStorage.getItem("price"));

  const addFood = (offer) => {
    let ele = document.getElementById("food");

    if (ele.checked == true) {
      setPrice(20 - (20 * offer) / 100 + +price);
    } else {
      setPrice(price - (20 - (20 * offer) / 100));
    }
  };

  const handleToken = async (token, addresses) => {
    const req = {
      from: `${localStorage.getItem("from")}`,
      to: `${localStorage.getItem("to")}`,
      price: price,
      date: `${localStorage.getItem("date")}`,
      airline: `${localStorage.getItem("item")}`,
      food: document.getElementById("food").checked,
    };
    try {
      const res = await axios.post(
        `${config.api}/api/ticket/book-ticket/${localStorage.getItem(
          "userid"
        )}`,
        req,
        {
          headers: {
            Authorization: `${localStorage.getItem("react_app_token")}`,
          },
        }
      );
      const ticketId = res.data.savedTicket._id;
      const chargeReq = {
        token,
        amount: price * 100,
        ticketId,
      };
      const chargeRes = await axios.post(
        `${config.api}/api/payment/charge`,
        chargeReq
      );
      alert("Payment Successful!");
      console.log(chargeRes.data);
      navigate(`/ticket/${localStorage.getItem("userid")}/${ticketId}`);
    } catch (error) {
      alert("Duplicate Ticket/Something Went wrong");
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div class="card">
          <h5 class="card-header">
            Booking Tickets on {`${localStorage.getItem("item")}`}
          </h5>
          <div class="card-body">
            <h5 class="card-title">{`From ${localStorage.getItem(
              "from"
            )} to ${localStorage.getItem("to")}`}</h5>
            <h5>Date:{`${localStorage.getItem("date")}`} </h5>
            <input
              type="checkbox"
              name="food"
              id="food"
              onChange={() => addFood(localStorage.getItem("offer"))}
            />
            <label for="food">Check Here to add Food ($20/per person)</label>
            {localStorage.getItem("offer") != 0 ? (
              <>
                <p class="card-text">
                  <span className="offer">Offer</span>{" "}
                  {`You have ${localStorage.getItem("offer")}% offer on Foods`}
                </p>
              </>
            ) : (
              <p>Order Foods</p>
            )}

            <h5>Total Ticket Price : ${price}</h5>
            <StripeCheckout
              stripeKey={'pk_test_51MrgPdSAtP0Jtr0dobX82wXsfh6ie00D31u3dgBmBO94vPLdeXdOorP7PJ1NQblqWxYTrKnaFIma0QQcooM8PpQz00BU0H9ec9'}
              token={handleToken}
              amount={price * 100}
              name={`Booking Tickets on ${localStorage.getItem("item")}`}
              billingAddress
              shippingAddress
            >
              <button class="btn btn-primary">Book Now</button>
            </StripeCheckout>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookTicket;
