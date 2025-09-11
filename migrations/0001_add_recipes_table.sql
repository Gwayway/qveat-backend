-- 1. 菜谱分类表
CREATE TABLE
    IF NOT EXISTS categories (
        category_id INTEGER PRIMARY KEY AUTOINCREMENT,
        parent_id INTEGER DEFAULT NULL,
        category_name TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (parent_id) REFERENCES categories (category_id)
    );

-- 2. 菜谱表（核心表）
CREATE TABLE
    IF NOT EXISTS recipes (
        recipe_id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe_name TEXT NOT NULL,
        description TEXT,
        instructions TEXT NOT NULL,
        prep_time INTEGER,
        cook_time INTEGER,
        total_time INTEGER,
        difficulty TEXT CHECK (difficulty IN ('简单', '中等', '困难')) DEFAULT '中等',
        servings INTEGER,
        image_url TEXT,
        category_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories (category_id)
    );

-- 3. 食材表
CREATE TABLE
    IF NOT EXISTS ingredients (
        ingredient_id INTEGER PRIMARY KEY AUTOINCREMENT,
        ingredient_name TEXT NOT NULL UNIQUE,
        description TEXT,
        storage_tips TEXT
    );

-- 4. 菜谱-食材关联表
CREATE TABLE
    IF NOT EXISTS recipe_ingredients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe_id INTEGER NOT NULL,
        ingredient_id INTEGER NOT NULL,
        quantity REAL,
        unit TEXT,
        notes TEXT,
        FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id) ON DELETE CASCADE,
        FOREIGN KEY (ingredient_id) REFERENCES ingredients (ingredient_id) ON DELETE CASCADE,
        UNIQUE (recipe_id, ingredient_id)
    );

-- 5. 菜单表
CREATE TABLE
    IF NOT EXISTS menus (
        menu_id INTEGER PRIMARY KEY AUTOINCREMENT,
        menu_name TEXT NOT NULL,
        description TEXT,
        menu_date DATE,
        created_by TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- 6. 菜单-菜谱关联表
CREATE TABLE
    IF NOT EXISTS menu_recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        menu_id INTEGER NOT NULL,
        recipe_id INTEGER NOT NULL,
        meal_type TEXT CHECK (meal_type IN ('早餐', '午餐', '晚餐', '点心', '其他')) DEFAULT '其他',
        sort_order INTEGER DEFAULT 0,
        FOREIGN KEY (menu_id) REFERENCES menus (menu_id) ON DELETE CASCADE,
        FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id) ON DELETE CASCADE,
        UNIQUE (menu_id, recipe_id, meal_type)
    );