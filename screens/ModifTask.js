import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Image, Dimensions, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@rneui/themed/dist/Icon';
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification';
import DateTimePicker from '@react-native-community/datetimepicker';
import { alterOldTask } from '../redux/actions/taskAction';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';


export function ModifTask() {
  const task = useSelector((state) => state.taskReducer.task);
  console.log("\n",task)

  const [id, onId] = useState(task.id);
  const [titre, onChangeTitre] = useState(task.titre);
  const [description, onChangeDescription] = useState(task.description);
  const [dateDeb, onChangeDateDeb] = useState(new Date());
  const [dateFin, onChangeDateFin] = useState(new Date());
  const [statut, onChangeStatut] = useState(task.statut);
  const [textDeb, setTextDeb] = useState(task.dateDeb);
  const [textFin, setTextFin] = useState(task.dateFin);
  const [showdeb, onShowDeb] = useState(false);
  const [showfin, onShowFin] = useState(false);

  const navigation= useNavigation();
  const route = useRoute();

  const optionetat = [
    {value:'Non Démarré'},
    {value:'En Cours'},
    {value:'Terminé'}
  ]
  const edges = useSafeAreaInsets();
  const dispatch = useDispatch();

  useEffect(() => {
      console.log("\nStatut :" + statut)
      console.log("Titre :" + titre)
      console.log("Description :" + description) 
      console.log("Date début :" + dateDeb) 
      console.log("Date fin :" + dateFin) 
  }, [titre,description,dateDeb,dateFin,statut]);

  const onChangeDeb =(event,selectedDate)=>{
    //console.log("recup date : ",selectedDate)
    const currentDate = selectedDate || dateDeb;
    onChangeDateDeb(currentDate);
    onShowDeb(Platform.OS === 'ios');
    //console.log("show state : ",showdeb)
    let tempDate = new Date(currentDate);
    //tempDate.toLocaleString('fr-FR', optiondate)
    //console.log("format date : ",tempDate)
    let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear()
    setTextDeb(fDate)
    //console.log("text date : ",fDate)
  }
  
  const onChangeFin =(event,selectedDate)=>{
  //console.log("recup date : ",selectedDate)
  const currentDate = selectedDate || dateFin;
  onChangeDateFin(currentDate);
  onShowFin(Platform.OS === 'ios');
  //console.log("show state : ",showdeb)
  let tempDate = new Date(currentDate);
  //tempDate.toLocaleString('fr-FR', optiondate)
  //console.log("format date : ",tempDate)
  let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear()
  setTextFin(fDate)
  //console.log("text date : ",fDate)
  }

  return (
  
    <ScrollView>
      <View style={{...styles.scrollable,paddingTop: (edges.top + 100)}}>
        <View style={styles.container}>
          <View>
            <View style={{...styles.row,marginLeft:35,justifyContent:'center'}}>
                <View style={{marginBottom: 5}}>
                        
                  {
                    showdeb && (
                      <DateTimePicker mode='date' value={dateDeb} onChange={onChangeDeb} />
                    )
                  }
                </View>
                
                <View style={{marginBottom: 5,marginLeft: 25}}>
                    
                  {
                    showfin && (
                        <DateTimePicker mode='date' value={dateFin} onChange={onChangeFin} />
                      )
                  }

                </View>
            </View>

            <View style={{marginBottom: 20}}>
              <SelectList 
                placeholder={statut}
                setSelected={(val) => onChangeStatut(val)} 
                data={optionetat} 
                save="value"
              />
            </View>

            <Text style={{marginLeft: 12,fontSize:18}}>Définissez la période de la tâche : </Text>
            <View style={{...styles.row, marginLeft: 70}}>
              <TouchableOpacity
                  style={styles.btn_edit}
                  onPress={()=>{
                    onShowDeb(true)
                  }}>
                <Icon name="calendar-outline" color='#086972' type='ionicon' />
              </TouchableOpacity>
              <Text style={{fontSize:15}}>{textDeb} - {textFin}</Text>
              <TouchableOpacity
                  style={styles.btn_edit}
                  onPress={()=>{
                    onShowFin(true)
                  }}>
                <Icon name="calendar-outline" color='#086972' type='ionicon' />
              </TouchableOpacity>
            </View>

            <View style={{marginBottom: 5}}>
              <Text style={{marginLeft: 12,fontSize:18}}>Titre</Text>
              <TextInput
                  style={styles.input_titre}
                  onChangeText={onChangeTitre}
                  value={titre}
                  placeholder="Lessive"
                  keyboardType="default"
              />
            </View>
            
            <View >
              <Text style={{marginLeft: 12,fontSize:18}}>Description</Text>
              <TextInput
                  style={styles.input_desc}
                  multiline
                  numberOfLines={6}
                  onChangeText={onChangeDescription}
                  value={description}
                  placeholder="Chaque jour la vaisselle doit être faite.Chaque jour la vaisselle doit être faiteChaque jour la vaisselle doit être faite"
                  keyboardType="default"
              />
            </View>
          </View>

          <AlertNotificationRoot>
            <View>
                <TouchableOpacity
                    style={styles.btn_add}
                    onPress={()=>{
                        //console.log("Ajouter une tâche")
                        if (!titre.replace(/\s+/, '').length || !description.replace(/\s+/, '').length || textDeb==" " || textFin==" ") {
                            
                              {
                                  Dialog.show({
                                      type: ALERT_TYPE.WARNING,
                                      autoClose: 5000,
                                      title: 'Attention',
                                      textBody: 'Vous devez remplir tous les champs !',
                                      button: 'Ok'
                                  })
                              }
                            
                        } else if((dateDeb>dateFin)){
                          {console.log("\nDate de début > Date de fin...")}

                          
                            {
                                Dialog.show({
                                    type: ALERT_TYPE.WARNING,
                                    autoClose: 5000,
                                    title: 'Attention',
                                    textBody: 'La période définie est incorrecte !',
                                    button: 'Ok'
                                })
                            }
                          
                        } else {
                            //console.log("Appel de l'action d'ajout...")
                            const task = {
                              id:id,
                              titre : titre,
                              description : description,
                              dateDeb : textDeb,
                              dateFin : textFin,
                              statut: statut
                            }
                            {
                              // console.log("\n",task)
                              // console.log(" ... lancement")
                              dispatch(alterOldTask(task))
                            }

                            //Message de modif réussie
                            
                              {
                                Dialog.show({
                                    type: ALERT_TYPE.SUCCESS,
                                    autoClose: 1000,
                                    title: 'Succès',
                                    textBody: 'La tâche a été correctement modifiée !',
                                    button: 'Ok',
                                    onPressButton: ()=>{
                                      navigation.goBack()
                                      navigation.goBack()
                                    }
                                })
                              }
                  
                        }
                    }}>
                    <Text style={styles.text_add}>Valider</Text>
                </TouchableOpacity>
            </View>
          </AlertNotificationRoot>

        </View>

      </View>
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollable:{
    paddingBottom: 0
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  input_desc: {
    height: 100,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    fontSize:15
  },
  input_titre: {
    height: 35,
    width:200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    fontSize:15
  },
  btn_add: {
    backgroundColor: '#0A6566',
    padding: 10,
    margin: 20,
    borderRadius: 25,
    elevation: 4,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_add: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
  },
});

