import { message } from 'antd';

const handleError = (error) => {
  if (error instanceof Object) {
    for (const field in error) {
      message.error(error[field]);
    }
  } else {
    message.error(error);
  }
}

export default handleError;
