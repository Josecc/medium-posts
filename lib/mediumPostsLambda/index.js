exports.handler = (event, context, callback) => {
    const feed = require('rss-parser');

    const options = {
      customFields: {
        item: [
          ['content:encoded', 'content']
        ]
      }
    }
    feed.parseURL(`https://medium.com/feed/${process.env.MEDIUM_USER}`, options, (err, rss) => {
      if (err)
        return callback(err);

      // Load the AWS SDK for Node.js
      var AWS = require('aws-sdk');
      // Set the region 
      AWS.config.update({region: 'us-east-1'});

      // Create S3 service object
      s3 = new AWS.S3({apiVersion: '2006-03-01'});
      s3.upload({
        Bucket: process.env.BUCKET_NAME,
          Key: process.env.JSON_LOCATION,
          Body: JSON.stringify(rss.feed.entries),
          ContentType: 'application/json',
          ACL: "public-read",
      }, (err, data) => err? callback(err) : callback(null, data));
  });
}
  