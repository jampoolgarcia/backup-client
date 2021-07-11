export interface TurnI {
    id?: string;
    startDate: Date;
    endDate?: Date;
    startBalance: number;
    endBalance?: number;
    boxId?: string;
    userId?: string;
    token: string;
}