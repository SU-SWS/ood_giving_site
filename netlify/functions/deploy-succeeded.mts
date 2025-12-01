import dotenv from 'dotenv';
import { algoliasearch } from 'algoliasearch';

dotenv.config();

const deploySucceeded = async () => {
  const appID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '';
  const key = process.env.ALGOLIA_TASK_KEY || '';
  const taskID = process.env.ALGOLIA_PROCESS_DATA_TASK_ID || '';

  // Only trigger for prod deploy
  if (process.env.CONTEXT !== 'production') {
    return new Response();
  }

  try {
    if (!appID || !key || !taskID) {
      throw(new Error('Missing prerequisites.'));
    }

    // Trigger processing task in Algolia
    const client = algoliasearch(appID, key).initIngestion({ region: 'us' });
    await client.runTask({ taskID });
    console.log('[Algolia] Successfully triggered content indexing task');
  } catch(err) {
    console.error('[Algolia] Failed to trigger indexing task:', err);
  }

  // Default empty 200
  return new Response();
};

export default deploySucceeded;
