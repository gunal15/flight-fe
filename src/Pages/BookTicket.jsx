import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { config } from "../config";
import Razorpay from "razorpay";

function BookTicket() {
let navigate = useNavigate();
let [price, setPrice] = useState(localStorage.getItem("price"));
let [orderId, setOrderId] = useState(null);

const razorpayOptions = {
key: `${config.razorpay_key_id}`,
amount: price * 100,
name: "Flight Ticket",
description: `Flight Ticket from ${localStorage.getItem( "from" )} to ${localStorage.getItem("to")}`,
image: "https://i.imgur.com/n5tjHFD.png",
handler: (response) => {
const paymentId = response.razorpay_payment_id;
const url = `${config.api}/api/ticket/book-ticket/${localStorage.getItem( "userid" )}`;
const req = {
from: `${localStorage.getItem("from")}`,
to: `${localStorage.getItem("to")}`,
price: price,
date: `${localStorage.getItem("date")}`,
airline: `${localStorage.getItem("item")}`,
food: document.getElementById("food").checked,
paymentId,
orderId,
};
axios
.post(url, req, {
headers: {
Authorization: `${localStorage.getItem("react_app_token")}`,
},
})
.then((res) => {
alert(res.data.message);
navigate(
`/ticket/${localStorage.getItem("userid")}/${res.data.savedTicket._id}`
);
})
.catch((err) => {
console.log(err);
alert("Duplicate Ticket/Something Went wrong");
});
},
prefill: {
name: `${localStorage.getItem("user")}`,
email: `${localStorage.getItem("email")}`,
},
notes: {
address: "Razorpay Corporate Office",
},
theme: {
color: "#F37254",
},
};

const displayRazorpay = async () => {
const req = {
price: price * 100,
userid: localStorage.getItem("userid"),
};
try {
const res = await axios.post(
`${config.api}/api/ticket/create-order`,
req,
{
headers: {
Authorization: `${localStorage.getItem("react_app_token")}`,
},
}
);
setOrderId(res.data.orderId);
const rzp = new Razorpay(razorpayOptions);
rzp.open();
} catch (error) {
console.log(error);
}
};

let addFood = (offer) => {
let ele = document.getElementById("food"); 
  if (ele.checked == true) {
  setPrice(20 - (20 * offer) / 100 + +price);
} else {
  setPrice(price - (20 - (20 * offer) / 100));
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
<h5 class="card-title">{`From ${localStorage.getItem( "from" )} to ${localStorage.getItem("to")}`}</h5>
<h5>Date:{`${localStorage.getItem("date")}`} </h5>
<input
type="checkbox"
name="food"
id="food "
onChange={() => addFood(10)}
/>
<label htmlFor="food"> Add Food (10% off)</label>
<br />
<br />

<h5>Price: {price}</h5>
<button className="btn btn-primary" onClick={displayRazorpay}>
Pay Now
</button>
</div>
</div>
</div>
</>
);
}
export default BookTicket;

