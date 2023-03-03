Table USER {
  user_id int [pk]
  username varchar
  avatar varchar
  password_salt varchar
  password varchar
  email varchar
  phone varchar
  intro char(50)
  profile char(200)
  created_at datetime
  updated_at datetime
  Indexes {
    (user_id) [pk]
    username [unique]
  }
}

Table ROLE {
  role_id int [pk]
  user_id int [ref: < USER.user_id]
  title varchar
  slug varchar
  description varchar
  active tinyint(1)
  created_at datetime
  updated_at datetime
}

Table ROLE_PERMISSION {
  role_id int [ref: > ROLE.role_id]
  permission_id int [ref: > PERMISSION.permission_id]
  created_at datetime
  updated_at datetime
   Indexes {
    (role_id) [pk]
    permission_id [pk]
  }
}

Table PERMISSION {
  permission_id int [pk]
  title varchar
  slug varchar
  description varchar
  active tinyint(1)
  created_at datetime
  updated_at datetime
}


Table GAME {
  game_id int [pk]
  game_name varchar
  intro varchar
  description varchar
  logo varchar
  positive_number int
  negative_number int
  review_number int
  favorable_rate double(3,2)
  score double(3,2)
  homepage varchar
  created_at datetime
  updated_at datetime
}

Table PUBLISHER {
  publisher_id int [pk]
  publisher_name varchar
  intro varchar
  description varchar
  created_at datetime
  updated_at datetime
}

Table PUBLISHER_GAME {
  publisher_id int [ref: > PUBLISHER.publisher_id]
  game_id int [ref: > GAME.game_id]
  created_at datetime
  updated_at datetime
  INDEXES {
    publisher_id [pk]
    game_id [pk]
  }
}

Table DEVELOPER {
  developer_id int [pk]
  developer_name varchar
  intro varchar
  description varchar
  created_at datetime
  updated_at datetime
}

Table DEVELOPER_GAME {
  developer_id int [ref: > DEVELOPER.developer_id]
  game_id int [ref: > GAME.game_id]
  created_at datetime
  updated_at datetime
  INDEXES {
    developer_id [pk]
    game_id [pk]
  }
}

Table PLATFORM {
  platform_id int [pk]
  platform_name varchar
  created_at datetime
  updated_at datetime
}

Table PLATFORM_GAME {
  platform_id int [ref: > PLATFORM.platform_id]
  game_id int [ref: > GAME.game_id]
  created_at datetime
  updated_at datetime
  INDEXES {
    platform_id [pk]
    game_id [pk]
  }
}

Table GAME_GENRE {
  genre_id int [pk]
  game_id int [ref: > GAME.game_id]
  genre_name varchar
  created_at datetime
  updated_at datetime
}

Table USER_DEFINED_TAGS {
  tag_id int [pk]
  user_id int [ref: > USER.user_id]
  game_id int [ref: > GAME.game_id]
  tag_name varchar
  created_at datetime
  updated_at datetime
}

Table REVIEW {
  review_id int [pk]
  game_id int [ref: > GAME.game_id]
  user_id int [ref: > USER.user_id]
  avatar varchar
  author varchar
  content varchar
  parent_id int
  parent_path varchar
  is_deleted tinyint(1)
  recommend tinyint(1)
  helpful tinyint(1)
  created_at datetime
  updated_at datetime
}
