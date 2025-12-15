import { D1CreateEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { StepModel, stepCreateInput } from "./base";

export class StepCreate extends D1CreateEndpoint<HandleArgs> {
  _meta = {
    model: StepModel,
    fields: stepCreateInput,
  };
}