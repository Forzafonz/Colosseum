require('dotenv').config()
const user_api = process.env.YOUTUBE_KEY
const {google} = require('googleapis'),
    youtubeV3 = google.youtube( { version: 'v3', auth: user_api } );

module.exports = function(router) { 

  
  router.get('/:search', (req,res) => {

    const searchString = req.params.search;
    const request =  youtubeV3.search.list({
      part: 'snippet',
      type: 'video',
      q: `${searchString}`,
      maxResults: 3
  }, (err,response) => {
    res
    .status(200)
    .json(response.data.items)
  });

  });
  return router;

}
