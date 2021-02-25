/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import React to be able to use JSX, 
import React, {useState} from 'react';

// for the database use
import Firebase from 'firebase';

// import the text and view component
import { Text, View, TextInput, StyleSheet, Button, ColorPropType, TextPropTypes, Alert } from 'react-native';


const firebaseConfig = {
  apiKey: 'AIzaSyA6eSl4_iVuSarBBkiUUVvp2n0_1BYLo1I',
  authDomain: 'dataentry-59fcf.firebaseapp.com',
  databaseURL: 'https://console.firebase.google.com/project/dataentry-59fcf/firestore/data~2F', //'https://dataentry-59fcf.firebaseio.com/',//
  projectId: 'dataentry-59fcf',
  storageBucket: 'dataentry-59fcf.appspot.com',
  messagingSenderId: '1098094730562',
  appId: '1:1098094730562:android:83442ea1cf4e3de8f1bcdb',
}

// read only array for all the initialized apps
// if 0 then no apps is initialized  
if (!Firebase.apps.length)
{
  // create or init the firebase app 
  Firebase.initializeApp(firebaseConfig);
}

const myStyle = StyleSheet.create(
  {
  set:{
    flex: 1,
    justifyContent:"center",
    alignItems: "center"
  },
  textInputStyle:
  {
    borderColor: '#3fff2f',
    borderStyle: 'dotted',
    borderBottomWidth: 2,
    borderBottomStartRadius: 1,
    maxWidth: 150,
    marginBottom: 5
  }, 
  buttonStyle:
  {
    marginTop: 10,
    backgroundColor: 'blue'
  }

  })

  
const MyTextInput = (props) =>
{
  return(
    <View>
      
      <TextInput placeholder={props.hint} style={myStyle.textInputStyle} onChangeText= {props.fCallback} />
      
    </View>
  );
}


const displayText = (data) =>
{
  Alert.alert(data);

}

const App = () => {

  

  // init the state 
  /*
useState(): [undefined, React.Dispatch<(prevState: undefined) => undefined>]
Returns a stateful value, and a function to update it.
  */
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 


  // send the data to the data base 

const storeDataToDataBase = () =>
{

  alert("Email"+email + " psw " + password);
  /*
  To catch the value on success, we'll use the then() 
  function available on the Promise instance object
  */
  // creating the user with 
  // authenticating the user 
  Firebase.auth().createUserWithEmailAndPassword( email, password)
  .then( (response) =>
  {
    // user id which will be make by the firesbase itself 
    const uid = response.user.uid;
    
    const data = {
      id: uid,
      email,
    };

    /*
    Cloud Firestore is a cloud-hosted,
    NoSQL database that your iOS, Android, and web apps can access directly via native SDKs
    collection is container for the docs 
    docs are the value data mapped 
    */

    // once the registration is done store the data into
    // the cloud firestore 
    /*

        collection :
                docs:
                  key : value 
    */
    try {
      
    } catch (error) {
      
    }
    const userCollection = Firebase.firestore().collection('users');

    /*
        users:
          10 ( supposed uid ):
            id: 10
            email 
    */
   
    userCollection.doc(uid).set(data)
    .then( () =>{
        Alert.alert("Data stored Succefully, see in the firestore ");
    })
    .catch((error) => {
      
      alert(error);
    })
  })
  .catch((error) => {
    alert("Error : "+error);
  })
    
}




  return(
    // view is component 
    // eq to the tabs of the html 
    /*
      <MyTextInput hint={"User Name"} fCallback={ (email) => setEmail(email)}/>
      <MyTextInput hint={"Password"} fCallback={ (password) => setPassword(password)}/>
    */
    <View style={myStyle.set}>


      <TextInput placeholder={"User Name"} style={myStyle.textInputStyle} onChangeText= { (email) => setEmail(email)}/>
      <TextInput placeholder={"Password"} style={myStyle.textInputStyle} onChangeText= { (password) => setPassword(password)} />

      <Button color= 'black'  title= "Login " onPress={()=> storeDataToDataBase()} style={myStyle.buttonStyle} />
      

    </View>
  );
  }
export default App;