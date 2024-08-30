import { useEffect, useMemo } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { mlsToFormato } from "@/components/services/mlsformatter";
import { FaCarSide } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa6";

function TableAcum({ especiales, admin, categoria, setTimes }) {
const tripulacionTiempos = useMemo(() => {
    const tiempos = {};

    especiales.forEach((especial) => {
        especial.tiempos.forEach((tiempo) => {
        if (!categoria || tiempo.tripulacion.categoria === categoria) {
            const tripulacionId = tiempo.tripulacion._id;
            const horaLlegada = Number(tiempo.horaLlegada);
            const horaSalida = Number(tiempo.horaSalida);
            const penalizacion = Number(tiempo.penalizacion) || 0;
            const tiempoAcumulado = horaLlegada - horaSalida + penalizacion;

            if (!tiempos[tripulacionId]) {
            tiempos[tripulacionId] = {
                tripulacion: tiempo.tripulacion,
                tiempoAcumulado: 0,
                numEspeciales: 0,
                penalizacionAcumulada: 0,
            };
            }

            tiempos[tripulacionId].tiempoAcumulado += tiempoAcumulado;
            tiempos[tripulacionId].numEspeciales += 1;
            tiempos[tripulacionId].penalizacionAcumulada += penalizacion;
        }
        });
    });

    return tiempos;
    }, [especiales, categoria]);

        // Convertir el objeto a una lista y ordenar por tiempo acumulado
  const tiemposOrdenados = useMemo(() => {
    return Object.values(tripulacionTiempos).sort(
      (a, b) =>
        b.numEspeciales - a.numEspeciales ||
        a.tiempoAcumulado - b.tiempoAcumulado
    );
  }, [tripulacionTiempos]);

  // Memorizar tiemposFiltrados usando useEffect
  useEffect(() => {
    const tiemposFiltrados = tiemposOrdenados.map((item) => ({
      ...item.tripulacion,
      tiempoAcumulado: item.tiempoAcumulado,
      penalizacionAcumulada: item.penalizacionAcumulada,
      numEspeciales: item.numEspeciales,
    }));

    setTimes(tiemposOrdenados);
  }, [tiemposOrdenados, setTimes]);

  console.log("TIEMPPPPPPOS", tiemposOrdenados);

  return (
    <Table aria-label="Tabla de tiempos">
      <TableHeader>
        <TableColumn className='sticky-column'>Nº</TableColumn>
        <TableColumn className='sticky-column'>CAR N </TableColumn>
        <TableColumn>
          <p>PILOTO</p>
          <p>NAVEGANTE</p>
        </TableColumn>
        <TableColumn>
          <p>VEHÍCHULO</p>
          <p>CATEGORÍA</p>
        </TableColumn>
        <TableColumn>PENA</TableColumn>
        <TableColumn>TIEMPO</TableColumn>
        <TableColumn>DIFERENCIAS</TableColumn>
        <TableColumn className='text-center'>
            <p>ESPECIALES</p>
            <p>COMPETADOS</p>
        </TableColumn>
      </TableHeader>
      <TableBody>
        
        {tiemposOrdenados.map((item, index) => {
            const tiempoPrimero = tiemposOrdenados[0].tiempoAcumulado;
            const tiempoAnterior =
              index > 0 ? tiemposOrdenados[index - 1].tiempoAcumulado : null;

            return (
              <TableRow key={item.tripulacion._id}>
                <TableCell className='sticky-column bg-[#FFFFFF] dark:bg-[#18181B] font-bold text-md'>{index + 1}</TableCell>
                <TableCell className='sticky-column bg-[#FFFFFF] dark:bg-[#18181B]'>
                  <p className='text-primary'>
                    <FaCarSide />{item.tripulacion.autoNum}
                  </p>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2 mb-1'>
                    <FaUserAstronaut />
                    <p>{item.tripulacion.piloto.apellidos} {item.tripulacion.piloto.nombre}</p>
                  </div>
                  <div className='flex items-center gap-2 -mb-1'>
                    <FaUserAstronaut />
                    <p>{item.tripulacion.navegante.apellidos} {item.tripulacion.navegante.nombre}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <p>{item.tripulacion.auto}</p>
                  <p>{item.tripulacion.categoria}</p>
                </TableCell>
                <TableCell className='text-danger'>{item.penalizacionAcumulada !== 0 ? mlsToFormato(item.penalizacionAcumulada) : ''}</TableCell>
                <TableCell>{mlsToFormato(item.tiempoAcumulado)}</TableCell>
                <TableCell>
                  {item.tiempoAcumulado - tiempoPrimero == 0
                    ? ''
                    : (<p>+ { mlsToFormato(item.tiempoAcumulado - tiempoPrimero) }</p>)
                  }
                  { tiempoAnterior ? (
                    <p>
                      + { mlsToFormato(item.tiempoAcumulado - tiempoAnterior) }
                    </p>
                  ) : '' }
                </TableCell>
                <TableCell className='text-center text-md'>{item.numEspeciales}</TableCell>
              </TableRow>
            )
          }
        )}
      </TableBody>
    </Table>
  )
}

export default TableAcum