// @generated automatically by Diesel CLI.

diesel::table! {
    attachment_blobs (id) {
        id -> Integer,
        key -> Text,
        file_name -> Text,
        content_type -> Nullable<Text>,
        byte_size -> BigInt,
        checksum -> Text,
        service_name -> Text,
        created_at -> Timestamp,
    }
}

diesel::table! {
    attachments (id) {
        id -> Integer,
        name -> Text,
        record_type -> Text,
        record_id -> Integer,
        blob_id -> Integer,
        created_at -> Timestamp,
    }
}

diesel::table! {
    role_permissions (role, permission) {
        role -> Text,
        permission -> Text,
        created_at -> Timestamp,
    }
}

diesel::table! {
    todos (id) {
        id -> Integer,
        text -> Text,
        created_at -> Timestamp,
    }
}

diesel::table! {
    user_permissions (user_id, permission) {
        user_id -> Integer,
        permission -> Text,
        created_at -> Timestamp,
    }
}

diesel::table! {
    user_roles (user_id, role) {
        user_id -> Integer,
        role -> Text,
        created_at -> Timestamp,
    }
}

diesel::table! {
    user_sessions (id) {
        id -> Integer,
        user_id -> Integer,
        refresh_token -> Text,
        device -> Nullable<Text>,
        created_at -> Timestamp,
    }
}

diesel::table! {
    users (id) {
        id -> Integer,
        email -> Text,
        hash_password -> Text,
        activated -> Bool,
        created_at -> Timestamp,
        default_avatar_id -> Nullable<Integer>,
    }
}

diesel::joinable!(attachments -> attachment_blobs (blob_id));
diesel::joinable!(user_permissions -> users (user_id));
diesel::joinable!(user_roles -> users (user_id));
diesel::joinable!(user_sessions -> users (user_id));

diesel::allow_tables_to_appear_in_same_query!(
    attachment_blobs,
    attachments,
    role_permissions,
    todos,
    user_permissions,
    user_roles,
    user_sessions,
    users,
);
