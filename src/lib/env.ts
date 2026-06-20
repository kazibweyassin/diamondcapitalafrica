const required = ["DATABASE_URL", "AUTH_SECRET", "ADMIN_EMAIL", "ADMIN_PASSWORD"] as const;

export function validateEnv() {
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}