import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export async function handler(event) {
  const eventId = event.pathParameters.id;

  await dynamoDb
    .delete({
      TableName: process.env.tableName,
      Key: {
        eventId,
      },
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ deletedItem: eventId }),
    headers: { 'Content-Type': 'application/json' },
  };
}
