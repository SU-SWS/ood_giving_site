import dotenv from 'dotenv';

dotenv.config();

const test = async () => {
  const appID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '';
  const key = process.env.ALGOLIA_TASK_KEY || '';
  const taskID = process.env.ALGOLIA_PROCESS_DATA_TASK_ID || '';

  console.log({
    context: process.env.CONTEXT,
    appID,
    key,
    taskID,
  });

  // Default empty 200
  return new Response();
};

export default test;
