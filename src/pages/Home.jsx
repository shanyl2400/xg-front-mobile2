import { useState, useEffect } from 'react';
import { Input, Cell, Button, Radio, Picker, Toast, Panel, Popup } from 'zarm';
import options from '../components/address';
import SubjectList from '../components/SubjectList';
import { createStudentAPI, listOrderSourcesAPI } from '../api/api'


const Home = () => {
    const [name, setName] = useState('');
    const [note, setNote] = useState('');
    const [gender, setGender] = useState(true);
    const [telephone, setTelephone] = useState('');
    const [addrRegion, setAddrRegion] = useState('');
    const [addressExt, setAddressExt] = useState('');
    const [email, setEmail] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [orderSource, setOrderSource] = useState('');
    const [orderSourceID, setOrderSourceID] = useState(0);
    const [addrPanelVisible, setAddrPanelVisible] = useState(false);
    const [orderSourcePanelVisible, setOrderSourcePanelVisible] = useState(false);
    const [popupSettings, setPopupSettings] = useState({ visible: false, content: "" });
    const [clearSubjects, setClearSubjects] = useState(false);
    const [orderSourceList, setOrderSourceList] = useState([]);

    let resetFormData = () => {
        setGender(true);
        setName("");
        setTelephone("");
        setEmail("");
        setAddressExt("");
        setAddrRegion("");
        setOrderSource("");
        setOrderSourceID(0);
        setNote("");
        let flag = !clearSubjects;
        setClearSubjects(flag);

        // setSubjects([]);
    }
    useEffect(async () => {
        let res = await listOrderSourcesAPI();
        if (res.err_msg != "success") {
            message("获取订单来源失败");
            return;
        }
        if (res.sources == null) {
            message("订单来源为空，请联系系统管理员");
            return;
        }
        let orderSources = [];
        for (let i = 0; i < res.sources.length; i++) {
            orderSources.push({
                id: res.sources[i].id,
                name: res.sources[i].name,
                value: res.sources[i].id,
                label: res.sources[i].name,
            });
        }
        setOrderSourceList(orderSources);
    }, []);
    let checkFormData = () => {
        if (name == "") {
            message("学生姓名不能为空");
            return false;
        }
        if (telephone == "") {
            message("学生电话不能为空");
            return false;
        }
        if (addrRegion == "") {
            message("居住城市不能为空");
            return false;
        }
        if (orderSource == "") {
            message("订单来源不能为空");
            return false;
        }
        if (subjects.length < 1) {
            message("报名意向不能为空");
            return false;
        }
        return true
    }
    let handleCreateStudent = async e => {
        let noErr = checkFormData();
        if (!noErr) {
            return;
        }
        let address = addrRegion;
        let intentSubjectData = [];
        for (let i = 0; i < subjects.length; i++) {
            intentSubjectData.push(subjects[i].value);
        }
        let res = await createStudentAPI({
            "name": name,
            "gender": gender,
            "telephone": telephone,
            "email": email,
            "address": address,
            "address_ext": addressExt,
            "intent_subject": intentSubjectData,
            "note": note,
            "order_source_id": orderSourceID
        });
        if (res.err_msg == "success") {
            switch (res.result.status) {
                case 1:
                    //status 1 创建成功
                    message('创建成功');
                    break;
                case 2:
                    //status 2 挑战失败
                    message('创建成功，挑战失败');
                    break;
                case 3:
                    //status 3 挑战成功
                    message('创建成功，挑战成功');
                    break;
                default:
                    message('创建失败，未知状态');
            }

        } else {
            console.log(res);
            //创建失败
            message('创建失败:' + res.err_msg);
        }
        resetFormData();
    }

    const openAddrPanel = e => {
        setAddrPanelVisible(true);
    }
    const openOrderSourcePanel = e => {
        setOrderSourcePanelVisible(true);
    }
    const message = (content) => {
        setPopupSettings({ visible: true, content: content });
        setTimeout(() => {
            setPopupSettings({ visible: false, content: "" });
        }, 3000);
    }
    const selectAddressRegion = selected => {
        if (selected == null) {
            return;
        }
        let addr = "";
        for (let i = 0; i < selected.length; i++) {
            if (addr != "") {
                addr = addr + "-";
            }
            addr = addr + selected[i].value;
        }
        setAddrRegion(addr);
    }

    const selectOrderSource = selected => {
        if (selected == null) {
            return;
        }
        let orderSource = "";
        let orderSourceID = 0;
        for (let i = 0; i < selected.length; i++) {
            if (orderSource != "") {
                orderSource = orderSource + "-";
            }
            orderSource = orderSource + selected[i].label;

            orderSourceID = selected[i].value;
        }
        setOrderSource(orderSource);
        setOrderSourceID(orderSourceID);

    }
    return (
        <>
            <Panel
                title="基本信息"
            >
                <Cell title="姓名">
                    <Input
                        clearable
                        type="text"
                        placeholder="请输入学员姓名"
                        value={name}
                        onChange={(value) => {
                            setName(value);
                            console.log(`onChange: ${value}`);
                        }}
                        onBlur={(value) => console.log(`onBlur: ${value}`)}
                    />

                </Cell>
                <Cell title="性别">
                    <Radio.Group
                        block
                        type="button"
                        defaultValue={true}
                        value={gender}
                        onChange={setGender}>
                        <Radio value={true}>男</Radio>
                        <Radio value={false}>女</Radio>
                    </Radio.Group>
                </Cell>
                <Cell title="手机号">
                    <Input
                        clearable
                        type="text"
                        placeholder="请输入学员手机号"
                        value={telephone}
                        onChange={(value) => {
                            setTelephone(value);
                            console.log(`onChange: ${value}`);
                        }}
                        onBlur={(value) => console.log(`onBlur: ${value}`)}
                    />
                </Cell>

                <Cell title="居住地址">
                    <Button size="sm" onClick={openAddrPanel}>选择</Button>
                    <span>&nbsp;&nbsp;{addrRegion}</span>
                </Cell>
                <Cell title="详细地址">
                    <Input
                        clearable
                        type="text"
                        placeholder="请输入详细地址"
                        value={addressExt}
                        onChange={(value) => {
                            setAddressExt(value);
                            console.log(`onChange: ${value}`);
                        }}
                        onBlur={(value) => console.log(`onBlur: ${value}`)}
                    />
                </Cell>

                <Cell title="电子邮箱">
                    <Input
                        clearable
                        type="text"
                        placeholder="请输入学员邮箱"
                        value={email}
                        onChange={(value) => {
                            setEmail(value);
                        }}
                        onBlur={(value) => console.log(`onBlur: ${value}`)}
                    />
                </Cell>

                <Cell title="订单来源">
                    <Button size="sm" onClick={openOrderSourcePanel}>选择</Button>
                    <span>&nbsp;&nbsp;{orderSource}</span>
                </Cell>

                <Cell title="备注">
                    <Input
                        type="text"
                        rows={2}
                        placeholder="请输入学员备注"
                        value={note}
                        onChange={setNote}
                    />
                </Cell>
            </Panel>

            <SubjectList handleUpdateSubjects={setSubjects} clear={clearSubjects} />

            <Picker
                visible={addrPanelVisible}
                dataSource={options}
                onOk={(selected) => {
                    console.log('Picker onOk: ', selected);
                    Toast.show(JSON.stringify(selected));
                    selectAddressRegion(selected)
                    // setValue('cascade', selected.map(item => item.code));
                    setAddrPanelVisible(false);
                }}
                onCancel={() => setAddrPanelVisible(false)}
            />

            <Picker
                visible={orderSourcePanelVisible}
                dataSource={orderSourceList}
                onOk={(selected) => {
                    Toast.show(JSON.stringify(selected));
                    selectOrderSource(selected);
                    // setValue('single', selected.map(item => item.value));
                    setOrderSourcePanelVisible(false);
                }}
                onCancel={() => setOrderSourcePanelVisible(false)}
            />

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

            <Button block theme="primary" style={{ marginBottom: 80 }} onClick={handleCreateStudent}>录单</Button>
        </>
    )
}

export default Home;