// components/Pdf/Pdf.jsx
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
    return `${segundos.toString()}.${milisegundos.toString().padStart(2, "0")}`;
  }
}

const Pdf = ({ dataForPdf }) => {
  const generatePdf = () => {
    const { especial, tiempos } = dataForPdf;

    const doc = new jsPDF();
    const evento = JSON.parse(localStorage.getItem("evento"));

    // Nombre del Rally
    doc.setFontSize(18);
    doc.text(`${evento.nombre}`, 14, 20);

    // Configurar columnas de la tabla
    if (tiempos[0].__typename === "Tiempo") {
      // Agregar título
      doc.setFontSize(16);
      doc.text(`Especial: ${especial.nombre}`, 14, 27);

      const columns = [
        "Nº",
        "COCHE",
        "PILOTO",
        "CAT",
        "H SALIDA",
        "H LLEGADA",
        "PENA",
        "TIEMPO",
      ];

      // Configurar datos de la tabla
      const tableData = tiempos.map((tiempo, index) => [
        index + 1,
        tiempo.tripulacion.autoNum,
        `${tiempo.tripulacion.piloto.apellidos} ${tiempo.tripulacion.piloto.nombre}`,
        tiempo.tripulacion.categoria,
        mlsToFormato(tiempo.horaSalida),
        mlsToFormato(tiempo.horaLlegada),
        mlsToFormato(tiempo.penalizacion),
        mlsToFormato(tiempo.horaLlegada - tiempo.horaSalida),
      ]);

      // Generar tabla en el PDF
      doc.autoTable({
        head: [columns],
        body: tableData,
        startY: 30, // Ajusta la posición inicial de la tabla
      });

      // Guardar el PDF
      doc.save(`tiempos-${evento.nombre}-${especial.nombre}.pdf`);
    } else {
      // Agregar título
      doc.setFontSize(16);
      doc.text(`TABLA GENERAL`, 14, 27);

      doc.setFontSize(14); // Tamaño del título principal
      doc.text(`Tabla de tiempos acumulado`, 14, 33);

      doc.setFontSize(12); // Tamaño del título principal
      doc.text(`EC = Especiales Completados`, 15, 38);

      const columns = ["Nº", "COCHE", "PILOTO", "CAT", "EC", "PENA", "TIEMPO"];

      const tableData = tiempos.map((tiempo, index) => [
        index + 1,
        tiempo.tripulacion.autoNum,
        `${tiempo.tripulacion.piloto.apellidos} ${tiempo.tripulacion.piloto.nombre}`,
        tiempo.tripulacion.categoria,
        tiempo.numEspeciales,
        mlsToFormato(tiempo.penalizacionAcumulada),
        mlsToFormato(tiempo.tiempoAcumulado),
      ]);

      // Generar tabla en el PDF
      doc.autoTable({
        head: [columns],
        body: tableData,
        startY: 41, // Ajusta la posición inicial de la tabla
      });

      // Guardar el PDF
      doc.save(`tiempos-${evento.nombre}-GENERAL.pdf`);
    }
  };

  useEffect(() => {
    if (dataForPdf) {
      generatePdf();
    }
  }, [dataForPdf]);

  return null;
};

export default Pdf;
