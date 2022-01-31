/**
 * Execute the plugin as a script.
 */

const toml = require('toml');
const fs = require('fs');
const path = require('path');
const { onPreBuild } = require('./index');

// Fake method for passing into the plugin part 1.
const build = {
  failBuild: (message) => {
    console.error(message);
    process.exit(1);
  }
}

// Fake method for passing into the plugin part 2.
const status = {
  show: (message) => {
    console.log(message.summary);
  }
}

/**
 * Run the plugin as a script.
 */
const main = async () => {
  const tomlPath = path.resolve(process.cwd(), 'netlify.toml');
  console.log(`Toml file path: ${tomlPath}`);

  const tomlString = fs.readFileSync(tomlPath, 'utf8');
  const tomlData = toml.parse(tomlString);

  // Find the plugin config.
  const pluginConfig = tomlData.plugins.find((element) => {
    if (element.package.includes('netlify-plugin-vault-variables')) {
      return true;
    }
  });

  // No config???
  if (!pluginConfig) {
    console.error('No plugin config found.');
    process.exit(1);
  }

  // Signature required to run the plugin.
  const pluginSignature = {
    inputs: pluginConfig.inputs,
    // Core utilities
    utils: { build, status },
  };

  // Run the plugin.
  onPreBuild(pluginSignature);
}

// Run.
main();
