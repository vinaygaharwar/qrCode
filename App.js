import React from 'react';
import {Text,View, ActivityIndicator} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

class App extends React.Component{
  static navigationOptions = {
    header: null
  }
  state = {
    hasCameraPermission: null, 
    isScanned: false 
  }
  async componentDidMount() {
    
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    console.log(status);
    this.setState({ hasCameraPermission: status === "granted" ? true : false });
  }



  handleBarCodeScanned = ({ data}) => {
      
      <View>
      <Text>{data}</Text>
    </View>
  }
  render(){
    const { hasCameraPermission, isScanned } = this.state;
    if(hasCameraPermission === null){
      console.log("Requesting permission");
      return (
        <ActivityIndicator
            color= "blue"
            size= "large"
        />
      );
    }

    if(hasCameraPermission === false){
      return ( 
        <View>
         <Text>Please grant Camera permission</Text>
        </View> 
      )
    }
    if(hasCameraPermission === true && !isScanned ){
      return <View style = {{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

      }}>
        <Text>Scan code inside window</Text>
        <BarCodeScanner
          onBarCodeScanned = { isScanned ? undefined : this.handleBarCodeScanned }
          style = {{
            height:  300,
            width: 400,
          }}
        >
        </BarCodeScanner>
      </View>
    }
    else{
      return <ActivityIndicator
      color= "blue"
      size= "large"
  />;
    }


  }

}




export default App;


