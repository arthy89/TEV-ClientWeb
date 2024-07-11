"use client";
import { Button, ButtonGroup, Select, SelectItem } from "@nextui-org/react";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_TRIPULACION } from "@/graphql/evento/tripulacion";
import { GET_EVENTO_TIEMPOS } from "@/graphql/evento/evento";
import TiempoTabla from "@/components/Tiempos/TiempoTabla";
import TablaAcumulada from "@/components/Tiempos/TablaAcumulada";

function Page() {
  const [evento, setEvento] = useState(null);

  const [selectedEspecialId, setSelectedEspecialId] = useState(null);
  const [selectedEspecial, setSelectedEspecial] = useState(null);
  const [especiales, setEspeciales] = useState([]);
  const [socket, setSocket] = useState(null);
  const [showTotal, setShowTotal] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState("");

  const [getTripulacion, { data: tripulacionData }] =
    useLazyQuery(GET_TRIPULACION);

  const { data, loading, error, refetch } = useQuery(GET_EVENTO_TIEMPOS, {
    variables: {
      id: evento?._id,
    },
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      // configurar especiales
      const allEspeciales = data.evento.etapas.flatMap(
        (etapa) => etapa.especiales
      );
      setEspeciales(allEspeciales);
      if (allEspeciales.length > 0) {
        setSelectedEspecialId(allEspeciales[0]._id);
      }
    },
  });

  useEffect(() => {
    if (!evento) {
      setEvento(JSON.parse(localStorage.getItem("evento")));
      refetch(); // Refrescar la consulta cuando se carga la pantalla
    }
  }, [evento]);

  //TODO | CONEXION AL SOCKET
  useEffect(() => {
    const newSocket = io("https://tev-server.vercel.app/");
    // const newSocket = io("http://192.168.1.48:4000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
    });

    newSocket.on("nuevoTiempo", (newTiempo) => {
      console.log("Received new tiempo", newTiempo);
      // FETCH DATA tripulacion
      getTripulacion({ variables: { id: newTiempo.tripulacion } });
      setEspeciales((prevEspeciales) => {
        const updatedEspeciales = prevEspeciales.map((especial) => {
          if (especial._id === newTiempo.especialId) {
            const updatedTiempos = especial.tiempos
              ? [...especial.tiempos, newTiempo]
              : [newTiempo];
            return {
              ...especial,
              tiempos: updatedTiempos,
            };
          }
          return especial;
        });

        // if (selectedEspecial && selectedEspecial._id === newTiempo.especialId) {
        //   setSelectedEspecial((prevSelectedEspecial) => ({
        //     ...prevSelectedEspecial,
        //     tiempos: [...(prevSelectedEspecial.tiempos || []), newTiempo],
        //   }));
        // }

        return updatedEspeciales;
      });
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => newSocket.close();
  }, [getTripulacion]);

  //   TODO |
  useEffect(() => {
    if (tripulacionData) {
      setEspeciales((prevEspeciales) => {
        const updatedEspeciales = prevEspeciales.map((especial) => {
          return {
            ...especial,
            tiempos: especial.tiempos.map((tiempo) => {
              if (tiempo.tripulacion === tripulacionData.tripulacion._id) {
                return {
                  ...tiempo,
                  tripulacion: tripulacionData.tripulacion,
                };
              }
              return tiempo;
            }),
          };
        });

        // if (selectedEspecial) {
        //   setSelectedEspecial((prevSelectedEspecial) => ({
        //     ...prevSelectedEspecial,
        //     tiempos: prevSelectedEspecial.tiempos.map((tiempo) => {
        //       if (tiempo.tripulacion === tripulacionData.tripulacion._id) {
        //         return {
        //           ...tiempo,
        //           tripulacion: tripulacionData.tripulacion,
        //         };
        //       }
        //       return tiempo;
        //     }),
        //   }));
        // }

        return updatedEspeciales;
      });
    }
  }, [tripulacionData]);

  useEffect(() => {
    const especial = especiales.find(
      (especial) => especial._id === selectedEspecialId
    );
    setSelectedEspecial(especial);
  }, [selectedEspecialId, especiales]);

  const handleEspecialPress = (especialId) => {
    setSelectedEspecialId(especialId);
    setShowTotal(false);
  };

  const handleTotalPress = () => {
    setShowTotal(true);
  };

  const handleCategoriaChange = (event) => {
    setSelectedCategoria(event.target.value);
  };

  const categorias = data?.evento?.categorias || [];

  //   console.log(data);

  if (loading) return <p className="text-center">Cargando...</p>;
  if (error) return <p className="text-center">Error: {error.message}</p>;

  return (
    <section>
      <div className="flex justify-center mb-5">
        <h1 className="font-bold text-2xl">{data.evento.nombre}</h1>
      </div>

      <div>
        <ul className="flex flex-row gap-2 overflow-y-auto">
          {data.evento.etapas.map((etapa) => (
            <div key={etapa._id}>
              <p className="text-sm font-light text-center">{etapa.nombre}</p>
              <ButtonGroup>
                {etapa.especiales.map((especial) => (
                  <Button
                    onPress={() => handleEspecialPress(especial._id)}
                    size="sm"
                    key={especial._id}
                  >
                    {especial.nombre}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          ))}

          <div className="flex items-end">
            <Button
              onPress={handleTotalPress}
              color="danger"
              size="sm"
              variant="ghost"
            >
              <p className="font-extrabold">TOTAL</p>
            </Button>
          </div>
        </ul>
      </div>

      {/* Select Categorias */}
      <div className="py-2">
        <Select
          label="Categoría"
          size="sm"
          selectedKeys={[selectedCategoria]}
          onChange={handleCategoriaChange}
        >
          <SelectItem key={""}>Todas las Categorías</SelectItem>
          {categorias.map((categoria) => (
            <SelectItem key={categoria.nombre}>{categoria.nombre}</SelectItem>
          ))}
        </Select>
      </div>

      {showTotal ? (
        <div>
          <TablaAcumulada
            especiales={especiales}
            categoria={selectedCategoria}
          />
        </div>
      ) : (
        selectedEspecial && (
          <div>
            <TiempoTabla
              especial={selectedEspecial}
              categoria={selectedCategoria}
            />
          </div>
        )
      )}
    </section>
  );
}

export default Page;
