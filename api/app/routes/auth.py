from fastapi import APIRouter, Depends, HTTPException, Request, Security, status
from fastapi.responses import RedirectResponse

from app.auth import get_current_user, session_cookie_scheme, stytch_client
from app.db.generated.models import User
from app.db.generated.users import AsyncQuerier
from app.db.queriers import get_user_async_querier
from app.settings import settings

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/login")
async def login():
    return RedirectResponse(
        f"https://test.stytch.com/v1/public/oauth/google/start?public_token={settings.STYTCH_PUBLIC_TOKEN}",
    )


@router.get("/callback")
async def callback(
    request: Request, querier: AsyncQuerier = Depends(get_user_async_querier)
):
    token = request.query_params.get("token")

    if not token:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)

    res = await stytch_client.oauth.authenticate_async(
        token, session_duration_minutes=60
    )

    if not res.is_success:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    if (existing_user := await querier.get_user(id=res.user.user_id)) is None:
        existing_user = await querier.create_user(
            id=res.user.user_id,
            first_name=res.user.name.first_name,
            last_name=res.user.name.last_name,
            avatar=None,
        )
        await querier._conn.commit()

    request.session.update(
        {
            "stytch": {
                "session_token": res.session_token,
                "session_jwt": res.session_jwt,
            },
            "user": existing_user.model_dump(mode="json"),
        }
    )
    return RedirectResponse(settings.APP_HOST, status_code=status.HTTP_302_FOUND)


@router.get("/logout")
async def logout(request: Request):
    jwt = request.session.get("stytch", {}).get("session_jwt")
    await stytch_client.sessions.revoke_async(session_jwt=jwt)
    request.session.clear()
    return RedirectResponse(settings.APP_HOST, status_code=status.HTTP_302_FOUND)


@router.get(
    "/me",
    dependencies=[Security(session_cookie_scheme)],
    response_model=User,
)
async def me(user: User = Depends(get_current_user)):
    return user
