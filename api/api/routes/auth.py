from fastapi import APIRouter, HTTPException, Request, status
from fastapi.responses import RedirectResponse

from api.auth import stytch_client
from api.settings import settings

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

    request.session["stytch_session_token"] = res.session_token
    return RedirectResponse("/", status_code=status.HTTP_303_SEE_OTHER)


@router.get("/logout")
async def logout(request: Request):
    request.session.pop("stytch_session_token", None)
    return RedirectResponse("/", status_code=status.HTTP_302_FOUND)
