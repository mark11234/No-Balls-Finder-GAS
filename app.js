const TMS_RSS_FEED_LINK = 'https://podcasts.files.bbci.co.uk/p02nrsl2.rss';
const NO_BALLS_SEARCH_TERM = 'No Balls: The Cricket Podcast';
const CHECK_FREQUENCY_IN_MS = 1000 * 60 * 60; // Hourly checking - should be the same interval as the trigger
const RECIEVER_EMAIL_ADDRESS = 'email@example.com';

function checkForPodcast() {
  var xml = UrlFetchApp.fetch(TMS_RSS_FEED_LINK).getContentText();
  var doc = XmlService.parse(xml);
  var root = doc.getRootElement();
  var channel = root.getChild('channel');
  var items = channel.getChildren('item');
  
  items.forEach(item => {
    item.getChild('title').getText().includes(NO_BALLS_SEARCH_TERM)
      && new Date().getTime() - Date.parse(item.getChild('pubDate')?.getText().toString() ?? '' ) <= CHECK_FREQUENCY_IN_MS
      && sendNoBallsEmail(item.getChild('title').getText(), item.getChild('description')?.getText() ?? '');
  });
}

function sendNoBallsEmail(title, description) {
  MailApp.sendEmail({
    to: RECIEVER_EMAIL_ADDRESS,
    subject: `${title}`,
    body: `A new No Balls episode is now available`,
    htmlBody: `<p>New <a href="https://podcasts.apple.com/gb/podcast/test-match-special/id205892240">No Balls: The Cricket Podcast</a>
            episode now available!</p>
            <p>${description}</p>`
  });
}
