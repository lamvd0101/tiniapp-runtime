FRAMEWORK_NAME=TiniAppSDK

rm -rf build
rm -rf ${FRAMEWORK_NAME}.xcframework

SIMULATOR_ARCHIVE_PATH=./build/${FRAMEWORK_NAME}-iphonesimulator.xcarchive
DEVICE_ARCHIVE_PATH=./build/${FRAMEWORK_NAME}-iphoneos.xcarchive

# Simulator xcarchieve
xcodebuild archive \
  -workspace ${FRAMEWORK_NAME}.xcworkspace \
  -scheme ${FRAMEWORK_NAME} \
  -archivePath ${SIMULATOR_ARCHIVE_PATH} \
  -configuration Release \
  -sdk iphonesimulator \
  SKIP_INSTALL=NO \
  BUILD_LIBRARIES_FOR_DISTRIBUTION=YES

# Device xcarchieve
xcodebuild archive \
  -workspace ${FRAMEWORK_NAME}.xcworkspace \
  -scheme ${FRAMEWORK_NAME} \
  -archivePath ${DEVICE_ARCHIVE_PATH} \
  -sdk iphoneos \
  -configuration Release \
  SKIP_INSTALL=NO \
  BUILD_LIBRARIES_FOR_DISTRIBUTION=YES

# Copy frameworks
# rsync -r --exclude ${FRAMEWORK_NAME}.framework \
#   ${SIMULATOR_ARCHIVE_PATH}/Products/Library/Frameworks/* \
#   ${SIMULATOR_ARCHIVE_PATH}/Products/Library/Frameworks/${FRAMEWORK_NAME}.framework/Frameworks

# rsync -r --exclude ${FRAMEWORK_NAME}.framework \
#   ${DEVICE_ARCHIVE_PATH}/Products/Library/Frameworks/* \
#   ${DEVICE_ARCHIVE_PATH}/Products/Library/Frameworks/${FRAMEWORK_NAME}.framework/Frameworks

# Create xcframwork combine of all frameworks
xcodebuild -create-xcframework \
  -framework ${SIMULATOR_ARCHIVE_PATH}/Products/Library/Frameworks/${FRAMEWORK_NAME}.framework \
  -framework ${DEVICE_ARCHIVE_PATH}/Products/Library/Frameworks/${FRAMEWORK_NAME}.framework \
  -output ${FRAMEWORK_NAME}.xcframework

# xcodebuild -create-xcframework \
#   -library ${SIMULATOR_ARCHIVE_PATH}/Products/Library/Frameworks/${FRAMEWORK_NAME} \
#   -output ${OUTPUT_DIR}/${FRAMEWORK_NAME}.a
