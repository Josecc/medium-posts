Fetch a user's medium posts from their RSS feed, convert it to JSON, and post to an Amazon AWS S3 Bucket.

![Publish](https://github.com/Josecc/medium-posts/workflows/Publish/badge.svg)

---

# JSON Medium Posts

This is all you need to stand up your own infrastructure to get medium RSS posts, transform them into JSON, and upload to an S3 Bucket. All the code that is needed is this:

```
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { MediumCdkConstruct } from '@canahui/medium-posts';

export class MediumCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new MediumCdkConstruct(this, 'JoseMediumBlogPostsJSON', {
      mediumUser: '@josecanahui'
    })
  }
}
```

With default options, the lambda will run every 12 hours and upload the json-parsed `rss.feed.entries` to a new s3 bucket with the key `medium/posts`. It will have public read rights for that file. You can then set it as an origin for a cloudfront distribution and cache it if you wish. 

## Options

The `MediumCdkConstruct` accepts the following props when initializing:

| name | required | default | description |
|---|---|---|---|
| mediumUser | yes | N/A | The Medium user's RSS feed you want to target. Eg. `@josecanahui`. |
| updateSchedule | no | 12 hours | How often to fetch the RSS, convert, and upload to s3. |
| jsonLocation | no | 'medium/posts' | The s3 key of where to put your generated JSON. |

## Details

This is a [CDK Construct](https://docs.aws.amazon.com/cdk/latest/guide/constructs.html) meaning you need to have an AWS account configured to run. Follow [these instructions](https://docs.aws.amazon.com/cdk/latest/guide/hello_world.html) to get started.