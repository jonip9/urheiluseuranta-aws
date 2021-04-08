import * as cdk from '@aws-cdk/core';
import * as apigwAuthorizers from '@aws-cdk/aws-apigatewayv2-authorizers';
import * as sst from '@serverless-stack/resources';

export default class ApiStack extends sst.Stack {
  constructor(scope, id, dbTables, cognitoRes, props) {
    super(scope, id, props);

    const { userPool, userPoolClient } = cognitoRes;

    const api = new sst.Api(this, 'Api', {
      defaultAuthorizer: new apigwAuthorizers.HttpUserPoolAuthorizer({
        userPool,
        userPoolClient,
      }),
      defaultAuthorizationType: sst.ApiAuthorizationType.JWT,
      defaultFunctionProps: {
        environment: {
          tableName: dbTables.event.tableName,
        }
      },
      routes: {
        'POST /event/add': 'src/add.handler',
        'POST /event/modify/{id}': 'src/modify.handler',
        'POST /event/delete/{id}': 'src/delete.handler',
        'GET /event/get': 'src/getAll.handler',
        'GET /event/get/{id}': 'src/getById.handler',
      },
    });

    api.attachPermissions([dbTables.event]);

    new cdk.CfnOutput(this, 'ApiEndpoint', {
      value: api.httpApi.apiEndpoint,
    });
  }
}
