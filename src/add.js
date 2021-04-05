import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export async function handler(event, context) {
  console.log('event: ', event);
  console.log('context :', context);
  const data = JSON.parse(event.body);

  await dynamoDb
    .put({
      TableName: process.env.tableName,
      Item: {},
    })
    .promise();

  return {
    statusCode: 200,
    body: 'Hello World!',
    headers: { 'Content-Type': 'text/plain' },
  };
}
