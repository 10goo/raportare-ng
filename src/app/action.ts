import { AcModel } from './ac-model';

export class Action extends AcModel{
    data: string;
    cantitate: {
        schimb_1 : number;
        schimb_2? : number;
        schimb_3? : number;
    }

    constructor(data = "", cantitate = {schimb_1 : 0}) {
        super(); //Must construct parent
        this.data = data;
        this.cantitate = cantitate;
    }
}
