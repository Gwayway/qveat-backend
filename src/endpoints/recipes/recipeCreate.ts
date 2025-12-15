import { D1CreateEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { RecipeModel, recipeCreateInput } from "./base";

export class RecipeCreate extends D1CreateEndpoint<HandleArgs> {
  _meta = {
    model: RecipeModel,
    fields: recipeCreateInput,
  };
}