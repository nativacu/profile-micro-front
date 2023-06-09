const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "remoteapp2",
    // publicPath: "http://localhost:4203/",
    publicPath: "https://capable-puffpuff-7fd394.netlify.app/",
    scriptType: "text/javascript",
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
      library: { type: "module" },

      // For remotes (please adjust)
      name: "remoteapp2",
      filename: "remoteEntry.js",
      exposes: {
        './ProfileModule': './/src/app/profile/profile.module.ts'
      },


      shared: share({
        "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/animations": { singleton: true, strictVersion: true, requiredVersion: 'auto'},
        "@angular/platform-browser": { singleton: true, strictVersion: true, requiredVersion: 'auto'},
        "@angular/platform-browser-dynamic": { singleton: true, strictVersion: true, requiredVersion: 'auto'},
        "@angular/material": { singleton: true, strictVersion: true, requiredVersion: 'auto'},

        ...sharedMappings.getDescriptors()
      })

    }),
    sharedMappings.getPlugin()
  ],
};
