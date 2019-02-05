export class AcModel {
    tip?: string;
    produs: string;
    um: string;
    material: string;
    coeficient: number;

    constructor(tip = "", produs = "", um = "", material = "", coeficient = 1) {
        this.tip = tip;
        this.produs = produs;
        this.um = um;
        this.material = material;
        this.coeficient = coeficient;
    }
}
