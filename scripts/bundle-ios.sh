CLI_PATH=./node_modules/react-native/local-cli/cli.js

INTEGRATION_MODULE_IOS=../tiniapp-sdk-ios/Rescources
IOS_BUNDLE_NAME=tiniapp-runtime.jsbundle

if [ -d "${INTEGRATION_MODULE_IOS}" ]; then
  rm -rf $INTEGRATION_MODULE_IOS
fi
mkdir $INTEGRATION_MODULE_IOS

# iOS
node $CLI_PATH ram-bundle \
  --entry-file ./index.js \
  --platform ios \
  --dev false \
  --bundle-output $INTEGRATION_MODULE_IOS/$IOS_BUNDLE_NAME \
  --assets-dest $INTEGRATION_MODULE_IOS
