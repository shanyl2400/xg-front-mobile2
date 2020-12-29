import { useState } from 'react';
import { Input, Cell, Button, Popup } from 'zarm';
import axios from "axios"; //导入axios
import logo from '../logo.png';
import { useHistory } from "react-router-dom";
import { loginAPI } from '../api/api';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [popupSettings, setPopupSettings] = useState({ visible: false, content: "" });
    let history = useHistory();

    function saveSideInfo(name, res) {
        // sessionStorage.setItem("user_id", res.data.user_id);
        sessionStorage.setItem("user_name", name);
        // sessionStorage.setItem("role_id", res.data.role_id);
        // sessionStorage.setItem("org_id", res.data.org_id);
        sessionStorage.setItem("role_name", res.data.role_name);
        sessionStorage.setItem("org_name", res.data.org_name);
        let auths = ""
        for (let i = 0; i < res.data.auths.length; i++) {
            auths = auths + res.data.auths[i].name + ", ";
        }
        sessionStorage.setItem("auths", auths);
    }

    const handleClickLogin = async e => {
        if (name == "" || password == "") {
            toggle(true, "用户名和密码不能为空");
            return;
        }
        let res = await loginAPI(name, password);
        if (res == null) {
            toggle(true, "用户名或密码错误");
            return;
        }
        sessionStorage.setItem("token", res.data.token);
        axios.defaults.headers.common["Authorization"] = sessionStorage.getItem("token");
        let flag = false
        for (let i = 0; i < res.data.auths.length; i++) {
            if (res.data.auths[i].name == "录单权") {
                flag = true
            }
        }
        if (!flag) {
            toggle(true, "该账号无登录手机端权限");
            return;
        }

        saveSideInfo(name, res);
        sessionStorage.setItem("activeKey", "home");
        history.push("/main");
    }

    const toggle = (visible, content) => {
        setPopupSettings({ visible: visible, content: content });
        setTimeout(() => {
            setPopupSettings({ visible: false, content: "" });
        }, 3000);
    }
    return (
        <>
            <div style={{ margin: "auto" }}>
                <img src={logo} style={{ width: "100%", marginTop: 60, marginBottom: 40 }} />
            </div>
            <Cell title="用户名">
                <Input
                    clearable
                    type="text"
                    placeholder="请输入用户名"
                    value={name}
                    onChange={(value) => {
                        setName(value);
                        console.log(`onChange: ${value}`);
                    }}
                    onBlur={(value) => console.log(`onBlur: ${value}`)}
                />
            </Cell>
            <Cell title="密码">
                <Input
                    clearable
                    type="password"
                    placeholder="请输入密码"
                    placeholder="请输入"
                    value={password}
                    onChange={setPassword}
                />
            </Cell>
            <Button block theme="primary" onClick={handleClickLogin}>登录</Button>

            <Popup
                visible={popupSettings.visible}
                direction="top"
                mask={false}
                afterClose={() => console.log('关闭')}
            >
                <div className="popup-box-top">
                    {popupSettings.content}
                </div>
            </Popup>
        </>
    )
}

export default Login;