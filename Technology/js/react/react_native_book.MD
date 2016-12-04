#Book: Learning React Native    

##Chapter 3. Building your first App
~~~~
<TextInput onSubmitEditing={this.onsubmit}/>
onSubmit(event) {
	let text = event.nativeEvent.text 
}

Fetch('wwww.someaddress.com').then(response => response.text()).then(responseText =>{
	//now I can use this responseText
})

~~~~


##Chapter 4. Components for Mobile
~~~~
<Text>   
<Image
    style={styles.resizeMode}
    resizeMode={Image.resizeMode.contain}
    source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}} />  

<TouchableHighlight 
	onPressIn={this.someFunction} 
	onPressOut={this.someFunction}
	onPress={this.someFunction}
	onLongPress={this.someFunction}
	/>
---------------------------------------------------------   
Html        |          ReactNative   
___________________________________________________________   
div          |        View      
img          |        Image      
span, p      |        Text      
ul/ol, li    |        ListView, child items      
-----------------------------------------------------------    
~~~~    
image resizeMode is a enum ('cover', 'contain', 'stretch');   
In case of TouchableHighlight If you want to do more than just make things tappable React Native also expose 2 API for custom touch handling. `Gesture Responder System` & `PanResponder`. Gesture Responder is a low level API while PanResponder provides useful abstraction    
#####Touch 
* Start 
* Move 
* Release 
#####Organizational Component   
~~~~
Navigator, TabBar, ListView.
~~~~
ListView requires 2 props `dataSource` & `renderRow`  
DataSource need to be implement `rowHasChanged` method
~~~~
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
this.state = {
  dataSource: ds.cloneWithRows(['row 1', 'row 2']),
};
<ListView
    dataSource={this.state.dataSource}
    renderRow={(rowData) => <Text>{rowData}</Text>}
  />
~~~~

ListView also has `renderHeader renderFooter` props    
Other OC are
~~~~
TabBarIOS, SegmentedControlIOS, DrawerLayoutAndroid, ToolbarAndroid
~~~~

##### Platform specific component
~~~~
TabBarIOS, SegmentedControlIOS, DrawerLayoutAndroid, ToolbarAndroid
~~~~
#####Navigator
To present different Screen of an app `Navigator` component we are using. `Navigator` can implement bot platform(android and ios). For IOS another navigator component is `NavigatorIOS`. But NavigatorIOS is not supported by core team hence it has bug.

##Chapter 5. Styles
to create a style object 
~~~~
	const styles = StyleSheet.create({
	});
~~~~    

to concatenate  multiple style all style need to keep inside bracket [...style]
~~~~
	<Text style={[styles.red, styles.bigblue, {fontStyle : 'italic'}]}>concatenate style</Text>
~~~~     

We can pass Style as props.   
Stylesheet can be in separate file  
#### Positioning and defining layout   
React Native for Positioning and layout relaying primarily on flexbox; available flexbox properties are   
* flex
* flexDirection
* flexWrap
* alignItems 
* alignSelf    
Additionaly, these related values impact layout:
* height
* width  
* margin  
* border 
* padding  

In Addition to flexbox, React Native supports absolute positioning. Its works like css positioning .   
~~~~
container : {
	position : absolute, 
	top : 10, 
	left : 10,
	right : 10, 
	bottom : 10,
}
~~~~  

##Chapter 6. Platform Api
* Geolocation 
* CameraRoll
* ImagePickerIOS     
######Geolocation   
To knowing user's location we can use Geolocation. It returns data based on the [MDN Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation).       

* `navigator.geolocation.getCurrentPosition(successCB, errorCB, option) ` returns user current Postion 
* `navigator.geolocation.watchPosition(successCB, errorCB, option) ` returns user current Postion  & continues to return updated position as the user moves (like the GPS in a car)
* `navigator.geolocation.clearWatch(successCB, errorCB, option) ` returns user Postion Stops the watchPosition() method.
   
A simple successCallBack:   
~~~
function successCB(position) {
	let lat = position.coords.latitude;
	let long = position.coords.longitude
	this.setState({lat, long});
}   
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
~~~   
######CameraRoll   
CameraRoll.getPhotos(config, successCB, errorCB);   
Example code :
~~~~
import {CameraRoll} from 'react-native'
successCB(data) {
	const galleryImages = data.edges.assets.map(asset => asset.node.image);
	this.setState({galleryImages});
}
errorCB(error) {
	console.log(error);
}
componentDidMount() {
	const config = {
		first: 25
	}
	CameraRoll.getPhotos(config, this.successCB, this.errorCB);
}

~~~~
######ImagePickerIOS      
* canRecordVideos(cb)   
* canUseCamera(callback) 
*  openCameraDialog(config, successCallback, cancelCallback)
*  openSelectDialog(config, successCallback, cancelCallback)


#####UPloading Image to the Server    
~~~~
var xhr = new XMLHttpRequest();
xhr.open('post', 'http://someaddress.com');
var formdata = new FormData();
formdata.append('image', {...this.state.randomPhoto, name : 'image.jpg'});
xhr.send(formdata);
~~~~

#####AsyncStorage    
AsyncStorage should be used instead of localStorage    
for setting value    
```
try {
  await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
} catch (error) {
  // Error saving data
}
```    
for getting value    
~~~~
try {
  const value = await AsyncStorage.getItem('@MySuperStore:key');
  if (value !== null){
    // We have data!!
    console.log(value);
  }
} catch (error) {
  // Error retrieving data
}

~~~~














