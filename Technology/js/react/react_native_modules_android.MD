###ReactContextBaseJavaModule    
We start by creating a native module. A native module is a Java class that usually extends the `ReactContextBaseJavaModule`

###getName    
`ReactContextBaseJavaModule` requires that method called `getName` is implemented    
~~~~
@Override 
public String getName() {
  return 'ToastAndroid'
}
~~~~

###getConstants    
An optional method called `getConstants` returns the constant values exposed to js.  

~~~~
@override
public Map<String, Object> getConstants() {
  final Map<String, Object> constants = new HashMap<>();
  constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
  constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
  return constants;
}
~~~~

###@ReactMethod    
To expose a method to JavaScript a Java method must be annotated using `@ReactMethod`. The return type of bridge methods is always void

~~~~
@ReactMethod
public void show(String message, int duration) {
  Toast.makeText(getReactApplicationContext(), message, duration).show();
}
~~~~

###createNativeModules
The last step within Java is to register the Module. 

~~~~
@Override
public List<NativeModule> createNativeModules( ReactApplicationContext reactContext) {
  List<NativeModule> modules = new ArrayList<>();
  modules.add(new ToastModule(reactContext));
  return modules;
}
~~~~
  
###  MainApplication.java > `getPackages`   
The package needs to be provided in the `getPackages` method of the MainApplication.java   

~~~~
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new AnExampleReactPackage()); // <-- Add this line with your package name.
}
~~~~
  
###NativeModules    
To make it simpler to access your new functionality from JavaScript, it is common to wrap the native module in a JavaScript module   
~~~~
import { NativeModules } from 'react-native';
module.exports = NativeModules.ToastAndroid;  
~~~~

###Using in other component
~~~~
mport ToastAndroid from './ToastAndroid';

ToastAndroid.show('Awesome', ToastAndroid.SHORT);  
~~~~