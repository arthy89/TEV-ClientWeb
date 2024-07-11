"use client";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { title, subtitle } from "@/components/primitives";
import { GET_EVENTOS_C } from "@/graphql/evento/evento";
import EventoList from "@/components/Eventos/EventoList";

function page() {
  const { loading, error, data } = useQuery(GET_EVENTOS_C);

  if (loading) return <p className="text-center">Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  // console.log(data.eventos);

  return (
    <section>
      <div className="flex justify-center mb-5">
        <h1 className={title({ color: "blue" })}>Tiempos en Vivo</h1>
      </div>

      <h1 className="text-xl font-bold py-2">Lista de Rally</h1>

      <EventoList eventos={data.eventos} />
    </section>
  );
}

export default page;
