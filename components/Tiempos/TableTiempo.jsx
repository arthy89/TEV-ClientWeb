import { useEffect, useMemo } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { mlsToFormato } from "@/components/services/mlsformatter";
import { FaCarSide } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa6";

function TableTiempo({ especial, categoria, admin, setTimes }) {
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
  
    console.log(tiemposOrdenados);
    return (
    <Table aria-label="Tabla de tiempos">
      <TableHeader>
        <TableColumn className='sticky-column'>Nº</TableColumn>
        <TableColumn className='sticky-column'>CAR N</TableColumn>
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
      </TableHeader>
      <TableBody>
        
        {tiemposOrdenados.map((item, index) => {
            const tiempoPrimero = tiemposOrdenados[0].tiempoResultado;
            const tiempoAnterior =
              index > 0 ? tiemposOrdenados[index - 1].tiempoResultado : null;

            return (
              <TableRow key={item._id}>
                <TableCell className='sticky-column bg-[#FFFFFF] dark:bg-[#18181B] font-bold text-lg'>{index + 1}</TableCell>
                <TableCell className='sticky-column bg-[#FFFFFF] dark:bg-[#18181B] font-bold'>
                  <p className='text-primary'>
                    <FaCarSide />{item.tripulacion.autoNum}
                  </p>
                </TableCell>
                <TableCell>
                  <div className='text flex items-center gap-2 mb-1'>
                    <FaUserAstronaut />
                    <p>{item.tripulacion.piloto.apellidos} {item.tripulacion.piloto.nombre}</p>
                  </div>
                  <div className='text flex items-center gap-2 -mb-1'>
                    <FaUserAstronaut />
                    <p>{item.tripulacion.navegante.apellidos} {item.tripulacion.navegante.nombre}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2 mb-1'>
                    <FaCarSide />
                    <p>{item.tripulacion.auto}</p>
                    <p>{item.tripulacion.categoria}</p>
                  </div>
                </TableCell>
                <TableCell className='text-danger'>{item.penalizacion !== "0" ? mlsToFormato(item.penalizacion) : ''}</TableCell>
                <TableCell className='font-bold'>{mlsToFormato(item.tiempoResultado)}</TableCell>
                <TableCell>
                  {item.tiempoResultado - tiempoPrimero == 0
                    ? ''
                    : (<p className='text-primary font-bold'>+ { mlsToFormato(item.tiempoResultado - tiempoPrimero) }</p>)
                  }
                  { tiempoAnterior ? (
                    <p className='text-secondary font-bold'>
                      + { mlsToFormato(item.tiempoResultado - tiempoAnterior) }
                    </p>
                  ) : '' }
                </TableCell>
              </TableRow>
            )
          }
        )}
      </TableBody>
    </Table>
  )
}

export default TableTiempo