import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, CheckBox } from 'react-native';
import Constants from 'expo-constants';
import Item from './NewListItem';
export default class NewList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      itemArray: [],
      itemText: '',
      inputText: '',
    }
    this.saveList=this.saveList.bind(this);
  }

    saveList(){
      //go to backend with itemArray
      this.props.navigation.navigate('Shopping');
    }
  
    render() {
      var items = this.state.itemArray.map((val,key) => {
        return <Item key={key} keyval={key} val={val}
        deleteMethod={ ()=> this.deleteItem(key) } />
      });

      return (
        <View style={styles.container}>
        
        <View style={styles.header}>
        <Text style={styles.headerText}>{this.props.route.params.title}</Text>
        <TouchableOpacity 
         style={styles.saveButton}
         onPress={this.saveList}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        </View>


        <ScrollView style={styles.scrollContainer}>

        {items}

        </ScrollView>

        <View style={styles.footer}>
        <TextInput style={styles.textInput}
        onChangeText={(itemText) => this.setState({itemText})}
        value={this.state.itemText}
        placeholder='> Type here to add an Item'
        placeholderTextColor='white'
        underlineColorAndroid={'transparent'} />

        </View>

        <TouchableOpacity onPress={this.addItem.bind(this)} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        </View>
        );
    }

    addItem() {
      if (this.state.itemText) {
        this.state.itemArray.push({
          item: this.state.itemText
        });

        this.setState({ itemArray: this.state.itemArray })
        this.setState({ itemText: '' });
      }
    }

    deleteItem(key) {
      this.state.itemArray.splice(key,1);
      this.setState({ itemArray: this.state.itemArray })
    }

}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },

    header: {
      backgroundColor: '#e91e63',
      alignItems: 'flex-start',
      justifyContent: 'center',
      borderBottomWidth: 0,
      borderBottomColor: '#ddd',
    },

    headerText: {
      color: 'white',
      fontSize: 18,
      padding: 24,
    },

    scrollContainer: {
      flex: 1,
      marginBottom: 70,
    },

    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      marginTop: 0,
      zIndex: 10,
    },

    textInput: {
      alignSelf: 'stretch',
      color: '#fff',
      padding: 20,
      backgroundColor: '#252525',
      borderTopWidth: 2,
      borderTopColor: '#ededed',
    },

    addButton: {
      position: 'absolute',
      zIndex: 11,
      right: 20,
      bottom: 10,
      backgroundColor: '#e91e63',
      width: 50,
      height: 50,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
    },

    addButtonText: {
      color: '#fff',
      fontSize: 24,
    },

    item:{
      width:"80%",
      backgroundColor:"#fff",
      borderRadius:20,
      padding:10,
      marginBottom:10,
      flexDirection:"row",
    },

    saveButton: {
      position: 'absolute',
      zIndex: 11,
      right: 20,
      bottom: 15,
      backgroundColor: '#252525',
      width: 90,
      height: 40,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
    },

    saveButtonText: {
      color: '#fff',
      fontSize: 15,
    },
  });

