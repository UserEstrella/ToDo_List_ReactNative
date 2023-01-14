import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Image, Dimensions, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@rneui/themed/dist/Icon';
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification';
import { useNavigation, useRoute } from '@react-navigation/native';
import { removeTask, showTask } from '../redux/actions/taskAction';


export function Home() {
  
  const navigation= useNavigation();
  const route = useRoute();

  //Variable récupérant les valeurs stockées de la BD
  const tasks = useSelector((state) => state.taskReducer.tasks);
  const [task, setTask] = useState(tasks);
  console.log("\n",tasks)

  const edges = useSafeAreaInsets();
  //Variable permettant de faire appel aux actions pour effectuer les changements dans le store
  const dispatch = useDispatch();

  useEffect(() => {
    setTask(tasks); 
  }, [tasks]);

  console.log("tasks lenght : ",task.length)
  if (task.length == 0) {
    //Rendu affiché si aucune tâche
    return (
      <ScrollView style={{marginTop:200}}>
        <View style={{...styles.scrollable,paddingTop: (edges.top + 100),justifyContent:"center"}}>
          <View style={{...styles.container}}>
            <Image 
              source={require('../assets/no_task.png')}
              style={{marginBottom:10,height:100,width:100}}
            />
            <Text style={[styles.text_time,{alignItems:"center",justifyContent:'center'}]}>Aucune tâche pour l'instant</Text>
          </View>
        </View>
      </ScrollView>
    );

  } else {
    const renderTask = (task, index) => {
      return (
          <Pressable key={task.id} style={styles.container_task}
              onPress={()=>{
              console.log("Task "+task.id)
              dispatch(showTask(task.id))
              navigation.push("Details")
            }}>
            <View style={{flexDirection: "column"}}>
              <View style={{...styles.row,justifyContent: "flex-start",marginBottom:2,width:200}}>
                  <Text style={[styles.text,{width:200}]}>
                      {task.titre}
                  </Text>
              </View>
              <View style={{...styles.row,justifyContent: "flex-start",marginBottom:18}}>
                  <Text style={{...styles.textd,width:280}}>
                    {task.description}
                  </Text>
              </View>
              <View style={{...styles.row,justifyContent: "flex-start"}}>
                <Icon name="alarm-outline" color='gray' type='ionicon' style={{paddingRight:5,marginLeft:10}} />
                <Text style={styles.text_time}>{task.dateDeb} - {task.dateFin}</Text>
              </View>
              <View style={{...styles.row,justifyContent:'flex-start',padding:5}}>
                <Text style={styles.text_time}>Statut: </Text>
                <Text style={{...styles.text_time,color:"#22780F"}}>{task.statut}</Text>
              </View>
            </View>

            <View style={{justifyContent:'flex-end',alignItems:'flex-end'}}>
                <AlertNotificationRoot>
                  <TouchableOpacity
                      style={styles.btn_rem}
                      onPress={()=>{
                        console.log("Supprimer la tâche "+ task.id+" et l'index est "+index)
                        Dialog.show({
                          type: ALERT_TYPE.DANGER,
                          autoClose: 5000,
                          title: 'Suppression',
                          textBody: 'Voulez-vous supprimer cette tâche ?',
                          button: 'Oui !',
                          onPressButton: ()=>{
                            console.log("Oui, supprimer cette tâche "+ task.id +" et l'index est "+index)
                            {dispatch(removeTask(task.id))}

                            //Message de suppression réussie
                            <AlertNotificationRoot>
                              {
                                  Dialog.show({
                                      type: ALERT_TYPE.SUCCESS,
                                      autoClose: 1000,
                                      title: 'Succès',
                                      textBody: 'La tâche a été supprimée !',
                                      button: 'Ok'
                                  })
                              }
                            </AlertNotificationRoot>

                          }

                        })
                      }}>
                    <Icon name="trash" color='#FF0921' type='font-awesome' />
                  </TouchableOpacity>
                </AlertNotificationRoot>
                
            </View>
          </Pressable>
      );
    }

    //Rendu affiché s'il ya des tâches
    return (
      <ScrollView>
        <View style={{...styles.scrollable,paddingTop: (edges.top + 100)}}>
          <View style={styles.container}>
              {

                task.map(renderTask)

              }
          </View>
        </View>
      </ScrollView>
    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  container_task: {
    padding: 10, 
    flexDirection: "row", 
    borderStyle:'dashed', 
    borderBottomColor:'gray',
    borderRadius: 20,
    marginTop:20,
    backgroundColor:"#E4E6E5"
  },
  scrollable:{
    paddingBottom: 0
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  title_text: {
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 20,
  },
  text:{
    fontSize: 20,
    fontWeight:'bold',
    marginLeft:10
    
  },
  textd:{
    fontSize: 18,
    marginLeft:10
    
  },
  text_time:{
    fontSize: 16,
    marginLeft:10
  },
  btn_edit: {
    padding: 10,
    margin: 4,
    borderRadius: 10,
  },
  btn_rem: {
    padding: 10,
    margin: 4,
    borderRadius: 10,
  },
});

