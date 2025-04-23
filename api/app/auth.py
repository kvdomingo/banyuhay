import stytch
from fastapi import HTTPException, Request, status
from fastapi.security import APIKeyCookie
from stytch.consumer.models.users import User

from app.settings import settings

stytch_client = stytch.Client(
    project_id=settings.STYTCH_PROJECT_ID,
    secret=settings.STYTCH_SECRET,
    environment=settings.STYTCH_ENVIRONMENT,
)


class StytchSessionCookie(APIKeyCookie):
    async def __call__(self, request: Request) -> User:
        if not (stytch_jwt := request.session.get("stytch", {}).get("session_jwt")):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

        res = await stytch_client.sessions.authenticate_jwt_async(
            session_jwt=stytch_jwt
        )

        if not res.is_success:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

        return res.user


session_cookie_scheme = StytchSessionCookie(name="session")


async def get_current_user(request: Request):
    return request.session.get("stytch", {}).get("user", {})
