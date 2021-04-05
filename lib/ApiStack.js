import * as cdk from '@aws-cdk/core';
import * as sst from '@serverless-stack/resources';

export default class ApiStack extends sst.Stack {
  constructor(scope, id, dbTables, props) {
    super(scope, id, props);

    // Create the HTTP API
    const api = new sst.Api(this, 'Api', {
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

    // Show API endpoint in output
    new cdk.CfnOutput(this, 'ApiEndpoint', {
      value: api.httpApi.apiEndpoint,
    });
  }
}
