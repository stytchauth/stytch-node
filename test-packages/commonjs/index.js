const stytch = require("stytch");

function env(name) {
  const val = process.env[name];
  if (val) {
    return val;
  }
  throw new Error("Missing required environment variable: " + name);
}

const client = new stytch.Client({
  // Find these values at https://stytch.com/dashboard/api-keys
  project_id: env("PROJECT_ID"),
  secret: env("SECRET"),
  env: stytch.envs.test,
});

client.magicLinks.email
  .loginOrCreate({
    email: "sandbox@stytch.com",
    // Configure these URLs at https://stytch.com/dashboard/magic-link-urls
    login_magic_link_url: "http://localhost:8000/login",
    signup_magic_link_url: "http://localhost:8000/signup",
  })
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

client.magicLinks
  .authenticate("DOYoip3rvIMMW5lgItikFK-Ak1CfMsgjuiCyI7uuU94=") // Token from email
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
