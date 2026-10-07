# Integration checklist

## Apps Script
- `apps_script/Code.gs` is the backend.
- `apps_script/appsscript.json` is the manifest.
- Existing `/exec` URL can be preserved by updating the existing Web App deployment to a new version.

## Frontend
- `src/services/api.ts` is the only API transport layer.
- `src/services/fallback.ts` contains immediate public demo data.
- `src/context.tsx` renders fallback data immediately and refreshes live data in the background.
- `src/services/media.ts` derives YouTube/Drive thumbnails.

## Content ownership
- Home/About/Contact identity and highlight content is managed in Teacher → Centre Info.
- Courses, Notices, Materials, Gallery and Video Lectures are managed in their corresponding teacher sections.
- Public `/coaching-info` redirects to `/about` to prevent duplicated About content.
