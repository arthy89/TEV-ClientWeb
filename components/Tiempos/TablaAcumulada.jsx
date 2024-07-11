import React from "react";
import TiempoLineCard from "./TiempoLineCard";

function TablaAcumulada({ especiales, admin, categoria }) {
  // Calcular el tiempo acumulado por cada tripulación
  const tripulacionTiempos = {};

  especiales.forEach((especial) => {
    especial.tiempos.forEach((tiempo) => {
      if (!categoria || tiempo.tripulacion.categoria === categoria) {
        const tripulacionId = tiempo.tripulacion._id;
        const horaLlegada = Number(tiempo.horaLlegada);
        const horaSalida = Number(tiempo.horaSalida);
        const penalizacion = Number(tiempo.penalizacion) || 0;
        const tiempoResultado = horaLlegada - horaSalida + penalizacion;

        if (!tripulacionTiempos[tripulacionId]) {
          tripulacionTiempos[tripulacionId] = {
            tripulacion: tiempo.tripulacion,
            tiempoAcumulado: 0,
            numEspeciales: 0,
            penalizacionAcumulada: 0,
          };
        }

        tripulacionTiempos[tripulacionId].tiempoAcumulado += tiempoResultado;
        tripulacionTiempos[tripulacionId].numEspeciales += 1;
        tripulacionTiempos[tripulacionId].penalizacionAcumulada += penalizacion;
      }
    });
  });

  // Convertir el objeto a una lista y ordenar por tiempo acumulado
  const tiemposOrdenados = Object.values(tripulacionTiempos).sort(
    (a, b) =>
      b.numEspeciales - a.numEspeciales || a.tiempoAcumulado - b.tiempoAcumulado
  );

  return (
    <div>
      <p className="font-bold text-xl">Tiempo Acumulado</p>

      <div className="">
        {tiemposOrdenados.map((item, index) => {
          const tiempoPrimero = tiemposOrdenados[0].tiempoAcumulado;
          const tiempoAnterior =
            index > 0 ? tiemposOrdenados[index - 1].tiempoAcumulado : null;

          return (
            <div className="py-1" key={item.tripulacion._id}>
              <TiempoLineCard
                tiempo={{
                  ...item,
                  horaLlegada: item.tiempoAcumulado,
                  horaSalida: 0, // Asumiendo que queremos mostrar el tiempo acumulado total
                  penalizacion: item.penalizacionAcumulada,
                }}
                posicion={index + 1}
                especiales={item.numEspeciales}
                diferenciaPrimero={item.tiempoAcumulado - tiempoPrimero}
                diferenciaAnterior={
                  tiempoAnterior !== null
                    ? item.tiempoAcumulado - tiempoAnterior
                    : null
                }
                admin={admin}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TablaAcumulada;
