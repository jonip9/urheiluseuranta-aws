import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const dynamoDb = new DynamoDB.DocumentClient();

export async function handler(event) {
  const { date, sport, duration, distance, comment } = JSON.parse(event.body);
  const userId = event.requestContext.authorizer.jwt.claims.sub;

  const itemForDb = {
    eventId: uuidv4(),
    userId,
    date,
    sport,
    duration,
    distance,
    comment,
  };

  await dynamoDb
    .put({
      TableName: process.env.tableName,
      Item: itemForDb,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(itemForDb),
    headers: { 'Content-Type': 'application/json' },
  };
}
