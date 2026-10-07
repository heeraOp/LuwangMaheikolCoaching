# Luwang Maheikol Coaching Website + Google Apps Script Backend

Production-oriented React + TypeScript + Vite frontend for **Luwang Maheikol Coaching Cum Hostel**, with a functional Google Apps Script backend that provisions the complete Google Drive/Sheets structure from one setup function.

## Architecture

```text
React + TypeScript
        |
        | JSON POST
        v
Google Apps Script Web App
        |
        +---- Google Sheets
        |       |- CoachingInfo
        |       |- Courses
        |       |- Notices
        |       |- Materials
        |       |- Gallery
        |       |- Videos
        |       |- Enquiries
        |       |- ActivityLogs
        |       `- Users
        |
        `---- Google Drive
                LuwangMaheikol/
                |- 01_SHEETS/
                |- 02_MEDIA_LINKS/
                `- 03_MEDIA/
                   |- Photos/
                   |  |- Gallery/
                   |  |- Courses/
                   |  `- Notices/
                   |- Videos/
                   |  `- Lectures/
                   `- Documents/
                      |- Study Materials/
                      `- Notice Attachments/
```

## Important: one-time Apps Script setup

The Apps Script backend is in `../apps_script/Code.gs`.

1. In Google Drive, make sure you have **My Drive/LuwangMaheikol**. If it does not exist, the script creates it.
2. Open **Google Apps Script** and create a standalone project.
3. Copy `apps_script/Code.gs` into `Code.gs`.
4. Copy `apps_script/appsscript.json` into the Apps Script manifest if you want the included settings.
5. Run **`setupCoachingSystem()` once** from the Apps Script editor.
6. Approve the Drive/Sheets permissions.
7. The function creates the folders, two spreadsheets, all required sheets/headers, demo records, and the demo teacher account.
8. Deploy the script as a **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
9. Copy the deployment URL ending in `/exec`.
10. Create `.env.local` in the frontend from `.env.example`:

```text
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

11. Start the frontend:

```bash
npm install
npm run dev
```

## Demo login created by setup

```text
Username: teacher
Password: demo123
```

Change the password/hash or replace the user in the **Users** sheet after setup.

## Public navigation

- Home
- About
- Courses
- Study Materials
- Video Lectures
- Gallery
- Notices
- Contact
- About Centre / Coaching Info
- Enquiry

## Teacher / Admin

- Dashboard
- Courses
- Notices
- Study Materials
- Video Lectures
- Gallery
- Student Enquiries
- Activity Logs
- Centre Info

## Data model

**Google Sheets stores metadata**, not large binary files. Google Drive stores PDFs, images and optional small video uploads. The sheet keeps IDs/URLs and publication state.

### Video lectures

For large videos, use a Google Drive or YouTube URL. The portal also supports small direct browser uploads; Apps Script request size and execution limits make direct large-video uploads unsuitable.

### File uploads

- Gallery images: recommended <= 10 MB
- Study material files: recommended <= 15 MB
- Direct videos: recommended <= 20 MB
- Large lectures: upload to Drive separately and paste the Drive URL in the teacher portal

## Security model

- Teacher passwords are stored as SHA-256(password + salt), not plaintext.
- Sessions use random tokens stored in Apps Script CacheService.
- Authenticated actions require a valid session token.
- Public actions expose only published records.
- Uploaded media is made link-viewable so the public website can display it. If your Google Workspace policy prevents public links, adjust sharing or use another public asset host.

## Local development

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Deployment

The frontend can be deployed to Netlify, Vercel, GitHub Pages, or another static host. The Apps Script Web App remains the backend.

For GitHub Pages with a repository subpath, configure the Vite `base` and React Router `basename` to match the repository path.
