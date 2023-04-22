export interface MedicalOfferItem {
    name: string;
    id: string;
    code: string;
    category: MedicalOfferItemCategoryType;
    price: number;
}

export enum MedicalOfferItemCategoryType {
    Test = 'Test',
    Appointment = 'Appointment'
}