// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import * as stytch from "stytch";

const client = new stytch.Client({
  // Find these values at https://stytch.com/dashboard/api-keys
  // These ones will trigger a well-known erorr message
  project_id: "project-live-c60c0abe-c25a-4472-a9ed-320c6667d317",
  secret: "secret-live-80JASucyk7z_G8Z-7dVwZVGXL5NT_qGAQ2I=",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authenticateResponse = await client.sessions
    .authenticate({
      session_token: "WJtR5BCy38Szd5AfoDpf0iqFKEt4EE5JhjlWUY7l3FtY",
    })
    .catch((err) => err);
  res.status(200).json(authenticateResponse);
}
