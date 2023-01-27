CREATE TABLE attachment_blobs(
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,

  key TEXT NOT NULL,
  file_name TEXT NOT NULL,
  content_type TEXT,
  byte_size BIGINT NOT NULL,
  checksum TEXT NOT NULL,
  service_name TEXT NOT NULL,

  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE attachments(
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,

  name TEXT NOT NULL,
  record_type TEXT NOT NULL,
  record_id INTEGER NOT NULL,
  blob_id INTEGER REFERENCES attachment_blobs(id) NOT NULL,

  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);