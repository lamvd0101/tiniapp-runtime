# 1. Build runtime bundle
cd packages/tiniapp-runtime
yarn
sh scripts/bundle-ios.sh # issue with node > 16

# 2. Build ios framework
cd -
cd packages/tiniapp-sdk-ios
pod install
sh Scripts/build-fw.sh

# 3.
cd -
