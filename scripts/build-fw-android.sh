DIR=$PWD

cd android
./gradlew clean -x app:assembleRelease assembleRelease
cd -

BUILD_LIBS=$DIR/android/build/libs
OUTPUT_LIBS=$DIR/android/SDKOutput/libs

rm -rf $OUTPUT_LIBS
mkdir $OUTPUT_LIBS

cd $BUILD_LIBS
for lib in *; do
  libPath=$BUILD_LIBS/$lib/outputs/aar/*-release.aar
  if [ -e "$libPath" ]; then
    cp $libPath $OUTPUT_LIBS/$lib-release.aar
  fi
done
cd -
