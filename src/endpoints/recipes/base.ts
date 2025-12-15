import { z } from "zod";

// 菜谱模型
export const recipe = z.object({
  id: z.number().int(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  prep_time: z.number().int().optional(),
  cook_time: z.number().int().optional(),
  servings: z.number().int().optional(),
  difficulty: z.enum(["easy", "medium", "hard"]).optional(),
  category: z.string().optional(),
  image_url: z.string().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// 食材模型
export const ingredient = z.object({
  id: z.number().int(),
  recipe_id: z.number().int(),
  name: z.string(),
  quantity: z.number().optional(),
  unit: z.string().optional(),
  notes: z.string().optional(),
  sort_order: z.number().int(),
  created_at: z.string().datetime(),
});

// 步骤模型
export const step = z.object({
  id: z.number().int(),
  recipe_id: z.number().int(),
  description: z.string(),
  step_number: z.number().int(),
  image_url: z.string().optional(),
  timer_duration: z.number().int().optional(),
  created_at: z.string().datetime(),
});

// 完整的菜谱模型（包含食材和步骤）
export const recipeWithDetails = recipe.extend({
  ingredients: z.array(ingredient),
  steps: z.array(step),
});

// 创建菜谱的输入模型
export const recipeCreateInput = recipe.pick({
  name: true,
  slug: true,
  description: true,
  prep_time: true,
  cook_time: true,
  servings: true,
  difficulty: true,
  category: true,
  image_url: true,
});

// 创建食材的输入模型
export const ingredientCreateInput = ingredient.pick({
  recipe_id: true,
  name: true,
  quantity: true,
  unit: true,
  notes: true,
  sort_order: true,
});

// 创建步骤的输入模型
export const stepCreateInput = step.pick({
  recipe_id: true,
  description: true,
  step_number: true,
  image_url: true,
  timer_duration: true,
});

// 菜谱模型配置
export const RecipeModel = {
  tableName: "recipes",
  primaryKeys: ["id"],
  schema: recipe,
  serializer: (obj: Record<string, string | number | boolean>) => {
    return {
      ...obj,
      prep_time: obj.prep_time ? Number(obj.prep_time) : null,
      cook_time: obj.cook_time ? Number(obj.cook_time) : null,
      servings: obj.servings ? Number(obj.servings) : null,
    };
  },
  serializerObject: recipe,
};

// 食材模型配置
export const IngredientModel = {
  tableName: "ingredients",
  primaryKeys: ["id"],
  schema: ingredient,
  serializer: (obj: Record<string, string | number | boolean>) => {
    return {
      ...obj,
      quantity: obj.quantity ? Number(obj.quantity) : null,
      sort_order: Number(obj.sort_order),
    };
  },
  serializerObject: ingredient,
};

// 步骤模型配置
export const StepModel = {
  tableName: "steps",
  primaryKeys: ["id"],
  schema: step,
  serializer: (obj: Record<string, string | number | boolean>) => {
    return {
      ...obj,
      step_number: Number(obj.step_number),
      timer_duration: obj.timer_duration ? Number(obj.timer_duration) : null,
    };
  },
  serializerObject: step,
};