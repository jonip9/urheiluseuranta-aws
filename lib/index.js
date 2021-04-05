import CognitoStack from './CognitoStack';
import DynamoDBStack from './DynamoDBStack';
import ApiStack from './ApiStack';

export default function main(app) {
  const dynamoDbStack = new DynamoDBStack(app, 'dynamodb');
  new ApiStack(app, 'api', dynamoDbStack.tables);
  new CognitoStack(app, 'cognito');
}
