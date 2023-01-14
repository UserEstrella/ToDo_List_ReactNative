import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Image, Dimensions, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@rneui/themed/dist/Icon';
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification';
import DateTimePicker from '@react-native-community/datetimepicker';
import { alterOldTask, showTask } from '../redux/actions/taskAction';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';


export function ShowTask() {
  const task = useSelector((state) => state.taskReducer.task);
  console.log("\n",task)

  const [id, onId] = useState(task.id);
  const [titre, onChangeTitre] = useState(task.titre);
  const [description, onChangeDescription] = useState(task.description);
  const [statut, onChangeStatut] = useState(task.statut);
  const [textDeb, setTextDeb] = useState(task.dateDeb);
  const [textFin, setTextFin] = useState(task.dateFin);
  const navigation= useNavigation();
  const route = useRoute();

  const edges = useSafeAreaInsets();
  const dispatch = useDispatch();


  return (
  
    <ScrollView>
      <View style={{...styles.scrollable,paddingTop: (edges.top + 100)}}>
        <View style={styles.container}>
          <View style={{alignItems: 'center',}}>
            <View>
              <View style={{...styles.row}}>
                <View style={{flexDirection:'column'}}>
                <Text style={styles.text_titre}>{titre}</Text>
                <Text style={styles.text_statut}>{statut}</Text>
                </View>
                <View style={{marginBottom: 20,marginLeft: 200,}}>
                  <TouchableOpacity
                      onPress={()=>{
                        console.log("Modifier la tâche "+ id)
                        dispatch(showTask(task.id))
                        navigation.push("Modif")
                      }}>
                    <Icon name="edit" color='#BDBDBB' type='font-awesome' />
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={{...styles.row}}>
                <Icon name="calendar-outline" size={18} color='#BDBDBB' type='ionicon' style={styles.text_timec} />
                <Text style={styles.text_time}>{textDeb} - {textFin}</Text>
              </View>
              <Text style={styles.text_desc}>{description}</Text>
            </View>
            
          </View>
        </View>

      </View>
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollable:{
    paddingBottom: 0
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  text_titre:{
    fontSize: 20,
    fontWeight:'bold',
    width:100,
  },
  text_statut:{
    fontSize: 15,
    marginBottom: 15,
    color:'#70726E'
  },
  text_time:{
    fontSize: 13,
    marginBottom: 15,
    color:'#BDBDBB',
    fontWeight:'bold',
  },
  text_timec:{
    marginRight:6,
    marginBottom: 15,
  },
  text_desc: {
    fontSize: 16,
    marginBottom: 20,
    color:'#70726E',
    width:225
  },
});

