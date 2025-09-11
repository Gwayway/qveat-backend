import { D1ListEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { MenuModel } from "./base";

export class MenuList extends D1ListEndpoint<HandleArgs> {
  _meta = {
    model: MenuModel,
  };

  searchFields = ["menu_name", "description"];
  defaultOrderBy = "menu_id DESC";
}
