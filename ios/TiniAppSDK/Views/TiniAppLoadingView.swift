//
//  TiniAppLoadingView.swift
//  TiniAppSDK
//

import Foundation
import UIKit

class TiniAppLoadingView: UIView {
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.setupViews()
    self.setupLayout()
  }
  
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  private func setupViews() {
    let activityIndicator = UIActivityIndicatorView(style: .gray)
    activityIndicator.center = self.center
    activityIndicator.startAnimating()
    self.addSubview(activityIndicator)
  }
  
  private func setupLayout() {
    
  }
}
