DIR=$PWD
RN_AAR=$DIR/node_modules/react-native/android/com/facebook/react/react-native/0.61.5/react-native-0.61.5.aar
HERMES_AAR=$DIR/node_modules/hermes-engine/android/hermes-release.aar

cd android
./gradlew clean -x app:assembleRelease assembleRelease
cd -

BUILD_LIBS=$DIR/android/build/libs
OUTPUT_LIBS=$DIR/android/SDKOutput/libs

rm -rf $OUTPUT_LIBS
mkdir $OUTPUT_LIBS

cd $BUILD_LIBS
find . -name "*-release.aar" | while read f; do
  echo "$f"
  cp $f $OUTPUT_LIBS
done
cd -

cp $RN_AAR $OUTPUT_LIBS
cp $HERMES_AAR $OUTPUT_LIBS

rm -rf $OUTPUT_LIBS/react-native-camera-mlkit-release.aar
