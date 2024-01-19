//Examen Ordinario 2023/2024
//Alejandro Rodriguez Orellana

//import para cargar el fichero de entorno .env
import { load } from "https://deno.land/std@0.202.0/dotenv/mod.ts";
//import para trabajar con la base de datos
import mongoose from "mongoose";
//import para trabajar con apollo
import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
//import para los tipos de datos, queries y mutations
import {typeDefs} from "./gql/schema.ts";
import {Query} from "./resolvers/query.ts";
import {Mutation} from "./resolvers/mutation.ts";

//cargamos el fichero de entorno .env con la URI de la base de datos
const env = await load();
const DB_URI = env["DB_URI"] || Deno.env.get("DB_URI") || "mongodb://localhost:27017/db"

try {
    console.log("Database: connecting... ", DB_URI);
    const db = await mongoose.connect(DB_URI);
    console.log("Database: connected", db.connection.name);
} catch (error) {
    console.log("Database: error: ", error);
}

const server = new ApolloServer({typeDefs,
    resolvers:{
        Query,
        Mutation,
    },
});

const {url} = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`Server ready at ${url}`);

















/*Fetch a api ninjas:
let nombre: string = 'Sphynx';
const url = 'https://api.api-ninjas.com/v1/cats?name='+nombre;

const response = await fetch(url,{
  headers:{
    'X-Api-Key': 'llI0XGrOHNhSNVpKqelpNw==fagNsRiSANP8DGMo'
  }
});

const infogato = await response.json();




otro ejemplo de fetch a api ninjas:
let nombre: string = 'A';
const url = 'https://api.api-ninjas.com/v1/cats?name='+nombre;

const response = await fetch(url,{
  headers:{
    'X-Api-Key': 'llI0XGrOHNhSNVpKqelpNw==fagNsRiSANP8DGMo'
  }
});
const infogato = await response.json();
//const gatorigen = infogato[0].origin;
const gatonombres = infogato.forEach(element => {
  console.log(element.name);
});//((e)=>e.name);
console.log(gatonombres);
 */