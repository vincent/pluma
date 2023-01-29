use actix_http::header::{self};
use actix_web::{HttpResponse};
use actix_web::web::{Data, Path};
use serde::Serialize;
use create_rust_app::{Attachment, AttachmentBlob, Database, Storage};

use crate::schema::attachments::record_id;

#[derive(Serialize)]
#[tsync::tsync]
struct FileInfo {
    pub id: i32,
    pub key: String,
    pub name: String,
    pub url: Option<String>,
}

#[actix_web::get("/{id}")]
async fn get(db: Data<Database>, storage: Data<Storage>, user_id: Path<i32>) -> HttpResponse {
    let mut db = db.pool.get().unwrap();

    let record_name = "avatar".to_string();
    let record_type = "users".to_string();

    let attachment = Attachment::find_for_record(&mut db, record_name, record_type, user_id.into_inner());
    if attachment.is_err() {
        return HttpResponse::NotFound().finish();
    }

    let blob = AttachmentBlob::find_by_id(&mut db, attachment.unwrap().blob_id);
    if blob.is_err() {
        return HttpResponse::NotFound().finish();
    }

    let blob_key = blob.unwrap().key;

    let uri = storage.download_uri(blob_key, None).await;
    if uri.is_err() {
        return HttpResponse::NotFound().finish();
    }

    HttpResponse::Found()
        .insert_header((
            header::LOCATION,
            header::HeaderValue::from_str(uri.unwrap().as_str()).unwrap(),
        ))
        .finish()
}

pub fn endpoints(scope: actix_web::Scope) -> actix_web::Scope {
    return scope
        .service(get);
}
