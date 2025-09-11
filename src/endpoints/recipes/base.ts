import { z } from "zod";

// 定义recipe的schema
export const recipe = z.object({
  recipe_id: z.number().int(),
  // 根据您实际的recipes表结构进行调整
  recipe_name: z.string(),
  description: z.string(),
  prep_time: z.number().int(),
  cook_time: z.number().int(),
  total_time: z.number().int(),
  servings: z.number().int(),
  difficulty: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// 定义menu的schema
export const menu = z.object({
  menu_id: z.number().int(),
  menu_name: z.string(),
  description: z.string().optional(),
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
  is_active: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const RecipeModel = {
  tableName: "recipes",
  primaryKeys: ["id"],
  schema: recipe,
  serializer: (obj: Record<string, string | number | boolean>) => {
    return {
      ...obj,
      recipe_id: Number(obj.recipe_id),
      recipe_name: obj.recipe_name,
      prep_time: Number(obj.prep_time),
      cook_time: Number(obj.cook_time),
      total_time: Number(obj.total_time),
      servings: Number(obj.servings),
    };
  },
};

// 定义MenuModel
export const MenuModel = {
  tableName: "menus",
  primaryKeys: ["id"],
  schema: menu,
  serializer: (obj: Record<string, string | number | boolean>) => {
    return {
      ...obj,
      menu_id: Number(obj.menu_id),
      menu_name: obj.menu_name,
      is_active: Boolean(obj.is_active),
    };
  },
};
