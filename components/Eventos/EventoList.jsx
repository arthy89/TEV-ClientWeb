import React from "react";
import EventoCard from "./EventoCard";

function EventoList({ eventos }) {
  return (
    <div className="grid min-[320px]:max-md:grid-cols-2 md:grid-flow-col md:auto-cols-max gap-4">
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
