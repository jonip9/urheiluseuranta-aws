import { CfnOutput } from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as sst from '@serverless-stack/resources';

export default class DynamoDBStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const app = this.node.root;

    const eventTable = new dynamodb.Table(this, 'EventTable', {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'eventId', type: dynamodb.AttributeType.STRING },
    });

    new CfnOutput(this, 'EventTableName', {
      value: eventTable.tableName,
      exportName: app.logicalPrefixedName('EventTableName'),
    });

    new CfnOutput(this, 'EventTableArn', {
      value: eventTable.tableArn,
      exportName: app.logicalPrefixedName('EventTableArn'),
    });
  }
}
