import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import React from "react";

function TiempoLineCard({
  tiempo,
  posicion,
  especiales,
  diferenciaPrimero,
  diferenciaAnterior,
  admin,
}) {
  // !! esta redundando tiempo salida porque se esta pasando en horallegada el tiempoTotal
  const tiempoPena = tiempo.penalizacion;

  function mlsToFormato(tiempoEnMs) {
    const horas = Math.floor(tiempoEnMs / (60 * 60 * 1000));
    tiempoEnMs %= 60 * 60 * 1000;
    const minutos = Math.floor(tiempoEnMs / (60 * 1000));
    tiempoEnMs %= 60 * 1000;
    const segundos = Math.floor(tiempoEnMs / 1000);
    const milisegundos = tiempoEnMs % 1000;
    if (horas > 0) {
      return `${horas.toString().padStart(2, "0")}:${minutos
        .toString()
        .padStart(2, "0")}:${segundos
        .toString()
        .padStart(2, "0")}.${milisegundos.toString().padStart(2, "0")}`;
    } else if (minutos > 0) {
      return `${minutos.toString().padStart(2, "0")}:${segundos
        .toString()
        .padStart(2, "0")}.${milisegundos.toString().padStart(2, "0")}`;
    } else {
      return `${segundos.toString()}.${milisegundos
        .toString()
        .padStart(2, "0")}`;
    }
  }

  const tiempoResultado = tiempo.horaLlegada - tiempo.horaSalida;
  const tiempoFormateado = mlsToFormato(tiempoResultado);

  const dif1For = mlsToFormato(diferenciaPrimero);
  const dif2For = mlsToFormato(diferenciaAnterior);

  //   //   ELIMINAR TIEMPO
  //   const [delTiempo] = useMutation(DEL_TIEMPO, {
  //     refetchQueries: ["getEspPro"],
  //   });

  if (
    !tiempo.tripulacion ||
    !tiempo.tripulacion.piloto ||
    !tiempo.tripulacion.navegante
  ) {
    return (
      <p className="text-center">Cargando detalles de la tripulación...</p>
    );
  }

  return (
    <Card>
      {/* Pos Cat Num */}
      <CardHeader className="flex gap-3">
        <div className="flex flex-row justify-between -my-2 w-full">
          <p className="text-xl font-black">{posicion}</p>
          <p className="text-md font-bold">
            {tiempo.tripulacion.categoria} - {tiempo.tripulacion.autoNum}
          </p>
        </div>
      </CardHeader>

      <Divider />

      {/* Tiempo */}
      <CardBody>
        <div className="flex flex-row justify-between -my-2">
          <div>
            <p className="text-xl">{tiempoFormateado}</p>
            {tiempoPena !== null && tiempoPena !== 0 && (
              <p className="text-red-500 font-bold text-xs -my-2">
                {mlsToFormato(tiempoPena)}
              </p>
            )}
          </div>

          <div>
            {diferenciaPrimero !== 0 && (
              <div>
                <p className="text-right text-xs"> + {dif1For}</p>
                <p className="text-right text-xs"> + {dif2For}</p>
              </div>
            )}
          </div>
        </div>
      </CardBody>
      <Divider />

      {/* Datos de la tripulacion */}
      <CardFooter>
        <div className="flex flex-row justify-between -my-2 w-full">
          <div>
            <p className="text-xs font-medium">
              {tiempo.tripulacion.piloto.nombre}{" "}
              {tiempo.tripulacion.piloto.apellidos}
            </p>
            <p className="text-xs font-medium">
              {tiempo.tripulacion.navegante.nombre}{" "}
              {tiempo.tripulacion.navegante.apellidos}
            </p>
            {especiales != null && (
              <p className="text-zinc-700 italic text-xs">EC: {especiales}</p>
            )}
          </div>

          <div>
            <p className="text-xs font-medium">
              {tiempo.tripulacion.autoMarca}
            </p>
            <p className="text-xs font-medium">
              {tiempo.tripulacion.autoModelo}
            </p>
          </div>
        </div>

        {/* Boton Eliminar */}
        {/* {admin != null && (
          <View>
            <TouchableOpacity
              className="flex self-center bg-red-600 rounded-md p-1 w-20"
              onPress={() => {
                delTiempo({
                  variables: {
                    id: tiempo._id,
                  },
                });
              }}
            >
              <Text className="text-white text-center font-bold">Eliminar</Text>
            </TouchableOpacity>
          </View>
        )} */}
      </CardFooter>
    </Card>
  );
}

export default TiempoLineCard;
