from authlib.common.security import generate_token
from kinde_sdk import Configuration
from kinde_sdk.kinde_api_client import GrantType, KindeApiClient

from api.settings import settings

config = Configuration(host=settings.KINDE_HOST)

kinde_client_api_params = {
    "configuration": config,
    "domain": settings.KINDE_HOST,
    "client_id": settings.KINDE_CLIENT_ID,
    "client_secret": settings.KINDE_CLIENT_SECRET,
}

client = KindeApiClient(
    configuration=config,
    domain=settings.KINDE_HOST,
    client_id=settings.KINDE_CLIENT_ID,
    client_secret=settings.KINDE_CLIENT_SECRET,
    grant_type=GrantType.AUTHORIZATION_CODE_WITH_PKCE,
    callback_url=f"{settings.APP_HOST}auth/callback",
    code_verifier=generate_token(48),
)
