import { D1DeleteEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { RecipeModel } from "./base";

export class RecipeDelete extends D1DeleteEndpoint<HandleArgs> {
  _meta = {
    model: RecipeModel,
  };
}