import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import firebase from 'firebase';
import db from '../config'
export default class StatusScreen extends React.Component{

  constructor()
  {
    super()
  this.state={
    userId:firebase.auth().currentUser.email,
    water:36,
    maure:0,


  }
  }
  getInfo =()=>{
    db.collection("plant_water_tracker").where("user_id","==", this.state.userId).get()
    .then((snapshot)=>{
   snapshot.forEach((doc) => {
    this.setState({
    "water" : doc.data().water_quantity
  })
});
})
db.collection("plant_manure_tracker").where("user_id","==", this.state.userId).get()
    .then((snapshot)=>{
   snapshot.forEach((doc) => {
    this.setState({
    "manure" :doc.data().manure_quantity
  })
});
})

  }

  componentDidMount(){
  



  }


 



  render(){
  return (
    <View style={styles.horizontal}>
    <Text style={{marginLeft:80}}>Monthly Report</Text>
    <View style={{marginTop:10}}>
    <AnimatedProgressWheel 
    size={200} 
    width={20} 
    color={'yellow'}
    progress={this.state.water}
    backgroundColor={'green'}
/>
</View>





</View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 2,
    marginTop:70,
    marginLeft:100
  },
});