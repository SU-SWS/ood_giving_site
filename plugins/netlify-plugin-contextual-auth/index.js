const fs = require('fs');

module.exports = {
  async onPostBuild({ inputs, utils: { build, status } }) {
    const contextMatch = inputs.context.includes(process.env.CONTEXT);
    const branchMatch = inputs.branch
      ? inputs.branch === process.env.BRANCH
      : true;

    // Correct build context?
    if (contextMatch && branchMatch) {
      try {
        // Add basic auth headers
        fs.appendFileSync(
          inputs.file,
          `\n${inputs.path}\n  Basic-Auth: ${inputs.username}:${inputs.password}`,
        );
      } catch (error) {
        // Report a user error
        build.failBuild('Error message', { error });
      }

      // Display success information
      console.log(
        `Added basic auth "${inputs.username}:${inputs.password} for path "${inputs.path}""`,
      );
      status.show({ summary: 'Success!' });
    }
  },
};
