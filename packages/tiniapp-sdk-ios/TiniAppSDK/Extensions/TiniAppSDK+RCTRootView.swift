//
//  TiniAppSDK+RCTRootView.swift
//  TiniAppSDK
//

import React

public extension RCTRootView {
    convenience init?(props: [String: Any]) {
        guard let bundleURL = Bundle.getTiniAppBundle() else {
            return nil
        }
        
        self.init(bundleURL: bundleURL, moduleName: BundleKey.jsModuleName.rawValue, initialProperties: props, launchOptions: nil)
    }
    
    convenience init?(bridge: RCTBridge, props: [String: Any]) {
        self.init(bridge: bridge, moduleName: BundleKey.jsModuleName.rawValue, initialProperties: props)
    }
}
