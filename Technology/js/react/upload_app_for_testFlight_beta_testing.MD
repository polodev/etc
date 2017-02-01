#How to upload app for testFlight beta testing   
###itunes connect (https://itunesconnect.apple.com/WebObjects/iTunesConnect.woa/ra/ng/app)
* bundle identity (getting from xcode general tab)
* app id (to make a app id there is link beneath the app id selection)    
####apple developer account (https://developer.apple.com/account/ios/certificate/?teamId=ZR3WVAEZC6)   
* making developer and distribution provisioning profile for certain app id.
* download those certificate and if you double click on this that will added to the keychain

####Xcode    
* changed bundle according itunes connect bundle id
* in build setting release will be distribution
* added app icon. genrating through prepo app and online generator both
* Product > managae scheme > edit scheme > will be edit scheme (command + shift + <)
* instate of simulator select generic ios device or any real device
* Product > archive it will make archive and after succefull archiving I will get upload option to itunes connect

####Uploading new build
* just have to change version in xcode general setting 
