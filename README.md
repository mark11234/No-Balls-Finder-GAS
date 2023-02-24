# No-Balls-Finder-GAS
Checks the BBC TMS RSS feed for No Balls episodes & sends an email if one was released today (the same as No-Balls-Podcast-Finder but using Google Apps Script).

## Google Apps Script set up
Create a new project at https://script.google.com/, save the `app.js` file & add a time trigger. Note the trigger duration should match that hardcoded as `CHECK_FREQUENCY_IN_MS` in `app.js`.

