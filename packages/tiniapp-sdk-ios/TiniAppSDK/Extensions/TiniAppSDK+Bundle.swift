//
//  TiniAppSDK+Bundle.swift
//  TiniAppSDK
//

import Foundation

public extension Bundle {
    static func getTiniAppBundle() -> URL? {
        let bundle = Bundle(for: Self.self)
        guard var bundleURL = bundle.resourceURL else {
            return nil
        }
        bundleURL.appendPathComponent("Rescources/\(BundleKey.jsBundleName.rawValue)")
        return bundleURL
    }
}
