import { appendFileSync } from 'fs';

export async function onPostBuild({ inputs, utils: { build, status } }) {
  const contextMatch = inputs.context.includes(process.env.CONTEXT);
  const branchMatch = inputs.branch
    ? inputs.branch === process.env.BRANCH
    : true;

  // Correct build context?
  if (contextMatch && branchMatch) {
    try {
      // Add basic auth headers
      appendFileSync(
        inputs.file,
        `\n${inputs.path}\n  Basic-Auth: ${inputs.username}:${inputs.password}`);
    } catch (error) {
      // Report a user error
      build.failBuild('Error message', { error });
    }

    // Display success information
    console.log(
      `[Contextual Auth Plugin] Added basic auth "${inputs.username}" for path "${inputs.path}"`);
    status.show({ summary: 'Success!' });
  }
}
