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
  s.vendored_frameworks = "Frameworks/*"
  s.resource_bundles = {
    "TiniAppSDK" => ["Rescources/*"],
  }

  s.library = 'c++'
  s.xcconfig = {
    'CLANG_CXX_LANGUAGE_STANDARD' => 'c++11',
    'CLANG_CXX_LIBRARY' => 'libc++'
  }
end
