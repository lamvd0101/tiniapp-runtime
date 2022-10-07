DIR=$PWD

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
