import { Rule, Schedule } from '@aws-cdk/aws-events';
import * as targets from '@aws-cdk/aws-events-targets';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import { Bucket } from '@aws-cdk/aws-s3';
import { Construct, Duration } from '@aws-cdk/core';

export interface MediumPostsConstruct {
  readonly mediumUser: string,
  readonly updateSchedule?: Schedule,
  readonly jsonLocation?: string
}

export class MediumCdkConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MediumPostsConstruct) {
    super(scope, id);

    const mediumPostsBucket = new Bucket(this, 'MediumPosts', {
      publicReadAccess: false
    });

    const mediumPostsFetchLambda = new Function(this, 'MediumPostsFetcher', {
      code: Code.fromAsset('lib/mediumPostsFetcherLambda'),
      handler: 'index.handler',
      runtime: Runtime.NODEJS_12_X,
      timeout: Duration.seconds(30),
      environment: {
        BUCKET_NAME: mediumPostsBucket.bucketName,
        MEDIUM_USER: props.mediumUser,
        JSON_LOCATION: props.jsonLocation || 'medium/posts'
      }
    })

    mediumPostsBucket.grantReadWrite(mediumPostsFetchLambda)

    new Rule(this, 'FetchMediumPostsEvent', {
      ruleName: 'FetchMediumPosts',
      description: 'Fetch Medium posts from RSS endpoint, parse that into json, and upload to s3 bucket.',
      enabled: true,
      schedule: props.updateSchedule || Schedule.rate(Duration.hours(12)),
      targets: [new targets.LambdaFunction(mediumPostsFetchLambda)]
    })
  }
}
