export const getLoginUrl = () => {
  const loginHost = `${import.meta.env.VITE_PUBLIC_KINDE_HOST}`;

  const state = "";
  const code_challenge = "";

  const loginParams = new URLSearchParams({
    response_type: "code",
    client_id: import.meta.env.VITE_PUBLIC_KINDE_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_PUBLIC_KINDE_REDIRECT_URL,
    scope: "openid profile email",
    code_challenge_method: "RS256",
    state,
    code_challenge,
  });

  return `${loginHost}/oauth2/authorize?${loginParams.toString()}`;
};
