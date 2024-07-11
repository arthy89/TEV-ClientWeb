import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Button,
  Link,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

function EventoCard({ evento }) {
  // console.log(evento);
  const router = useRouter();

  const formatDate = (dateString) => {
    const fecha = new Date(Number(dateString));
    const formattedDate = fecha.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  };

  const formatTime = (timeString) => {
    const hora = new Date(Number(timeString));
    const formattedTime = hora.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return formattedTime.split(",")[0]; //return solo la HORA
  };

  const handleClick = () => {
    localStorage.setItem("evento", JSON.stringify(evento));
    const encodedName = evento.nombre.replace(/ /g, "-");
    router.push(`/eventos/${encodedName}`);
  };

  return (
    <Card className="py-4" isPressable onClick={handleClick}>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">
          {formatDate(evento.fecha)}
        </p>
        <small className="text-default-500">{formatTime(evento.hora)}</small>
        <h4 className="font-bold text-large text-start">{evento.nombre}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/imgs/tinajani.jpg"
          width={270}
        />
      </CardBody>
    </Card>
  );
}

export default EventoCard;
