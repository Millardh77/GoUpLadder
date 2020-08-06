import { Photo } from "./photo";
import { Usermeasure } from './usermeasure';

export interface User {
    id: number;
    userName: string;
    knownAs: string;
    age: number;
    gender: string;
    created: Date;
    lastActive: any;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
    zip4: string;
    country: string;
    interests?: string;
    introduction?: string;
    educationLevel?: string;
    incomeLevel?: string;
    lookingFor?: string;
    photoUrl: string;
    photos?: Photo[];
    usermeasures?: Usermeasure[];
    roles?: string[];
}
