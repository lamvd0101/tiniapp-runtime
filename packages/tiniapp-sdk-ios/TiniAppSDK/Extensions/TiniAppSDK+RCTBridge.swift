//
//  TiniAppSDK+RCTBridge.swift
//  TiniAppSDK
//

import React

public extension RCTBridge {
    convenience init?(moduleProvider: @escaping RCTBridgeModuleListProvider, launchOptions: [AnyHashable: Any]) {
        guard let bundleURL = Bundle.getTiniAppBundle() else {
            return nil
        }
        
        self.init(bundleURL: bundleURL, moduleProvider: moduleProvider, launchOptions: launchOptions)
    }
}
