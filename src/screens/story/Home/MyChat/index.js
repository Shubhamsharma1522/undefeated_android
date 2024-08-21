import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import MyData from "../../Huddles/HuddlesList/Tabs/myData";
import {styles} from '../../Home/styles';
const MyChat = () => {
    const user = useSelector(state => state.auth);
    const myData = useSelector(state => state.story.myChatRooms);
    return (
      
            <MyData data={myData} user={user?.user} style={{paddingHorizontal:0,paddingVertical:0}}/>
    )
}
export default MyChat;