import { Cantitate } from './cantitate';

export class Action {
    tip?: string;
    produs?: string;
    material?: string;
    cantitate: Cantitate

    constructor(
        tip: string = ' ',
        produs: string = ' ',
        material: string = ' ',
        cantitate: Cantitate
    ) { }
}
