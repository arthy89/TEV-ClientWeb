import React from "react";
import EventoCard from "./EventoCard";

function EventoList({ eventos }) {
  return (
    <div className="grid grid-cols-2 gap-4 ">
      {eventos
        .slice()
        .reverse()
        .map((evento) => (
          <EventoCard evento={evento} key={evento._id} />
        ))}
    </div>
  );
}

export default EventoList;
