variable "COMMIT_SHA" {}
variable "IMAGE_NAME" {}
variable "VITE_PUBLIC_STYTCH_PUBLIC_TOKEN" {}

target "default" {
    context = "."
    dockerfile = "prod.Dockerfile"
    tags = [
        "${IMAGE_NAME}:${COMMIT_SHA}",
        "${IMAGE_NAME}:latest",
    ]
    platforms = ["linux/amd64"]
    args = {
        VITE_PUBLIC_APP_HOST = "https://banyuh.ai"
        VITE_PUBLIC_STYTCH_PUBLIC_TOKEN = "${VITE_PUBLIC_STYTCH_PUBLIC_TOKEN}"
    }
}
