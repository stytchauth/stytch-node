import * as stytch from "stytch";

export function doStytchRequest(): Promise<void> {
  // Find these values at https://stytch.com/dashboard/api-keys
  // These ones will trigger a well-known erorr message
  return new stytch.Client({
    project_id: "project-live-c60c0abe-c25a-4472-a9ed-320c6667d317",
    secret: "secret-live-80JASucyk7z_G8Z-7dVwZVGXL5NT_qGAQ2I=",
  }).magicLinks
    .authenticate({
      session_token: "WJtR5BCy38Szd5AfoDpf0iqFKEt4EE5JhjlWUY7l3FtY",
    })
    .catch((err: unknown) => console.log(JSON.stringify(err)));
}

doStytchRequest();
