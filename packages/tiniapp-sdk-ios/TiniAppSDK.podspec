Pod::Spec.new do |s|
  s.name         = "TiniAppSDK"
  s.module_name  = "TiniAppSDK"
  s.version      = "1.0.0"
  s.summary      = "A short description of TiniAppSDK"
  s.license      = "MIT"

  s.authors      = { "Vuong Duc Lam" => "lam.vuong@tiki.vn" }
  s.homepage     = "https://github.com/lamvd0101/tini-app-sdk"

  s.ios.deployment_target = "11.0"
  s.swift_version = "5.0"
  s.static_framework = true

  s.source       = { :git => "git@github.com:lamvd0101/tini-app-sdk.git" }
  # s.source_files = "ios", "**/*.{h,m,swift}"
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