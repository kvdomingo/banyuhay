import stytch
from fastapi import Depends, HTTPException, Request, status
from fastapi.security import APIKeyCookie
from stytch.core.response_base import StytchError

from app.db.generated.models import User
from app.db.generated.users import AsyncQuerier
from app.db.queriers import get_user_async_querier
from app.settings import settings

stytch_client = stytch.Client(
    project_id=settings.STYTCH_PROJECT_ID,
    secret=settings.STYTCH_SECRET,
    environment=settings.STYTCH_ENVIRONMENT,
)


class StytchSessionCookie(APIKeyCookie):
    async def __call__(
        self,
        request: Request,
        querier: AsyncQuerier = Depends(get_user_async_querier),
    ) -> User:
        if not (stytch_jwt := request.session.get("stytch", {}).get("session_jwt")):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

        try:
            res = await stytch_client.sessions.authenticate_jwt_async(
                session_jwt=stytch_jwt
            )
        except StytchError as e:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED) from e

        user = await querier.get_user(id=res.session.user_id)
        if user is None:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

        return user


session_cookie_scheme = StytchSessionCookie(name="session")


async def get_current_user(request: Request):
    return request.session.get("user", {})
