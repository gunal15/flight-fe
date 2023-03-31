import React from "react";

function TicketCard(ticket) {
  return (
    <>
      <div className="card mt-3">
        <h5 className="card-header  ">
          Ticket on {`${ticket.ticket.airline}`}
        </h5>
        <div className="card-body">
          <h5 className="card-title">{`From ${ticket.ticket.from} to ${ticket.ticket.to}`}</h5>
          <h5>Date:{`${ticket.ticket.date}`} </h5>
          {ticket.ticket.food ? (
            <h5>Food Included</h5>
          ) : (
            <h5>Food Not Included</h5>
          )}
          <h5>Total Ticket Price : ${ticket.ticket.price}</h5>
        </div>
      </div>
    </>
  );
}

export default TicketCard;
