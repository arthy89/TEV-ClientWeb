import React from "react";
import TiempoLineCard from "./TiempoLineCard";

function TiempoTabla({ especial, categoria, admin }) {
  // Filtrar tiempos por categoría
  const tiemposFiltrados = especial.tiempos.filter(
    (tiempo) => !categoria || tiempo.tripulacion.categoria === categoria
  );

  // Calculo del tiempo resultado
  const tiemposConResultado = tiemposFiltrados.map((tiempo) => ({
    ...tiempo,
    tiempoResultado:
      Number(tiempo.horaLlegada) -
      Number(tiempo.horaSalida) +
      Number(tiempo.penalizacion),
  }));

  // Ordenar tiempos
  const tiemposOrdenados = tiemposConResultado.sort(
    (a, b) => a.tiempoResultado - b.tiempoResultado
  );

  //   console.log(categoria);

  return (
    <div>
      <p className="font-bold text-xl">{especial.nombre}</p>

      {tiemposOrdenados.map((item, index) => {
        const tiempoPrimero = tiemposOrdenados[0].tiempoResultado;
        const tiempoAnterior =
          index > 0 ? tiemposOrdenados[index - 1].tiempoResultado : null;

        return (
          <div className="py-1" key={item._id}>
            <TiempoLineCard
              tiempo={{
                ...item,
                horaLlegada: item.tiempoResultado,
                horaSalida: 0, // Asumiendo que queremos mostrar el tiempo acumulado total}
              }}
              posicion={index + 1}
              diferenciaPrimero={item.tiempoResultado - tiempoPrimero}
              diferenciaAnterior={
                tiempoAnterior !== null
                  ? item.tiempoResultado - tiempoAnterior
                  : null
              }
              admin={admin}
            />
          </div>
        );
      })}
    </div>
  );
}

export default TiempoTabla;
