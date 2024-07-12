import { useEffect, useMemo } from "react";
import TiempoLineCard from "./TiempoLineCard";

function TiempoTabla({ especial, categoria, admin, setTimes }) {
  // Filtrar tiempos por categoría
  const tiemposFiltrados = useMemo(() => {
    return especial.tiempos.filter(
      (tiempo) => !categoria || tiempo.tripulacion.categoria === categoria
    );
  }, [especial, categoria]);

  // Calculo del tiempo resultado
  const tiemposConResultado = useMemo(() => {
    return tiemposFiltrados.map((tiempo) => ({
      ...tiempo,
      tiempoResultado:
        Number(tiempo.horaLlegada) -
        Number(tiempo.horaSalida) +
        Number(tiempo.penalizacion),
    }));
  }, [tiemposFiltrados]);

  // Ordenar tiempos
  const tiemposOrdenados = useMemo(() => {
    return tiemposConResultado.sort(
      (a, b) => a.tiempoResultado - b.tiempoResultado
    );
  }, [tiemposConResultado]);

  useEffect(() => {
    setTimes(tiemposOrdenados);
  }, [tiemposOrdenados, setTimes]);

  return (
    <div>
      <p className="font-bold text-xl">{especial.nombre}</p>
      <div className="sm:grid sm:grid-cols-3 gap-4">
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
    </div>
  );
}

export default TiempoTabla;
