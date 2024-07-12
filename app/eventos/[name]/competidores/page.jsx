"use client";
import { useState, useEffect } from "react";
import TripulacionCard from "@/components/Tripulaciones/TripulacionCard";

function Page() {
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    if (!evento) {
      setEvento(JSON.parse(localStorage.getItem("evento")));
    }
  }, [evento]);

  return (
    <section>
      <h1 className="text-2xl font-bold text-center mb-2">Competidores</h1>

      <div className="sm:grid sm:grid-cols-3 gap-4">
        {evento?.tripulaciones.map((tripulacion, index) => (
          <div key={tripulacion._id} className="py-1">
            <TripulacionCard tripulacion={tripulacion} posicion={index + 1} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Page;
