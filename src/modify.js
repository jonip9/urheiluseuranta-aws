import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export async function handler(event) {
  const { date, sport, duration, distance, comment } = JSON.parse(event.body);
  const eventId = event.pathParameters.id;

  const result = await dynamoDb
    .update({
      TableName: process.env.tableName,
      Key: {
        eventId,
      },
      UpdateExpression:
        'SET #date = :date, sport = :sport, #duration = :duration, distance = :distance, #comment = :comment',
      ExpressionAttributeNames: {
        '#date': 'date',
        '#duration': 'duration',
        '#comment': 'comment',
      },
      ExpressionAttributeValues: {
        ':date': date,
        ':sport': sport,
        ':duration': duration,
        ':distance': distance,
        ':comment': comment,
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
