from fastapi import APIRouter, HTTPException, Request, Security, status
from fastapi.responses import RedirectResponse

from app.auth import session_cookie_scheme, stytch_client
from app.schemas import Session
from app.settings import settings

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/login")
async def login():
    return RedirectResponse(
        f"https://test.stytch.com/v1/public/oauth/google/start?public_token={settings.STYTCH_PUBLIC_TOKEN}",
    )


@router.get("/callback")
async def callback(request: Request):
    token = request.query_params.get("token")

    if not token:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)

    res = await stytch_client.oauth.authenticate_async(
        token, session_duration_minutes=60
    )

    if res.status_code != status.HTTP_200_OK:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    request.session.update(
        {
            "stytch_session_token": res.session_token,
            "user_id": res.user.user_id,
            "first_name": res.user.name.first_name,
            "last_name": res.user.name.last_name,
            "emails": [e.email for e in res.user.emails],
        }
    )
    return RedirectResponse(settings.APP_HOST, status_code=status.HTTP_302_FOUND)


@router.get("/logout")
async def logout(request: Request):
    request.session.clear()
    return RedirectResponse(settings.APP_HOST, status_code=status.HTTP_302_FOUND)


@router.get(
    "/me",
    dependencies=[Security(session_cookie_scheme)],
    response_model=Session,
)
async def me(request: Request):
    return request.session
