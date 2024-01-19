import {GraphQLError} from "graphql";
import contactoModel, {contactoModelType} from "../db/contacto.ts";
import {contacto} from "../types.ts";



export const Query = {
    getcontactos: async (): Promise<contactoModelType[]> => {
        const getcontactos = await contactoModel.find().exec();
        return getcontactos;
    },
    getcontacto: async (_:unknown, args: {id:string}): Promise<contactoModelType> => {
        const getcontacto = await contactoModel.findById(args.id);
        if(!getcontacto){
            throw new GraphQLError (`No contact found with id ${args.id}`,{
                extensions: {code: "NOT_FOUND" },
            });
        }
        return getcontacto;
    },
}

