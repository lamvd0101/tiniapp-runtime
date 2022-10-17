const fs = require('fs-extra');

const outputPath = './android/SDKOutput/projects';

fs.remove(outputPath);

const config =
  require('@react-native-community/cli/build/tools/config/index').default();

const dependencies = config.dependencies;
const project = config.project.android;

if (!project) {
  throw new Error('Project does not exist!');
}

for (const name in dependencies) {
  // if (dependencies.hasOwnProperty(name)) {
  //   const value = dependencies[name];
  //   const platformsConfig = value.platforms;
  //   const androidConfig = platformsConfig.android;

  //   if (androidConfig && androidConfig.sourceDir) {
  //     const libName = name.replace(/@|\//gi, '_');
  //     fs.copy(androidConfig.sourceDir, `${outputPath}/${libName}`);
  //     console.log(`Copy lib: ${libName}`);
  //   }
  // }
}
