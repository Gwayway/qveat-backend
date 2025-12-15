import { D1ReadEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { RecipeModel } from "./base";

export class RecipeRead extends D1ReadEndpoint<HandleArgs> {
  _meta = {
    model: RecipeModel,
  };
}