import { gql } from "@apollo/client";

export const GET_TRIPS_EVENTO = gql`
  query getTripsEvent($id: ID!) {
    tripulacionesEvent(_id: $id) {
      _id
      piloto {
        _id
        nombre
        apellidos
        fechaDeNac
        tipoDeSangre
      }
      navegante {
        _id
        nombre
        apellidos
        fechaDeNac
        tipoDeSangre
      }
      evento {
        _id
        nombre
      }
      categoria
      autoNum
      auto
      categoria
      equipoNombre
    }
  }
`;

export const GET_TRIPULACION = gql`
  query ($id: ID!) {
    tripulacion(_id: $id) {
      _id
      piloto {
        _id
        nombre
        apellidos
      }
      navegante {
        _id
        nombre
        apellidos
      }
      auto
      autoNum
      categoria
    }
  }
`;

export const NEW_TRIPULACION = gql`
  mutation (
    $piloto: ID!
    $navegante: ID!
    $eventoId: ID!
    $categoria: String!
    $auto: String!
    $autoNum: String!
    $equipoNombre: String
  ) {
    crearTripulacion(
      piloto: $piloto
      navegante: $navegante
      eventoId: $eventoId
      categoria: $categoria
      auto: $auto
      autoNum: $autoNum
      equipoNombre: $equipoNombre
    ) {
      _id
      piloto {
        _id
      }
      navegante {
        _id
      }
      evento {
        _id
      }
      categoria
      auto
      autoNum
      equipoNombre
    }
  }
`;

export const DEL_TRIPULACION = gql`
  mutation ($id: ID!) {
    delTripulacion(_id: $id) {
      _id
    }
  }
`;
