import { D1UpdateEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { RecipeModel, recipeCreateInput } from "./base";

export class RecipeUpdate extends D1UpdateEndpoint<HandleArgs> {
  _meta = {
    model: RecipeModel,
    fields: recipeCreateInput,
  };
}