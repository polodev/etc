
#Third Chapter
~~~~
<TextInput onSubmitEditing={this.onsubmit}/>
onSubmit(event) {
	let text = event.nativeEvent.text 
}

Fetch('wwww.someaddress.com').then(response => response.text()).then(responseText =>{
	//now I can use this responseText
})

~~~~


#4th Chapter Components for Mobile
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

##Fifth Chapter
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







