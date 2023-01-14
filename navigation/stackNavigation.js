import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import {NewTask} from "../screens/NewTask";
import SplashScreen from "../screens/SplashScreen";
import { ModifTask } from "../screens/ModifTask";
import { ShowTask } from "../screens/ShowTask";
import { TouchableOpacity } from "react-native";
import { Icon } from '@rneui/themed/dist/Icon';
import { CopyRight } from "../screens/CopyRight";


const Stack = createNativeStackNavigator();

export const MyNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash"
                options={{
                    animationEnabled: false, title: '',
                    headerTransparent: true
                }}
                component={SplashScreen} 
            />

            <Stack.Screen name="Nouvelle"
                options={({ navigation }) => ({
                    animationEnabled: false, title: 'Ajout d\'une tâche',headerTransparent: true,
                    headerStyle:{elevation: 4, backgroundColor:'#0A6566',color:'white'},
                    headerTitleStyle:{
                        color:'white',
                        fontSize:20,
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{marginRight:15}}
                            onPress={()=>{
                                navigation.goBack()
                            }}>
                            <Icon name="arrow-back" color='white' type='ionicon' />
                        </TouchableOpacity>
                    )
                })}
                component={NewTask} 
            />

            <Stack.Screen name="Copy"
                options={({ navigation }) => ({
                    animationEnabled: false, title: 'Droits D\'Auteurs',headerTransparent: true,
                    headerStyle:{elevation: 4, backgroundColor:'#0A6566',color:'white'},
                    headerTitleStyle:{
                        color:'white',
                        fontSize:20,
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{marginRight:15}}
                            onPress={()=>{
                                navigation.goBack()
                            }}>
                            <Icon name="arrow-back" color='white' type='ionicon' />
                        </TouchableOpacity>
                    )
                })}
                component={CopyRight} 
            />

            <Stack.Screen name="Modif"
                options={({ navigation }) => ({
                    animationEnabled: false, title: 'Modification d\'une tâche',
                    headerTransparent: true,
                    headerStyle:{elevation: 4, backgroundColor:'#0A6566',color:'white'},
                    headerTitleStyle:{
                        color:'white',
                        fontSize:20
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{marginRight:15}}
                            onPress={()=>{
                                navigation.goBack()
                            }}>
                            <Icon name="arrow-back" color='white' type='ionicon' />
                        </TouchableOpacity>
                    )
                })}
                component={ModifTask} 
            />

            <Stack.Screen name="Details"
            
                options={({ navigation }) => ({
                    animationEnabled: false, 
                    title: 'Détails de la tâche',
                    headerTransparent: true,
                    headerStyle:{elevation: 4, backgroundColor:'#0A6566',color:'white'},
                    headerTitleStyle:{
                        color:'white',
                        fontSize:20
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{marginRight:15}}
                            onPress={()=>{
                                navigation.goBack()
                            }}>
                            <Icon name="arrow-back" color='white' type='ionicon' />
                        </TouchableOpacity>
                    )
                })}
                component={ShowTask} 
            />
        </Stack.Navigator>
    );
}