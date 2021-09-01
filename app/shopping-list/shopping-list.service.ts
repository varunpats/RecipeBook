import { Subject } from "rxjs";
import { Ingradient } from "../Shared/ingradients.model";

export class ShoppingListService {
    ingradientsChanged = new Subject<Ingradient[]>();
    startedEditing = new Subject<number>();
    private ingradients: Ingradient[] = [
        new Ingradient("Apples", 5),
        new Ingradient("Tomatos", 10)
    ];

    getIngradients() {
        return this.ingradients.slice();
    }

    getIngradient(index: number) {
        return this.ingradients[index];
    }

    addIngradients(ingradient: Ingradient) {
        this.ingradients.push(ingradient);
        this.ingradientsChanged.next(this.ingradients.slice());
    }

    addTo(ingradients: Ingradient[]) {
        this.ingradients.push(...ingradients);
        this.ingradientsChanged.next(this.ingradients.slice());
    }

    updateIngradient(index: number, newIngradient: Ingradient) {
        this.ingradients[index] = newIngradient;
        this.ingradientsChanged.next(this.ingradients.slice());
    }

    deleteIngradient(index: number) {
        this.ingradients.splice(index, 1);
        this.ingradientsChanged.next(this.ingradients.slice());
    }
}