export function mlsToFormato(tiempoEnMs) {
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