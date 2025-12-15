import { SELF } from "cloudflare:test";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Helper function to create一个菜谱并返回其ID
async function createRecipe(recipeData: any) {
  const response = await SELF.fetch(`http://local.test/recipes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipeData),
  });
  const body = await response.json<{
    success: boolean;
    result: { id: number };
  }>();
  return body.result.id;
}

// Helper function to为菜谱添加食材
async function addIngredient(recipeId: number, ingredientData: any) {
  const response = await SELF.fetch(`http://local.test/recipes/${recipeId}/ingredients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ingredientData),
  });
  const body = await response.json<{
    success: boolean;
    result: { id: number };
  }>();
  return body.result.id;
}

// Helper function to为菜谱添加步骤
async function addStep(recipeId: number, stepData: any) {
  const response = await SELF.fetch(`http://local.test/recipes/${recipeId}/steps`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stepData),
  });
  const body = await response.json<{
    success: boolean;
    result: { id: number };
  }>();
  return body.result.id;
}

describe("Recipe API Integration Tests", () => {
  beforeEach(async () => {
    vi.clearAllMocks();
  });

  // Tests for GET /recipes
  describe("GET /recipes", () => {
    it("should get an empty list of recipes", async () => {
      const response = await SELF.fetch(`http://local.test/recipes`);
      const body = await response.json<{ success: boolean; result: any[] }>();

      expect(response.status).toBe(200);
      expect(body.success).toBe(true);
      expect(body.result).toEqual([]);
    });

    it("should get a list with one recipe", async () => {
      await createRecipe({
        name: "番茄炒蛋",
        slug: "tomato-scrambled-eggs",
        description: "经典的家常菜",
        prep_time: 10,
        cook_time: 5,
        servings: 2,
        difficulty: "easy",
        category: "中餐",
      });

      const response = await SELF.fetch(`http://local.test/recipes`);
      const body = await response.json<{ success: boolean; result: any[] }>();

      expect(response.status).toBe(200);
      expect(body.success).toBe(true);
      expect(body.result.length).toBe(1);
      expect(body.result[0]).toEqual(
        expect.objectContaining({
          name: "番茄炒蛋",
          slug: "tomato-scrambled-eggs",
        }),
      );
    });
  });

  // Tests for POST /recipes
  describe("POST /recipes", () => {
    it("should create a new recipe successfully", async () => {
      const recipeData = {
        name: "红烧肉",
        slug: "braised-pork-belly",
        description: "经典的红烧肉做法",
        prep_time: 20,
        cook_time: 60,
        servings: 4,
        difficulty: "medium",
        category: "中餐",
        image_url: "https://example.com/braised-pork.jpg",
      };
      const response = await SELF.fetch(`http://local.test/recipes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeData),
      });

      const body = await response.json<{ success: boolean; result: any }>();

      expect(response.status).toBe(201);
      expect(body.success).toBe(true);
      expect(body.result).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          ...recipeData,
        }),
      );
    });

    it("should return a 400 error for invalid input", async () => {
      const invalidRecipeData = {
        // Missing required fields 'name', 'slug'
        description: "This is an invalid recipe",
      };
      const response = await SELF.fetch(`http://local.test/recipes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invalidRecipeData),
      });
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body.success).toBe(false);
      expect(body.errors).toBeInstanceOf(Array);
    });
  });

  // Tests for GET /recipes/{id}
  describe("GET /recipes/{id}", () => {
    it("should get a single recipe by its ID", async () => {
      const recipeData = {
        name: "麻婆豆腐",
        slug: "mapo-tofu",
        description: "麻辣鲜香的川菜",
        prep_time: 15,
        cook_time: 10,
        servings: 2,
        difficulty: "medium",
        category: "川菜",
      };
      const recipeId = await createRecipe(recipeData);

      const response = await SELF.fetch(`http://local.test/recipes/${recipeId}`);
      const body = await response.json<{ success: boolean; result: any }>();

      expect(response.status).toBe(200);
      expect(body.success).toBe(true);
      expect(body.result).toEqual(
        expect.objectContaining({
          id: recipeId,
          ...recipeData,
        }),
      );
    });

    it("should return a 404 error if recipe is not found", async () => {
      const nonExistentId = 9999;
      const response = await SELF.fetch(
        `http://local.test/recipes/${nonExistentId}`,
      );
      const body = await response.json();

      expect(response.status).toBe(404);
      expect(body.success).toBe(false);
      expect(body.errors[0].message).toBe("Not Found");
    });
  });

  // Tests for PUT /recipes/{id}
  describe("PUT /recipes/{id}", () => {
    it("should update a recipe successfully", async () => {
      const recipeData = {
        name: "原味菜谱",
        slug: "original-recipe",
        description: "原始版本的菜谱",
        prep_time: 10,
        cook_time: 20,
        servings: 2,
        difficulty: "easy",
        category: "家常菜",
      };
      const recipeId = await createRecipe(recipeData);

      const updatedData = {
        name: "更新版菜谱",
        slug: "updated-recipe",
        description: "更新后的菜谱描述",
        prep_time: 15,
        cook_time: 25,
        servings: 4,
        difficulty: "medium",
        category: "改良菜",
      };

      const response = await SELF.fetch(`http://local.test/recipes/${recipeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const body = await response.json<{ success: boolean; result: any }>();

      expect(response.status).toBe(200);
      expect(body.success).toBe(true);
      expect(body.result).toEqual(
        expect.objectContaining({
          id: recipeId,
          ...updatedData,
        }),
      );
    });

    it("should return 404 when trying to update a non-existent recipe", async () => {
      const nonExistentId = 9999;
      const updatedData = {
        name: "更新版菜谱",
        slug: "updated-recipe",
        description: "更新后的菜谱描述",
      };
      const response = await SELF.fetch(
        `http://local.test/recipes/${nonExistentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        },
      );

      expect(response.status).toBe(404);
    });
  });

  // Tests for DELETE /recipes/{id}
  describe("DELETE /recipes/{id}", () => {
    it("should delete a recipe successfully", async () => {
      const recipeData = {
        name: "要删除的菜谱",
        slug: "recipe-to-delete",
        description: "这个菜谱将被删除",
        prep_time: 5,
        cook_time: 10,
        servings: 1,
        difficulty: "easy",
        category: "测试菜",
      };
      const recipeId = await createRecipe(recipeData);

      const deleteResponse = await SELF.fetch(
        `http://local.test/recipes/${recipeId}`,
        {
          method: "DELETE",
        },
      );
      const deleteBody = await deleteResponse.json<{
        success: boolean;
        result: any;
      }>();

      expect(deleteResponse.status).toBe(200);
      expect(deleteBody.success).toBe(true);
      expect(deleteBody.result.id).toBe(recipeId);

      // Verify the recipe is actually deleted
      const getResponse = await SELF.fetch(`http://local.test/recipes/${recipeId}`);
      expect(getResponse.status).toBe(404);
    });

    it("should return 404 when trying to delete a non-existent recipe", async () => {
      const nonExistentId = 9999;
      const response = await SELF.fetch(
        `http://local.test/recipes/${nonExistentId}`,
        {
          method: "DELETE",
        },
      );
      const body = await response.json();

      expect(response.status).toBe(404);
      expect(body.success).toBe(false);
      expect(body.errors[0].message).toBe("Not Found");
    });
  });

  // Tests for POST /recipes/{id}/ingredients
  describe("POST /recipes/{id}/ingredients", () => {
    it("should add an ingredient to a recipe successfully", async () => {
      const recipeId = await createRecipe({
        name: "测试菜谱",
        slug: "test-recipe",
        description: "用于测试食材添加",
      });

      const ingredientData = {
        recipe_id: recipeId,
        name: "番茄",
        quantity: 3,
        unit: "个",
        notes: "切块",
        sort_order: 1,
      };

      const response = await SELF.fetch(`http://local.test/recipes/${recipeId}/ingredients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ingredientData),
      });
      const body = await response.json<{ success: boolean; result: any }>();

      expect(response.status).toBe(201);
      expect(body.success).toBe(true);
      expect(body.result).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          ...ingredientData,
        }),
      );
    });
  });

  // Tests for POST /recipes/{id}/steps
  describe("POST /recipes/{id}/steps", () => {
    it("should add a step to a recipe successfully", async () => {
      const recipeId = await createRecipe({
        name: "测试菜谱",
        slug: "test-recipe",
        description: "用于测试步骤添加",
      });

      const stepData = {
        recipe_id: recipeId,
        description: "将番茄洗净切块",
        step_number: 1,
        timer_duration: 300,
      };

      const response = await SELF.fetch(`http://local.test/recipes/${recipeId}/steps`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stepData),
      });
      const body = await response.json<{ success: boolean; result: any }>();

      expect(response.status).toBe(201);
      expect(body.success).toBe(true);
      expect(body.result).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          ...stepData,
        }),
      );
    });
  });
});