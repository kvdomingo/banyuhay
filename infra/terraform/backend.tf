terraform {
  required_version = "~>1.8"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 7.0"
    }
  }

  backend "gcs" {
    prefix = "banyuhay"
    bucket = "my-projects-306716-terraform-backend"
  }
}
