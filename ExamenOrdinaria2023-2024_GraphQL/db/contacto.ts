import mongoose from "mongoose";
import {contacto} from "../types.ts";

const Schema = mongoose.Schema;
const contactoSchema = new Schema(
    {
        NameAndSurname: { type: String,required: true},
        Telefono: {type: String, required: true},
        PaisdeResidencia: {type: String, required: false},
        HoraActualEnElPais: {type: String, required: false},
    }
);
export type contactoModelType = mongoose.Document & Omit<contacto, "id">;
export default mongoose.model<contactoModelType>("contacto", contactoSchema);