import { D1CreateEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { IngredientModel, ingredientCreateInput } from "./base";

export class IngredientCreate extends D1CreateEndpoint<HandleArgs> {
  _meta = {
    model: IngredientModel,
    fields: ingredientCreateInput,
  };
}