**Environment variables — quick setup**

- **Local development**:
  - Copy `.env.example` to `.env.local` (or `.env`) and fill values:

    ```bash
    cp .env.example .env.local
    # edit .env.local and set real values
    ```

  - Vite loads `.env` files; local files should use `VITE_` prefix for any variables used in client code.
  - Start dev server: `npm run dev`.

- **Production & Preview (Vercel)**:
  1. Open https://vercel.com/dashboard and select your project.
  2. Go to **Settings → Environment Variables**.
  3. Add the same variable names (e.g. `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_PIN`) with their production values. Set the environment to `Production` (and `Preview` if needed).
  4. Trigger a redeploy (Deployments → Redeploy) or push a new commit.

- **GitHub Actions / CI**:
  - If you use GitHub Actions, store secrets under the repository Settings → Secrets → Actions and reference them in workflows.
  - Do NOT commit secret values into the repo.

- **Verify at runtime**:
  - In client code you can log values (for debugging only): `console.log(import.meta.env.VITE_SUPABASE_URL)`

- **Security note**: Any `VITE_` variable is embedded into the frontend bundle and visible to end users. Never put private keys or service-role secrets in `VITE_` variables. Use server-side environment variables for truly secret keys.
