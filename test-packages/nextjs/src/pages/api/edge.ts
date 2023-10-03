import { NextResponse } from 'next/server'

import * as stytch from 'stytch'

const client = new stytch.Client({
  // Find these values at https://stytch.com/dashboard/api-keys
  // These ones are MADE UP!
  project_id: "project-live-c60c0abe-c25a-4472-a9ed-320c6667d317",
  secret: "secret-live-80JASucyk7z_G8Z-7dVwZVGXL5NT_qGAQ2I=",
});

export const config = {
  runtime: 'edge',
}

export default async function GET() {
  const authenticateResponse = await client.sessions.authenticate({
    session_token: "WJtR5BCy38Szd5AfoDpf0iqFKEt4EE5JhjlWUY7l3FtY",
  }).catch(err => err);

  return new NextResponse(JSON.stringify(authenticateResponse), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
