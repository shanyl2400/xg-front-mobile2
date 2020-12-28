import { useState, useEffect } from 'react';
import { Cell, Panel, Button } from 'zarm';

const User = () => {
    const [userInfo, setUserInfo] = useState({
        name: sessionStorage.getItem("user_name"),
        role: sessionStorage.getItem("role_name")
    });
    let handleSignOut = e => {
        sessionStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <>
            <Panel
                title="用户信息"
            >
                <Cell title="用户" description={userInfo.name}>
                </Cell>
                <Cell title="角色" description={userInfo.role}></Cell>
                <Button block onClick={handleSignOut} style={{ marginBottom: 60, marginLeft: "auto", marginRight: "auto" }} >注销</Button>
            </Panel>


        </>
    )
}
export default User;