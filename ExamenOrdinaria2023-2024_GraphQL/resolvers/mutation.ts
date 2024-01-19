import {GraphQLError} from "graphql";
import contactoModel, {contactoModelType} from "../db/contacto.ts";

export const Mutation = {
    addcontacto: async (_:unknown, args:{NameAndSurname:string; Telefono:string}
    ): Promise<contactoModelType> => {


        let telnum: string = args.Telefono;
        if(telnum.length <9){
            throw new GraphQLError("numero de telefono invalido",{
                extensions: { code: "NOT_FOUND"},
            });
        }
        const url1 = 'https://api.api-ninjas.com/v1/validatephone?number='+telnum;

        const response1 = await fetch(url1,{
        headers:{
            'X-Api-Key': 'llI0XGrOHNhSNVpKqelpNw==fagNsRiSANP8DGMo'
        }
        });
        const infonumber = await response1.json();
        const pais = infonumber.country;

        

const url2 = 'https://api.api-ninjas.com/v1/country?name='+ pais
        const response2 = await fetch(url2,{
        headers:{
            'X-Api-Key': 'llI0XGrOHNhSNVpKqelpNw==fagNsRiSANP8DGMo'
        }
        });
        const infocountry = await response2.json();
        
        const capital = infocountry[0].capital;

        
  


        const url3 = 'https://api.api-ninjas.com/v1/worldtime?city='+capital
        const response3 = await fetch(url3,{
        headers:{
            'X-Api-Key': 'llI0XGrOHNhSNVpKqelpNw==fagNsRiSANP8DGMo'
        }
        });
        const infohora = await response3.json();
        const hora = infohora.datetime;
        
        const contacto = {
            NameAndSurname: args.NameAndSurname,
            Telefono: args.Telefono,
            PaisdeResidencia: pais,
            HoraActualEnElPais: hora,
        }
        const newcontacto = await contactoModel.create(contacto);
        return newcontacto;
    },

    updatecontacto: async (_:unknown, args:{id:string,NameAndSurname:string,Telefono:string}
    ): Promise<contactoModelType> => {
        let telnum: string = args.Telefono;
        if(telnum.length <9){
            throw new GraphQLError("numero de telefono invalido",{
                extensions: { code: "NOT_FOUND"},
            });
        }
        const url1 = 'https://api.api-ninjas.com/v1/validatephone?number='+telnum;

        const response1 = await fetch(url1,{
        headers:{
            'X-Api-Key': 'llI0XGrOHNhSNVpKqelpNw==fagNsRiSANP8DGMo'
        }
        });
        const infonumber = await response1.json();
        const pais = infonumber.country;

        

const url2 = 'https://api.api-ninjas.com/v1/country?name='+ pais
        const response2 = await fetch(url2,{
        headers:{
            'X-Api-Key': 'llI0XGrOHNhSNVpKqelpNw==fagNsRiSANP8DGMo'
        }
        });
        const infocountry = await response2.json();
        
        const capital = infocountry[0].capital;

        
  


        const url3 = 'https://api.api-ninjas.com/v1/worldtime?city='+capital
        const response3 = await fetch(url3,{
        headers:{
            'X-Api-Key': 'llI0XGrOHNhSNVpKqelpNw==fagNsRiSANP8DGMo'
        }
        });
        const infohora = await response3.json();
        const hora = infohora.datetime;
        
        const contacto = await contactoModel.findByIdAndUpdate(args.id,
            {NameAndSurname: args.NameAndSurname, Telefono: args.Telefono, PaisdeResidencia: pais,  HoraActualEnElPais: hora},
            {new: true, runValidators: true}
            );
        if(!contacto){
            throw new GraphQLError('No se han encontrado contactos con este id', {
                extenions: { code: "NOT_FOUND"},
            });
        }
        return contacto
    },

    deletecontacto: async (_:unknown, args:{id:string}
    ): Promise<contactoModelType> => {
        const contacto = await contactoModel.findByIdAndDelete(args.id);
        if(!contacto){
            return false;
        }else{
            return true;
        }
    },
}