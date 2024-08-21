import React from "react";
import { useSelector } from "react-redux";
import MyWatchParty from "../../watchParty/Tabs/myWatchParty";
const MyContest = () => {
    const user = useSelector(state => state.auth);
    const myContest = useSelector(state => state.story.myContest);
    return (
        <MyWatchParty groups={myContest} user={user?.user} />
    )
}
export default MyContest;