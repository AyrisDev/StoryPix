import { GoogleSignin,GoogleSigninButton,statusCodes, } from '@react-native-google-signin/google-signin';
export const config = () =>GoogleSignin.configure({
  offlineAccess: true, 
  scopes:["email","profile"], 
  webClientId:"430675657504-4l3ohi0dbjsdoh07ube8j1gqjr8d54ak" ,
});

const google = {
  config, 
}

export default google ; 

