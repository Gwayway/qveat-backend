import { Hono } from "hono";
import { fromHono } from "chanfana";
import { MenuCreate } from "./menuCreate";
import { MenuList } from "./menuList";
export const recipesRouter = fromHono(new Hono());

recipesRouter.post("/menu", MenuCreate);
recipesRouter.get("/menu", MenuList);
