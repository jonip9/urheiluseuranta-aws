import CognitoStack from './CognitoStack';
import DynamoDBStack from './DynamoDBStack';
import ApiStack from './ApiStack';

export default function main(app) {
  const dynamoDbStack = new DynamoDBStack(app, 'dynamodb');
  const cognitoStack = new CognitoStack(app, 'cognito');
  new ApiStack(app, 'api', dynamoDbStack.tables, cognitoStack.resources);
}
