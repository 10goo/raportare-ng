export class AcModel {
    tip: string;
    produse: string;
    um: string;
    material: string;
    coeficient: number;
    merged: boolean;

    constructor(tip = "", produse = "", um = "", material = "", coeficient = 1, merged = false) {
        this.tip = tip;
        this.produse = produse;
        this.um = um;
        this.material = material;
        this.coeficient = coeficient;
        this.merged = merged
    }
}
