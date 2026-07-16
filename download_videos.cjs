const https = require('https');
const fs = require('fs');

const download = (url, dest) => {
  const file = fs.createWriteStream(dest);
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Referer': 'https://mixkit.co/'
    }
  };
  https.get(url, options, function(response) {
    if (response.statusCode === 200) {
      response.pipe(file);
      file.on('finish', function() {
        file.close();  // close() is async, call cb after close completes.
        console.log(`Downloaded ${dest}`);
      });
    } else {
      console.error(`Failed to download ${dest}: ${response.statusCode}`);
      console.error(response.headers);
    }
  }).on('error', function(err) {
    fs.unlink(dest, () => {});
    console.error(err.message);
  });
};

download('https://assets.mixkit.co/videos/preview/mixkit-burger-and-fries-on-a-table-4482-large.mp4', 'public/assets/promos/home-banner.mp4');
download('https://assets.mixkit.co/videos/preview/mixkit-preparing-a-hamburger-with-fries-4481-large.mp4', 'public/assets/promos/promo-banner.mp4');
