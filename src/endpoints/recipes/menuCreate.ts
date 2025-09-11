import { D1CreateEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { MenuModel } from "./base";

export class MenuCreate extends D1CreateEndpoint<HandleArgs> {
  _meta = {
    model: MenuModel,
    fields: MenuModel.schema.pick({
      menu_name: true,
    }),
  };
}
