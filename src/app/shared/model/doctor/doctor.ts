import { PaymentI } from "../payment";
import { ConsultationI } from "./consultation";
import { SpecialtyI } from "./specialty";

export interface DoctorI {
    id?: string;
    name: string;
    ci: string;
    phone: string;
    sex: string;
    dateBirth: Date;
    direction: string;
    balance: number;
    img: string;
    specialtyId: string;
    specialty?: SpecialtyI;
    consultation?: ConsultationI[];
    payments?: PaymentI[];
}
