//
//  TiniAppViewController.swift
//  TiniAppSDK
//

import UIKit
import React

public class TiniAppViewController: UIViewController {
  override public func loadView() {
    let view = RCTRootView(props: [:])
    self.view = view
  }
}
