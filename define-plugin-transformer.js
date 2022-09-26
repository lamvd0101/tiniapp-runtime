var semver = require('semver');
var fs = require('fs');

var upstreamTransformer = null;

var reactNativeVersionString = require('react-native/package.json').version;
var reactNativeMinorVersion = semver(reactNativeVersionString).minor;

if (reactNativeMinorVersion >= 59) {
  upstreamTransformer = require('metro-react-native-babel-transformer');
} else if (reactNativeMinorVersion >= 56) {
  upstreamTransformer = require('metro/src/reactNativeTransformer');
} else if (reactNativeMinorVersion >= 52) {
  upstreamTransformer = require('metro/src/transformer');
} else if (reactNativeMinorVersion >= 47) {
  upstreamTransformer = require('metro-bundler/src/transformer');
} else if (reactNativeMinorVersion === 46) {
  upstreamTransformer = require('metro-bundler/build/transformer');
} else {
  // handle RN <= 0.45
  var oldUpstreamTransformer = require('react-native/packager/transformer');
  upstreamTransformer = {
    transform({src, filename, options}) {
      return oldUpstreamTransformer.transform(src, filename, options);
    },
  };
}

// var svgTransformer = require('react-native-svg-transformer');

module.exports.transform = function (src, filename, options) {
  if (typeof src === 'object') {
    // handle RN >= 0.46
    ({src, filename, options} = src);
  }

  // if (filename.endsWith('.svg') || filename.endsWith('.svgx')) {
  //   return svgTransformer.transform({src, filename, options});
  // }

  const packageJson = JSON.parse(fs.readFileSync('package.json'));
  const runtimeVersion = packageJson.dependencies['@hoangviet/tf-miniapp-core'];
  const modifiedSrc = src.replace(
    new RegExp('__TF_RUNTIME_VERSION__', 'g'),
    JSON.stringify(runtimeVersion),
  );
  return upstreamTransformer.transform({src: modifiedSrc, filename, options});
};
