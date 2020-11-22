"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediumCdkConstruct = void 0;
const aws_events_1 = require("@aws-cdk/aws-events");
const targets = require("@aws-cdk/aws-events-targets");
const aws_lambda_1 = require("@aws-cdk/aws-lambda");
const aws_s3_1 = require("@aws-cdk/aws-s3");
const core_1 = require("@aws-cdk/core");
class MediumCdkConstruct extends core_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        const mediumPostsBucket = new aws_s3_1.Bucket(this, 'MediumPosts', {
            publicReadAccess: false
        });
        const mediumPostsFetchLambda = new aws_lambda_1.Function(this, 'MediumPostsFetcher', {
            code: aws_lambda_1.Code.fromAsset('lib/mediumPostsFetcherLambda'),
            handler: 'index.handler',
            runtime: aws_lambda_1.Runtime.NODEJS_12_X,
            timeout: core_1.Duration.seconds(30),
            environment: {
                BUCKET_NAME: mediumPostsBucket.bucketName,
                MEDIUM_USER: props.mediumUser,
                JSON_LOCATION: props.jsonLocation || 'medium/posts'
            }
        });
        mediumPostsBucket.grantReadWrite(mediumPostsFetchLambda);
        new aws_events_1.Rule(this, 'FetchMediumPostsEvent', {
            ruleName: 'FetchMediumPosts',
            description: 'Fetch Medium posts from RSS endpoint, parse that into json, and upload to s3 bucket.',
            enabled: true,
            schedule: props.updateSchedule || aws_events_1.Schedule.rate(core_1.Duration.hours(12)),
            targets: [new targets.LambdaFunction(mediumPostsFetchLambda)]
        });
    }
}
exports.MediumCdkConstruct = MediumCdkConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvREFBcUQ7QUFDckQsdURBQXVEO0FBQ3ZELG9EQUE4RDtBQUM5RCw0Q0FBeUM7QUFDekMsd0NBQW9EO0FBUXBELE1BQWEsa0JBQW1CLFNBQVEsZ0JBQVM7SUFDL0MsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUEyQjtRQUNuRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxlQUFNLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtZQUN4RCxnQkFBZ0IsRUFBRSxLQUFLO1NBQ3hCLENBQUMsQ0FBQztRQUVILE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxxQkFBUSxDQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRTtZQUN0RSxJQUFJLEVBQUUsaUJBQUksQ0FBQyxTQUFTLENBQUMsOEJBQThCLENBQUM7WUFDcEQsT0FBTyxFQUFFLGVBQWU7WUFDeEIsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztZQUM1QixPQUFPLEVBQUUsZUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDN0IsV0FBVyxFQUFFO2dCQUNYLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxVQUFVO2dCQUN6QyxXQUFXLEVBQUUsS0FBSyxDQUFDLFVBQVU7Z0JBQzdCLGFBQWEsRUFBRSxLQUFLLENBQUMsWUFBWSxJQUFJLGNBQWM7YUFDcEQ7U0FDRixDQUFDLENBQUE7UUFFRixpQkFBaUIsQ0FBQyxjQUFjLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtRQUV4RCxJQUFJLGlCQUFJLENBQUMsSUFBSSxFQUFFLHVCQUF1QixFQUFFO1lBQ3RDLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLHNGQUFzRjtZQUNuRyxPQUFPLEVBQUUsSUFBSTtZQUNiLFFBQVEsRUFBRSxLQUFLLENBQUMsY0FBYyxJQUFJLHFCQUFRLENBQUMsSUFBSSxDQUFDLGVBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbkUsT0FBTyxFQUFFLENBQUMsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLHNCQUFzQixDQUFDLENBQUM7U0FDOUQsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGO0FBOUJELGdEQThCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJ1bGUsIFNjaGVkdWxlIH0gZnJvbSAnQGF3cy1jZGsvYXdzLWV2ZW50cyc7XG5pbXBvcnQgKiBhcyB0YXJnZXRzIGZyb20gJ0Bhd3MtY2RrL2F3cy1ldmVudHMtdGFyZ2V0cyc7XG5pbXBvcnQgeyBDb2RlLCBGdW5jdGlvbiwgUnVudGltZSB9IGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgQnVja2V0IH0gZnJvbSAnQGF3cy1jZGsvYXdzLXMzJztcbmltcG9ydCB7IENvbnN0cnVjdCwgRHVyYXRpb24gfSBmcm9tICdAYXdzLWNkay9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBNZWRpdW1Qb3N0c0NvbnN0cnVjdCB7XG4gIHJlYWRvbmx5IG1lZGl1bVVzZXI6IHN0cmluZyxcbiAgcmVhZG9ubHkgdXBkYXRlU2NoZWR1bGU/OiBTY2hlZHVsZSxcbiAgcmVhZG9ubHkganNvbkxvY2F0aW9uPzogc3RyaW5nXG59XG5cbmV4cG9ydCBjbGFzcyBNZWRpdW1DZGtDb25zdHJ1Y3QgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogTWVkaXVtUG9zdHNDb25zdHJ1Y3QpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgY29uc3QgbWVkaXVtUG9zdHNCdWNrZXQgPSBuZXcgQnVja2V0KHRoaXMsICdNZWRpdW1Qb3N0cycsIHtcbiAgICAgIHB1YmxpY1JlYWRBY2Nlc3M6IGZhbHNlXG4gICAgfSk7XG5cbiAgICBjb25zdCBtZWRpdW1Qb3N0c0ZldGNoTGFtYmRhID0gbmV3IEZ1bmN0aW9uKHRoaXMsICdNZWRpdW1Qb3N0c0ZldGNoZXInLCB7XG4gICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldCgnbGliL21lZGl1bVBvc3RzRmV0Y2hlckxhbWJkYScpLFxuICAgICAgaGFuZGxlcjogJ2luZGV4LmhhbmRsZXInLFxuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAgIHRpbWVvdXQ6IER1cmF0aW9uLnNlY29uZHMoMzApLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgQlVDS0VUX05BTUU6IG1lZGl1bVBvc3RzQnVja2V0LmJ1Y2tldE5hbWUsXG4gICAgICAgIE1FRElVTV9VU0VSOiBwcm9wcy5tZWRpdW1Vc2VyLFxuICAgICAgICBKU09OX0xPQ0FUSU9OOiBwcm9wcy5qc29uTG9jYXRpb24gfHwgJ21lZGl1bS9wb3N0cydcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgbWVkaXVtUG9zdHNCdWNrZXQuZ3JhbnRSZWFkV3JpdGUobWVkaXVtUG9zdHNGZXRjaExhbWJkYSlcblxuICAgIG5ldyBSdWxlKHRoaXMsICdGZXRjaE1lZGl1bVBvc3RzRXZlbnQnLCB7XG4gICAgICBydWxlTmFtZTogJ0ZldGNoTWVkaXVtUG9zdHMnLFxuICAgICAgZGVzY3JpcHRpb246ICdGZXRjaCBNZWRpdW0gcG9zdHMgZnJvbSBSU1MgZW5kcG9pbnQsIHBhcnNlIHRoYXQgaW50byBqc29uLCBhbmQgdXBsb2FkIHRvIHMzIGJ1Y2tldC4nLFxuICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgIHNjaGVkdWxlOiBwcm9wcy51cGRhdGVTY2hlZHVsZSB8fCBTY2hlZHVsZS5yYXRlKER1cmF0aW9uLmhvdXJzKDEyKSksXG4gICAgICB0YXJnZXRzOiBbbmV3IHRhcmdldHMuTGFtYmRhRnVuY3Rpb24obWVkaXVtUG9zdHNGZXRjaExhbWJkYSldXG4gICAgfSlcbiAgfVxufVxuIl19