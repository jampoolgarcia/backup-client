export interface PaymentI {
    id?: string;
    turnId: string;
    date: Date;
    paid: number;
    doctorId?: string;
    nurseId?: string;
    patientId: string;
}