//
//  TiniAppViewController.swift
//  TiniAppSDK
//

import UIKit
import React

open class TiniAppViewController: UIViewController {
  override public func loadView() {
    let view = RCTRootView(props: [:])
    view?.loadingView = TiniAppLoadingView(frame: self.view.frame)
    view?.loadingViewFadeDelay = 0.3
    view?.loadingViewFadeDuration = 0.3
    self.view = view
  }
}
