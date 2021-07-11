export interface ConsultationI {
    id?: string;
    date: Date;
    observation: string;
    price: number;
    commission: number;
    img: string;
    doctorId: string;
    turnId: string; 
}
