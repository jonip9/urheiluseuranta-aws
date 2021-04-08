import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export async function handler(event) {
  const eventId = event.pathParameters.id;

  const result = await dynamoDb
    .get({
      TableName: process.env.tableName,
      Key: {
        eventId,
      },
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(result.Item),
    headers: { 'Content-Type': 'application/json' },
  };
}
