"use client";
import { IoCarSport, IoTimeSharp } from "react-icons/io5";
import { Image, Button, Chip } from "@nextui-org/react";
import { title } from "@/components/primitives";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const [evento, setEvento] = useState(null);
  //   console.log(evento);

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

  useEffect(() => {
    if (!evento) {
      setEvento(JSON.parse(localStorage.getItem("evento")));
    }
  });

  return (
    <section>
      <div className="flex justify-center mb-5">
        <h1 className={title({ color: "blue" })}>{evento?.nombre}</h1>
      </div>

      <div className="sm:grid sm:grid-cols-2 gap-4">
        {/* derecho */}
        <div className="sm:order-last">
          <div className="flex justify-center pb-4">
            <Image
              isZoomed
              radius="sm"
              alt={evento?.nombre}
              className="object-cover rounded-xl"
              src="/imgs/tinajani.jpg"
            />
          </div>
        </div>

        {/* izquierdo */}
        <div className="contenedor">
          <div>
            <p className="font-bold text-xl">{evento?.tipo}</p>
            <p className="text-sm">
              {formatDate(evento?.fecha)} - {formatTime(evento?.hora)}
            </p>
          </div>

          <div>
            <p className="whitespace-pre-line">{evento?.descripcion}</p>
          </div>

          <div>
            <p className="font-bold text-lg">Categorías</p>
            <div className="flex gap-2 pb-2 overflow-y-auto">
              {evento?.categorias.map((cat) => (
                <Chip key={cat._id} color="primary">
                  {cat.nombre}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid grid-rows-1 gap-2 mt-2">
            <Button
              color="primary"
              variant="bordered"
              startContent={<IoCarSport />}
              className="font-bold"
              onPress={() => {
                router.push(`${pathname}/competidores`);
              }}
            >
              Competidores
            </Button>
            <Button
              color="danger"
              variant="ghost"
              startContent={<IoTimeSharp />}
              className="font-bold"
              onPress={() => {
                router.push(`${pathname}/tiempos`);
              }}
            >
              Ver Tiempos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
