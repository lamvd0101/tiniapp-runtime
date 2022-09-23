DIR=$PWD
FRAMEWORK_NAME=TiniAppSDK

rm -rf build
rm -rf Frameworks

SIMULATOR_ARCHIVE_PATH=$DIR/build/${FRAMEWORK_NAME}-iphonesimulator.xcarchive
DEVICE_ARCHIVE_PATH=$DIR/build/${FRAMEWORK_NAME}-iphoneos.xcarchive

# Simulator xcarchieve
xcodebuild archive \
  -workspace ${FRAMEWORK_NAME}.xcworkspace \
  -scheme ${FRAMEWORK_NAME} \
  -archivePath ${SIMULATOR_ARCHIVE_PATH} \
  -configuration Release \
  -sdk iphonesimulator \
  SKIP_INSTALL=NO \
  BUILD_LIBRARIES_FOR_DISTRIBUTION=YES \
  clean build

# Device xcarchieve
xcodebuild archive \
  -workspace ${FRAMEWORK_NAME}.xcworkspace \
  -scheme ${FRAMEWORK_NAME} \
  -archivePath ${DEVICE_ARCHIVE_PATH} \
  -sdk iphoneos \
  -configuration Release \
  SKIP_INSTALL=NO \
  BUILD_LIBRARIES_FOR_DISTRIBUTION=YES \
  clean build

cd $SIMULATOR_ARCHIVE_PATH/Products/Library/Frameworks
for framework in *; do
  frameworkName=${framework//.framework/}
  xcodebuild -create-xcframework \
    -framework $SIMULATOR_ARCHIVE_PATH/Products/Library/Frameworks/$frameworkName.framework \
    -framework $DEVICE_ARCHIVE_PATH/Products/Library/Frameworks/$frameworkName.framework \
    -output $DIR/Frameworks/$frameworkName.xcframework
done
