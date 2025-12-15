import { Hono } from "hono";
import { fromHono } from "chanfana";
import { RecipeList } from "./recipeList";
import { RecipeCreate } from "./recipeCreate";
import { RecipeRead } from "./recipeRead";
import { RecipeUpdate } from "./recipeUpdate";
import { RecipeDelete } from "./recipeDelete";
import { IngredientCreate } from "./ingredientCreate";
import { StepCreate } from "./stepCreate";

export const recipesRouter = fromHono(new Hono());

// 菜谱路由
recipesRouter.get("/", RecipeList);
recipesRouter.post("/", RecipeCreate);
recipesRouter.get("/:id", RecipeRead);
recipesRouter.put("/:id", RecipeUpdate);
recipesRouter.delete("/:id", RecipeDelete);

// 食材路由
recipesRouter.post("/:id/ingredients", IngredientCreate);

// 步骤路由
recipesRouter.post("/:id/steps", StepCreate);