import React from 'react';
import {useAuth} from '../context/AuthContext';
import AuthStack from './AuthStack';
import AppStack from './AppStack';


export default function RootNavigator() {
const {isSignedIn} = useAuth();
return isSignedIn ? <AppStack /> : <AuthStack />;
}