// Please read the comments to learn more about the Netlify Build plugin syntax.
// Find more information in the Netlify documentation.
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const vaultReq = require('node-vault');

/* eslint-disable no-unused-vars */
module.exports = {
  async onPreBuild({
    inputs,
    // Core utilities
    utils: { build, status },
  }) {
    // Vault client config options.
    const options = {
      apiVersion: 'v1',
      endpoint: inputs.endpoint,
    };

    // Need some environment variables to run.
    dotenv.config();

    // Initialize the vault client with the config options.
    const vault = vaultReq(options);

    // Overwrite existing secrets.
    const overwrite = process.env.VAULT_OVERWRITE || false;
    console.log(
      `Overwrite existing secrets was set to: ${overwrite.toString()}`
    );

    console.log(inputs)

    // Login credentials config object.
    const credentials = {
      secret_id: process.env[inputs.secretId],
      role_id: process.env[inputs.roleId],
    };

    try {
      await vault.approleLogin(credentials);
      console.log('Logged in to Vault Successfully');
    } catch (err) {
      build.failBuild('Failed to authenticate to vault', { err });
    }

    let secrets = {};

    console.log('Fetching vault secrets and adding to env...');
    await Promise.all(
      inputs.secrets.map(async (vaultPath) => {
        try {
          console.log(`Fetching secret from ${vaultPath}`);
          const secret = await vault.read(vaultPath);
          secrets = { ...secrets, ...secret.data.data };
          console.log(`Successfully fetched secret from ${vaultPath}`);
        } catch (err) {
          build.failBuild('Failed to fetch secret paths from vault', { err });
        }
      })
    );

    // Store the secrets to write to the .env file.
    const secretsToWrite = [];

    // Create an array of things to write to the env file.
    Object.keys(secrets).forEach((key) => {
      if (!process.env[key] || overwrite) {
        console.log(`Adding ${key} to env`);
        secretsToWrite.push(`${key}=${JSON.stringify(secrets[key])}`);
      }
    });

    let existingSecrets = '';
    const envFilePath = path.resolve(process.cwd(), '.env');
    console.log(`Environment file path: ${envFilePath}`);

    // Read existing env file.
    try {
      existingSecrets = fs.readFileSync(envFilePath).toString();
    } catch (err) {
      // Don't fail when no .env file already
    }

    // Write new env file.
    const vaultSecretsString = secretsToWrite.join('\n');
    const allSecretsString = `${existingSecrets}\n${vaultSecretsString}`;
    fs.writeFileSync(envFilePath, allSecretsString);

    // Put the new vars back into the env.
    dotenv.config();

    // Display success information
    status.show({
      summary: `Added environment variables from vault to .env`,
    });
  },
};
