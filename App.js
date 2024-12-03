import React, { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Task from "./components/Task.js";
import AsyncStorage from '@react-native-async-storage/async-storage';


const App = () => {

  const [tasklist, setTaskList] = useState([])
  const [taskInput, setTaskInput] = useState('')

  const loadStoredTasks = async () => {
    const savedTasks = await AsyncStorage.getItem('tasks');
    if (savedTasks != null) {
      return JSON.parse(savedTasks);
    } else {
      return [];
    }
  };

  useEffect(()=>{
    const fetchData = async () => {
      const tasks = await loadStoredTasks();
      setTaskList(tasks);
    };
    fetchData(); 
  },[])

  useEffect(()=>{
    AsyncStorage.setItem('tasks', JSON.stringify(tasklist))
  }, [tasklist])

  const onToggleComplete = (taskid) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskid
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  const deleteTask = (taskId) => {
    setTaskList((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleTaskSubmit = () => {
    if (taskInput.trim() !== '') {
      const newTask = {
        id: tasklist.length,
        name: taskInput,
        completed: false
      };
      setTaskList([...tasklist, newTask]);
      setTaskInput('');
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#efeee9"} barStyle={'dark-content'} />
      <Text style={styles.heading}>ToDoo</Text>
      <View style={{ display: 'flex', flexDirection: 'row', width: '80%', alignSelf: 'center', marginTop: 30 }}>
        <TextInput style={{ width: "80%", backgroundColor: "#36454f", borderBottomLeftRadius: 14, borderTopLeftRadius: 14, padding: 14, color: '#efeee9', fontFamily: "EBGaramond-Medium", fontSize: 18 }} placeholder="Enter a Task..." placeholderTextColor={"#c2bfb5"} value={taskInput} onChangeText={setTaskInput} />
        <TouchableOpacity style={{ justifyContent: 'center', backgroundColor: "#efeee9", width: "20%", borderWidth: 1, borderColor: "#36454f", borderTopRightRadius: 14, borderBottomRightRadius: 14 }} onPress={() => { handleTaskSubmit() }}>
          <Text style={{ fontSize: 18, fontFamily: "EBGaramond-Medium", textAlign: "center", color: '#36454f' }}>Add</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ display: 'flex', marginTop: 50, width: '80%', alignSelf: 'center' }}>
        {tasklist.map((task, index) => {
          return (
            <Task key={index} task={task} onToggle={() => { onToggleComplete(task.id) }} onDelete={() => { deleteTask(task.id) }} />
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efeee9"
  },
  heading: {
    fontSize: 38,
    fontFamily: "EBGaramond-Medium",
    marginLeft: 20,
    color: '#36454f'
  }
})

export default App;