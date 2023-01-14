import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView,  Image, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@rneui/themed/dist/Icon';
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification';
import { useNavigation, useRoute } from '@react-navigation/native';
import { checkTask, removeTask, showTask } from '../redux/actions/taskAction';


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
          <Pressable key={index} style={styles.container_task}
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

            <AlertNotificationRoot>
              <View style={{justifyContent:'flex-end',alignItems:'flex-end'}}>
                <TouchableOpacity
                    style={styles.btn_fin}
                    onPress={()=>{
                      Dialog.show({
                        type: ALERT_TYPE.WARNING,
                        autoClose: 5000,
                        title: 'Validation',
                        textBody: 'Vous vous apprêtez à cocher cette tâche comme Terminée',
                        button: 'Oui !',
                        onPressButton: ()=>{
                          const tache = {
                            id:task.id,
                            titre : task.titre,
                            description : task.description,
                            dateDeb : task.dateDeb,
                            dateFin : task.dateFin,
                            statut: task.statut
                          }
                          console.log("\n",tache)
                          dispatch(checkTask(tache))
                        }

                      })
                    }}>
                  <Icon name="check" color='#4FC031' type='font-awesome' />
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={styles.btn_rem}
                    onPress={()=>{
                      //console.log("Supprimer la tâche "+ task.id+" et l'index est "+index)
                      Dialog.show({
                        type: ALERT_TYPE.DANGER,
                        autoClose: 5000,
                        title: 'Suppression',
                        textBody: 'Voulez-vous supprimer cette tâche ?',
                        button: 'Oui !',
                        onPressButton: ()=>{
                          //console.log("Oui, supprimer cette tâche "+ task.id +" et l'index est "+index)
                          dispatch(removeTask(task.id))

                          //Message de suppression réussie
                          Dialog.show({
                            type: ALERT_TYPE.SUCCESS,
                            autoClose: 1000,
                            title: 'Succès',
                            textBody: 'La tâche a été supprimée !',
                            button: 'Ok'
                          })

                        }

                      })
                    }}>
                  <Icon name="trash" color='#FF0921' type='font-awesome' />
                </TouchableOpacity>
                  
              </View>
            </AlertNotificationRoot>
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
  btn_fin: {
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

