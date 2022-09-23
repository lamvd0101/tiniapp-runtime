require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "TiniAppSDK"
  s.module_name  = "TiniAppSDK"
  s.version      = package['version']
  s.summary      = package['description']
  s.license      = package['license']

  s.author       = package['author']
  s.homepage     = package['homepage']

  s.source       = { :git => "git@github.com:lamvd0101/tiniapp-sdk-ios.git" }
  # s.source_files = "ios", "**/*.{h,m,swift}"
  # s.resource_bundles = {
  #   "TiniAppSDK" => ["Rescources/*"],
  # }
  s.vendored_frameworks = "TiniAppSDK.xcframework"

  s.dependency "FBLazyVector"
  s.dependency "FBReactNativeSpec"
  s.dependency "RCTRequired"
  s.dependency "RCTTypeSafety"
  s.dependency "React"
  s.dependency "React-Core"
  s.dependency "React-CoreModules"
  s.dependency "React-Core/DevSupport"
  s.dependency "React-RCTActionSheet"
  s.dependency "React-RCTAnimation"
  s.dependency "React-RCTBlob"
  s.dependency "React-RCTImage"
  s.dependency "React-RCTLinking"
  s.dependency "React-RCTNetwork"
  s.dependency "React-RCTSettings"
  s.dependency "React-RCTText"
  s.dependency "React-RCTVibration"
  s.dependency "React-Core/RCTWebSocket"
  
  s.dependency "React-cxxreact"
  s.dependency "React-jsi"
  s.dependency "React-jsiexecutor"
  s.dependency "React-jsinspector"
  s.dependency "ReactCommon/jscallinvoker"
  s.dependency "ReactCommon/turbomodule/core"
  s.dependency "Yoga"
  
  s.dependency "DoubleConversion"
  s.dependency "glog"
  s.dependency "Folly"
end