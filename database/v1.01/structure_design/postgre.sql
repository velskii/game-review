CREATE TABLE "USER" (
  "user_id" int PRIMARY KEY,
  "username" varchar,
  "avatar" varchar,
  "password_salt" varchar,
  "password" varchar,
  "email" varchar,
  "phone" varchar,
  "intro" char(50),
  "profile" char(200),
  "created_at" datetime,
  "updated_at" datetime,
  PRIMARY KEY ("user_id")
);

CREATE TABLE "ROLE" (
  "role_id" int PRIMARY KEY,
  "user_id" int,
  "title" varchar,
  "slug" varchar,
  "description" varchar,
  "active" tinyint(1),
  "created_at" datetime,
  "updated_at" datetime
);

CREATE TABLE "ROLE_PERMISSION" (
  "role_id" int,
  "permission_id" int,
  "created_at" datetime,
  "updated_at" datetime,
  PRIMARY KEY ("role_id"),
  PRIMARY KEY ("permission_id")
);

CREATE TABLE "PERMISSION" (
  "permission_id" int PRIMARY KEY,
  "title" varchar,
  "slug" varchar,
  "description" varchar,
  "active" tinyint(1),
  "created_at" datetime,
  "updated_at" datetime
);

CREATE TABLE "GAME" (
  "game_id" int PRIMARY KEY,
  "game_name" varchar,
  "intro" varchar,
  "description" varchar,
  "logo" varchar,
  "positive_number" int,
  "negative_number" int,
  "review_number" int,
  "favorable_rate" double(3,2),
  "score" double(3,2),
  "homepage" varchar,
  "created_at" datetime,
  "updated_at" datetime
);

CREATE TABLE "PUBLISHER" (
  "publisher_id" int PRIMARY KEY,
  "publisher_name" varchar,
  "intro" varchar,
  "description" varchar,
  "created_at" datetime,
  "updated_at" datetime
);

CREATE TABLE "PUBLISHER_GAME" (
  "publisher_id" int,
  "game_id" int,
  "created_at" datetime,
  "updated_at" datetime,
  PRIMARY KEY ("publisher_id"),
  PRIMARY KEY ("game_id")
);

CREATE TABLE "DEVELOPER" (
  "developer_id" int PRIMARY KEY,
  "developer_name" varchar,
  "intro" varchar,
  "description" varchar,
  "created_at" datetime,
  "updated_at" datetime
);

CREATE TABLE "DEVELOPER_GAME" (
  "developer_id" int,
  "game_id" int,
  "created_at" datetime,
  "updated_at" datetime,
  PRIMARY KEY ("developer_id"),
  PRIMARY KEY ("game_id")
);

CREATE TABLE "PLATFORM" (
  "platform_id" int PRIMARY KEY,
  "platform_name" varchar,
  "created_at" datetime,
  "updated_at" datetime
);

CREATE TABLE "PLATFORM_GAME" (
  "platform_id" int,
  "game_id" int,
  "created_at" datetime,
  "updated_at" datetime,
  PRIMARY KEY ("platform_id"),
  PRIMARY KEY ("game_id")
);

CREATE TABLE "GAME_GENRE" (
  "genre_id" int PRIMARY KEY,
  "game_id" int,
  "genre_name" varchar,
  "created_at" datetime,
  "updated_at" datetime
);

CREATE TABLE "USER_DEFINED_TAGS" (
  "tag_id" int PRIMARY KEY,
  "user_id" int,
  "game_id" int,
  "tag_name" varchar,
  "created_at" datetime,
  "updated_at" datetime
);

CREATE TABLE "REVIEW" (
  "review_id" int PRIMARY KEY,
  "game_id" int,
  "user_id" int,
  "avatar" varchar,
  "author" varchar,
  "content" varchar,
  "parent_id" int,
  "parent_path" varchar,
  "is_deleted" tinyint(1),
  "recommend" tinyint(1),
  "helpful" tinyint(1),
  "created_at" datetime,
  "updated_at" datetime
);

CREATE UNIQUE INDEX ON "USER" ("username");

ALTER TABLE "USER" ADD FOREIGN KEY ("user_id") REFERENCES "ROLE" ("user_id");

ALTER TABLE "ROLE_PERMISSION" ADD FOREIGN KEY ("role_id") REFERENCES "ROLE" ("role_id");

ALTER TABLE "ROLE_PERMISSION" ADD FOREIGN KEY ("permission_id") REFERENCES "PERMISSION" ("permission_id");

ALTER TABLE "PUBLISHER_GAME" ADD FOREIGN KEY ("publisher_id") REFERENCES "PUBLISHER" ("publisher_id");

ALTER TABLE "PUBLISHER_GAME" ADD FOREIGN KEY ("game_id") REFERENCES "GAME" ("game_id");

ALTER TABLE "DEVELOPER_GAME" ADD FOREIGN KEY ("developer_id") REFERENCES "DEVELOPER" ("developer_id");

ALTER TABLE "DEVELOPER_GAME" ADD FOREIGN KEY ("game_id") REFERENCES "GAME" ("game_id");

ALTER TABLE "PLATFORM_GAME" ADD FOREIGN KEY ("platform_id") REFERENCES "PLATFORM" ("platform_id");

ALTER TABLE "PLATFORM_GAME" ADD FOREIGN KEY ("game_id") REFERENCES "GAME" ("game_id");

ALTER TABLE "GAME_GENRE" ADD FOREIGN KEY ("game_id") REFERENCES "GAME" ("game_id");

ALTER TABLE "USER_DEFINED_TAGS" ADD FOREIGN KEY ("user_id") REFERENCES "USER" ("user_id");

ALTER TABLE "USER_DEFINED_TAGS" ADD FOREIGN KEY ("game_id") REFERENCES "GAME" ("game_id");

ALTER TABLE "REVIEW" ADD FOREIGN KEY ("game_id") REFERENCES "GAME" ("game_id");

ALTER TABLE "REVIEW" ADD FOREIGN KEY ("user_id") REFERENCES "USER" ("user_id");
