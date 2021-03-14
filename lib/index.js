import CognitoStack from './CognitoStack';
import DynamoDBStack from './DynamoDBStack';
import MyStack from './MyStack';

export default function main(app) {
  new MyStack(app, 'my-stack');
  new DynamoDBStack(app, 'dynamodb');
  new CognitoStack(app, 'cognito');
}
