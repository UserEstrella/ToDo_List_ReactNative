import { NavigationContainer } from "@react-navigation/native";
import { MyNavigation } from "./stackNavigation";
import React from 'react';

export function Navigate(){
    return(
        <NavigationContainer>
            <MyNavigation />
        </NavigationContainer>
    );
}