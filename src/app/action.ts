import { Cantitate } from './cantitate';

export class Action {
    data: string;
    tip?: string;
    produs?: string;
    material?: string;
    cantitate: Cantitate;
    um?: string;

    constructor(
        tip: string = ' ',
        produs: string = ' ',
        material: string = ' ',
        cantitate: Cantitate
    ) { }
}
