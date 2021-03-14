import { CfnOutput } from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';
import * as sst from '@serverless-stack/resources';

export default class CognitoStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(this, 'UserPool', {
      selfSignUpEnabled: true,
      signInAliases: { email: true },
    });

    const userPoolClient = new cognito.UserPoolClient(this, 'UserPoolClient', {
      userPool,
      generateSecret: true,
    });

    new CfnOutput(this, 'UserPoolId', {
      value: userPool.userPoolId,
    });

    new CfnOutput(this, 'UserPoolClientId', {
      value: userPoolClient.userPoolClientId,
    });
  }
}
