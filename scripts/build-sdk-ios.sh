# 1. Build runtime bundle
cd tiniapp-runtime
yarn
sh scripts/bundle-ios.sh

# 2. Build framework
yarn workspace tiniapp-sdk-ios build