CREATE DATABASE vivre_tcg;

CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    card_name TEXT NOT NULL,
    card_set_id TEXT NOT NULL,
    card_color TEXT,
    card_image TEXT,
    card_image_id TEXT,
    sub_types TEXT,
    market_price NUMERIC(10, 2),
    set_id TEXT,
    card_type TEXT,
    card_cost INTEGER,
    counter_amount INTEGER,
    rarity TEXT
);