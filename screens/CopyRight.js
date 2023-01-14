import { StyleSheet, Text, View} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';


export function CopyRight() {
  
  const navigation= useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>
        <Text style={styles.text_copy}>Ce projet est la réalisation exclusive de :</Text>
        <Text style={styles.text_copy}>Nyarko Marie-Stella</Text>
        <Text style={styles.text_copy}>Coldheart Bill</Text>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center'
  }, 
  text_copy: {
    fontSize: 20,
  }
});

