import CognitoStack from './CognitoStack';
import MyStack from './MyStack';

export default function main(app) {
  new MyStack(app, 'my-stack');
  new CognitoStack(app, 'cognito');
}
