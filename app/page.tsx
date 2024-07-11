import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { Image } from "@nextui-org/image";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Bienvenido a la aplicación de&nbsp;</h1>
        <h1 className={title({ color: "blue" })}>Tiempos en Vivo&nbsp;</h1>
      </div>

      <div className="flex gap-3">
        <Link
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={"/eventos"}
        >
          Ver Competencias
        </Link>
      </div>

      <div className="items-center justify-center">
        <h1 className={title({ color: "violet" })}>Tutorial</h1>
        <p className="text-lg font-bold">
          Indicaciones para seleccionar y ver los tiempos
        </p>

        <Image width={800} alt="Tuto 1" src="/imgs/Tutorial_page-0001.jpg" />

        <p className="text-lg font-bold">Partes de las tarjetas de tiempos</p>
        <p className="text-sm font-light">
          Indicaciones para poder leer los diferentes partes de las tarjetas de
          tiempos registrados por los competidores.
        </p>
        <Image width={800} alt="Tuto 2" src="/imgs/Tutorial_page-0002.jpg" />
      </div>
    </section>
  );
}
