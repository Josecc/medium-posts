![Publish CDK packages](https://github.com/Josecc/medium-posts/workflows/Publish%20CDK%20packages/badge.svg)

# JSON Medium Posts

This is all you need to stand up your own infrastructure to get medium RSS posts and transform them into JSON.

This sets up a cloudwatch event that triggers a lambda to fetch the provided medium user's posts through RSS and converthem into JSON and finally upload them to an s3 bucket.

You can then just use this s3 bucket with cloudfront to access your posts -- updated by the rate you give.

### Examples