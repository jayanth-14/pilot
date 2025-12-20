export function requireEnv(name) {
  const value = Deno.env.get(name);
  if (!value) {
    console.error(`Missing required env var: ${name}`);
    Deno.exit(1);
  }
  return value;
}

