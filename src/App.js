import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextComponent,
} from "react-native";
import api from "./services/api";

export default function App() {

  const [ repositories, setRepositories ] = useState([])
  const [ textPlural, setTextPlural ] = useState("")

  useEffect(() => {
      api.get('repositories').then( response => {
          setRepositories(response.data)
      })
  }, [] )


  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
    const response = await api.post(`/repositories/${id}/like`)
    console.log(response.data)
    const updatedRepo = response.data
    const filtered = repositories.filter(repository => repository.id !== id)
    setRepositories([...filtered, updatedRepo])
  }

  function handleTextPlural(qtdLikes){
    if(qtdLikes > 1){
      return " curtidas"
    } else {
      return " curtida"
    }
  }



  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.desafioText}>Desafio React Native GoStack 🚀</Text>
        <FlatList
          data={repositories}

          keyExtractor={repository => repository.id}

          renderItem={({ item : repository}) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repository.title}</Text>
    
              <FlatList
                data={repository.techs}

                keyExtractor={tech => tech}

                renderItem={({ item : tech}) => (
                  <View style={styles.techsContainer}>
                    <Text style={styles.tech}>
                      {tech}
                    </Text>
                  </View>
                )}
              >
              </FlatList>
              
    
              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-${repository.id}`}
                  
                >
                  {`${repository.likes} ${handleTextPlural(repository.likes)}`}

                </Text>
              </View>
    
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        >
        </FlatList>
     
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 24,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
  desafioText : {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
  }
});
