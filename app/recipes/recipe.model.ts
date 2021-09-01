import { Ingradient } from "../Shared/ingradients.model";

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingradients: Ingradient[];

    constructor(name: string, desc: string, imagePath: string, ingradient: Ingradient[]) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingradients = ingradient;
    }
}