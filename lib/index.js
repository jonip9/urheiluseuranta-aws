import CognitoStack from './CognitoStack';
import DynamoDBStack from './DynamoDBStack';
import ApiStack from './ApiStack';

export default function main(app) {
  new ApiStack(app, 'api');
  new DynamoDBStack(app, 'dynamodb');
  new CognitoStack(app, 'cognito');
}
