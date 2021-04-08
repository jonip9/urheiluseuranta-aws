import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export async function handler(event) {
  // const { sport, date, duration, distance, comment } = JSON.parse(event.body);
  const eventId = event.pathParameters.id;

  const result = await dynamoDb
    .update({
      TableName: process.env.tableName,
      Key: {
        eventId,
      },
      UpdateExpression: '',
      ExpressionAttributeValues: {
        '': '',
      },
      ReturnValues: 'ALL_NEW',
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(result.Attributes),
    headers: { 'Content-Type': 'application/json' },
  };
}
