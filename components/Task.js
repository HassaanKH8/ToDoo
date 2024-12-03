import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Task = ({ task, onToggle, onDelete }) => {

    return (
        <View style={styles.tcontainer}>
            <Text style={{ fontSize: 20, color: "#efeee9", fontFamily: "EBGaramond-Medium" }}>{task.name}</Text>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                <TouchableOpacity style={(task.completed) ? {backgroundColor: "#73c27d", padding: 8, borderRadius: 6} : {backgroundColor: "#a0a0a0", padding: 8, borderRadius: 6}} onPress={()=>{onToggle()}}>
                    <Text style={{ fontSize: 14, color: "#263037", fontFamily: "Inter-Medium" }}>{task.completed ? ("Completed") : ("Mark as Completed")}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{onDelete()}}>
                    <Image source={require('../assets/trash.png')} style={{ width: 30, height: 30, opacity: 0.8, marginLeft: 10 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tcontainer: {
        display: 'flex',
        width: '99%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        alignSelf: 'center',
        backgroundColor: "#36454f",
        marginBottom: 15,
        padding: 14,
        borderRadius: 10,
    }
})

export default Task;