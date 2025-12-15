import { D1ListEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { RecipeModel } from "./base";

export class RecipeList extends D1ListEndpoint<HandleArgs> {
  _meta = {
    model: RecipeModel,
  };
}