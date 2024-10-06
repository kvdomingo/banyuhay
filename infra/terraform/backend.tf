terraform {
  required_version = "~>1.8"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~>6.5"
    }
  }

  backend "gcs" {
    prefix = "banyuhay"
    bucket = "my-projects-306716-terraform-backend"
  }
}
