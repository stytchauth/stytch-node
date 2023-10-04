import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import * as stytch from "stytch";
import { json } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const client = new stytch.Client({
    // Find these values at https://stytch.com/dashboard/api-keys
    // These ones are MADE UP!
    project_id: "project-live-c60c0abe-c25a-4472-a9ed-320c6667d317",
    secret: "secret-live-80JASucyk7z_G8Z-7dVwZVGXL5NT_qGAQ2I=",
  });

  const sessionsAuthenticateResponse = await client.sessions
    .authenticate({
      session_token: "WJtR5BCy38Szd5AfoDpf0iqFKEt4EE5JhjlWUY7l3FtY",
    })
    .catch((err) => err);

  return json(sessionsAuthenticateResponse);
}

export default function _index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <code>{JSON.stringify(data)}</code>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
