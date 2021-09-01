import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingradient } from "../Shared/ingradients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    // private recipes: Recipe[] = [
    //     new Recipe("Big Fat Burger", "Mouth watering burger!", "https://images.pexels.com/photos/3219547/pexels-photo-3219547.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", [new Ingradient('Buns', 2), new Ingradient('Meat', 1)]),
    //     new Recipe("Pizza", "What else do you need?", "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", [new Ingradient('Base', 1), new Ingradient('Cheese', 2), new Ingradient('Tomato', 1)])
    // ];

    private recipes: Recipe[] = [];

    recipesChanged = new Subject<Recipe[]>();

    constructor(private slService: ShoppingListService) { }

    setRecipes(recipeArr: Recipe[]) {
        this.recipes = recipeArr;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index]
    }

    addIngradientsToShoppingList(ingradients: Ingradient[]) {
        this.slService.addTo(ingradients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}