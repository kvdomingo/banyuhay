provider "google" {
  project = "my-projects-306716"
  region  = "asia-southeast1"
}

resource "google_storage_bucket" "default" {
  name     = "banyuhay-assets-306716"
  location = "asia-southeast1"

  uniform_bucket_level_access = true
  enable_object_retention     = false

  cors {
    origin = ["*"]
    method = ["GET", "HEAD"]
    response_header = ["*"]
  }
}

resource "google_storage_bucket_iam_binding" "public" {
  bucket = google_storage_bucket.default.name
  members = ["allUsers"]
  role   = "roles/storage.objectViewer"
}
