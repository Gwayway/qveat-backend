-- Migration number: 0002 	 2025-06-19T18:13:02.648Z
-- 菜谱表
CREATE TABLE
    IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE DEFAULT (
            lower(replace (hex (randomblob (4)), '-', '')) || '-' || strftime ('%Y%m%d%H%M%S', 'now')
        ),
        description TEXT,
        prep_time INTEGER, -- 准备时间（分钟）
        cook_time INTEGER, -- 烹饪时间（分钟）
        servings INTEGER, -- 份量
        difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')), -- 难度
        category TEXT, -- 分类（如：中餐、西餐、甜点等）
        image_url TEXT, -- 图片URL
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

-- 食材表
CREATE TABLE
    IF NOT EXISTS ingredients (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        recipe_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        quantity REAL, -- 数量
        unit TEXT, -- 单位（如：克、毫升、个等）
        notes TEXT, -- 备注（如：切丝、切片等）
        sort_order INTEGER NOT NULL, -- 排序顺序
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (recipe_id) REFERENCES recipes (id) ON DELETE CASCADE
    );

-- 步骤表
CREATE TABLE
    IF NOT EXISTS steps (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        recipe_id INTEGER NOT NULL,
        description TEXT NOT NULL,
        step_number INTEGER NOT NULL, -- 步骤序号
        image_url TEXT, -- 步骤图片URL
        timer_duration INTEGER, -- 定时器时长（秒）
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (recipe_id) REFERENCES recipes (id) ON DELETE CASCADE
    );

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_recipes_slug ON recipes (slug);

CREATE INDEX IF NOT EXISTS idx_recipes_category ON recipes (category);

CREATE INDEX IF NOT EXISTS idx_ingredients_recipe_id ON ingredients (recipe_id);

CREATE INDEX IF NOT EXISTS idx_steps_recipe_id ON steps (recipe_id);