import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { IoCarSport } from "react-icons/io5";
import { FaUserAstronaut } from "react-icons/fa6";

function TripulacionCard({ tripulacion, posicion }) {
  return (
    <Card>
      {/* Pos Cat Num */}
      <CardHeader className="flex gap-3">
        <div className="flex flex-row justify-between -my-2 w-full">
          <p className="text-md font-black">{posicion}</p>
          <p className="text-md font-bold">{tripulacion.categoria}</p>
        </div>
      </CardHeader>

      <Divider />

      {/* Tiempo */}
      <CardBody>
        <div className="-my-2">
          <div className="flex items-center gap-2 -mb-1">
            <FaUserAstronaut />
            <p className="text-lg font-light">
              {tripulacion.piloto.nombre} {tripulacion.piloto.apellidos}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <FaUserAstronaut />
            <p className="text-lg font-light">
              {tripulacion.navegante.nombre} {tripulacion.navegante.apellidos}
            </p>
          </div>
        </div>
      </CardBody>

      <Divider />

      <CardFooter>
        <div className="flex flex-row justify-between -my-2 w-full">
          <p className="font-light">
            <span className="font-bold">{tripulacion.autoNum}</span> -{" "}
            {tripulacion.autoMarca} {tripulacion.autoModelo}
          </p>

          <span className="flex items-center">
            <IoCarSport />
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default TripulacionCard;
