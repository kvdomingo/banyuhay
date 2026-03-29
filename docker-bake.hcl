variable "COMMIT_SHA" {}
variable "BASE_IMAGE_NAME" {}
variable "VITE_PUBLIC_STYTCH_PUBLIC_TOKEN" {}

target "api" {
    context = "."
    dockerfile = "api.Dockerfile"
    tags = [
        "${BASE_IMAGE_NAME}-api:${COMMIT_SHA}",
        "${BASE_IMAGE_NAME}-api:latest",
    ]
    platforms = ["linux/amd64"]
}

target "app" {
    context = "."
    dockerfile = "app.Dockerfile"
    tags = [
        "${BASE_IMAGE_NAME}-app:${COMMIT_SHA}",
        "${BASE_IMAGE_NAME}-app:latest",
    ]
    platforms = ["linux/amd64"]
    args = {
        VITE_PUBLIC_APP_HOST = "https://banyuh.ai"
        VITE_PUBLIC_STYTCH_PUBLIC_TOKEN = "${VITE_PUBLIC_STYTCH_PUBLIC_TOKEN}"
    }
}
