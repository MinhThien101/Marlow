# Deploy steps (run these in Claude Code)

Repo: `C:\Users\minht\OneDrive\CLAUDE CODE\Marlow`

Already done in Cowork this session:
- Secrets verified gitignored: `.env`, `.env.*`, `API Key.txt`. Nothing committed yet, so no key rotation needed.
- Fake "Re-run research" timer killed. The Brand stage button now opens the real Connect editor (Studio -> FlowShell -> BrandStage).

## 1. Git + private GitHub repo

```
cd "C:\Users\minht\OneDrive\CLAUDE CODE\Marlow"
git init
git add .
git status
```

Before committing, read that `git status` output. Confirm **`API Key.txt` and `app/.env` are NOT listed**. If either shows up, stop and fix `.gitignore` first. (Optional: `marlow_v2.zip` and `marlow_v2/` look like a stale backup. Delete them before `git add` if you don't need them in the repo.)

```
git commit -m "Onboarding brand-voice upgrade + load-time fixes"
```

Create the private repo and push. With GitHub CLI:

```
gh auth status
gh repo create Marlow --private --source=. --remote=origin --push
```

No `gh`? Make an empty private repo named `Marlow` at github.com/new (no README, no gitignore), then:

```
git branch -M main
git remote add origin https://github.com/<your-username>/Marlow.git
git push -u origin main
```

## 2. Connect Netlify for auto-deploy

The site already exists (marlow-app.netlify.app) with env vars set. Link the existing site to the repo so push = deploy, which keeps your domain and variables:

- Netlify -> your Marlow site -> Site configuration -> Build & deploy -> Continuous deployment -> Link repository -> pick the GitHub `Marlow` repo.
- Build settings come from `netlify.toml` (base `app`, command `npm run build`, publish `dist`, functions `netlify/functions`). Leave them as-is.
- Under Environment variables, confirm these are present: `ANTHROPIC_API_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. They live in `app/.env` locally; Netlify needs its own copy or the AI functions and auth break in prod.

Trigger the first auto-build:

```
git commit --allow-empty -m "Trigger Netlify build"
git push
```

## 3. Verify after deploy

- Netlify deploy log shows the build succeeded.
- Open the site, DevTools -> Network: main JS bundle should be ~300-450KB, down from ~1.3MB.
- App loads to the branded splash right away, no multi-second blank screen.
- Brand screen -> Edit brand -> re-pull ARMPLIFY so the new research runs (it still shows the old generic defaults until you do).
- Generate the same campaign and compare copy to the before version.
- Click the Brand stage button: it should open the Connect editor, not the old fake progress timer.

## Optional: move the repo out of OneDrive

OneDrive and `.git` fight each other, which is the source of the sync lag. After the repo is pushed:

```
robocopy "C:\Users\minht\OneDrive\CLAUDE CODE\Marlow" "C:\dev\Marlow" /E /XD node_modules .netlify .git
cd "C:\dev\Marlow"
git clone https://github.com/<your-username>/Marlow.git temp && move temp\.git .git && rmdir /s /q temp
npm --prefix app install
```

Then work from `C:\dev\Marlow`. Your `app/.env` and `API Key.txt` copy over with robocopy, so AI functions keep working in local dev.
