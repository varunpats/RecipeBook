import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { RecipeService } from "../recipes/recipes.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: "root"
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipe-book-ad967-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(
            response => {
                console.log(response);
            }
        );
    }

    fetchRecipes() {
        // return this.authService.user.pipe(take(1), exhaustMap(user => {
        return this.http.get<Recipe[]>('https://recipe-book-ad967-default-rtdb.firebaseio.com/recipes.json')
            .pipe(map((recipesAr: Recipe[]) => {
                return recipesAr.map((recipe: Recipe) => {
                    return {
                        ...recipe, ingradients: recipe.ingradients ? recipe.ingradients : []
                    };
                });
            }),
                tap((recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }));
    }
}