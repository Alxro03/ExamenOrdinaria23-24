export const typeDefs = `#graphql
    type contacto {
        id: ID!
        NameAndSurname: String!
        Telefono: String!
        PaisdeResidencia: String!
        HoraActualEnElPais: String!
    }
   
    type Query {
        getcontacto(id: ID!): contacto!
        getcontactos: [contacto!]!
    }
    
    type Mutation {
        addcontacto(NameAndSurname: String!, Telefono: String!): contacto!
        updatecontacto(id:ID!, NameAndSurname: String, Telefono: String): contacto!
        deletecontacto(id:ID!): Boolean!
    }
 `;