import React from "react";
import { Link } from "react-router-dom";

function Card({ item, from, to, offer, price, date }) {
  let saveLocal = () => {
    localStorage.setItem("from", from);
    localStorage.setItem("to", to);
    localStorage.setItem("date", date);
    localStorage.setItem("price", price);
    localStorage.setItem("offer", offer);
    localStorage.setItem("item", item);
  };
  return (
    <>
      <div className="row mt-5">
        <div class="card text-center">
          <div class="card-header airlines">{item}</div>
          <div class="card-body">
            <h5 class="card-title">{`${from} --✈-> ${to}`}</h5>
            <p class="card-text">
              By applying {offer}% offer Price: ${price}
            </p>
            <Link
              to={`/book-ticket/${localStorage.getItem("userid")}/${item}`}
              class="btn btn-primary"
              onClick={() => saveLocal()}
            >
              Book Ticket
            </Link>
          </div>
          <div class="card-footer text-muted">{`${date}`}</div>
        </div>
      </div>
    </>
  );
}

export default Card;
