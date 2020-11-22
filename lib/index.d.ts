import { Schedule } from '@aws-cdk/aws-events';
import { Construct } from '@aws-cdk/core';
export interface MediumPostsConstruct {
    readonly mediumUser: string;
    readonly updateSchedule?: Schedule;
    readonly jsonLocation?: string;
}
export declare class MediumCdkConstruct extends Construct {
    constructor(scope: Construct, id: string, props: MediumPostsConstruct);
}
