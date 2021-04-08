import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export async function handler(event) {
  const userId = event.requestContext.authorizer.jwt.claims.sub;

  const results = await dynamoDb
    .query({
      TableName: process.env.tableName,
      IndexName: 'userId',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(results.Items),
    headers: { 'Content-Type': 'application/json' },
  };
}
