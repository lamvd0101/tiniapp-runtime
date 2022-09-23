//
//  TiniAppSDK+Bundle.swift
//  TiniAppSDK
//

import Foundation

public extension Bundle {
  static func getTiniAppBundle() -> URL? {
    let bundle: Bundle = Bundle.main
    guard var bundleURL = bundle.resourceURL else {
      return nil
    }
    
    bundleURL.appendPathComponent("\(BundleKey.bundleName.rawValue)/\(BundleKey.jsBundleName.rawValue)")
    
    return bundleURL
  }
}
