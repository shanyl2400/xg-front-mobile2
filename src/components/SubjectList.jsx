import { useState, useEffect } from 'react';
import { Icon, Cell, Panel, StackPicker, Toast } from 'zarm';
import { listSubjectsTreeAPIWithData, listSubjectsAllAPIIWithData } from '../api/api';

let subjectArray = [];
const SubjectList = (props) => {
    const [subjectsPanelVisible, setSubjectsPanelVisible] = useState(false);
    const [subjects, setSubjects] = useState([]);

    const [subjectPanelValue, setSubjectPanelValue] = useState("");
    const [subjectsTree, setSubjectsTree] = useState([]);
    const openSubjectsPanelVisible = e => {
        setSubjectsPanelVisible(true);
    }
    const handleMessage = (msg) => {
        // Toast.show(msg)
    }

    const parseSubjects = (subjects) => {
        if (subjects == null || subjects.length == 0) {
            return;
        }
        for (let i = 0; i < subjects.length; i++) {
            subjects[i].label = subjects[i].name;
            subjects[i].value = subjects[i].id;
            parseSubjects(subjects[i].children);
        }
    }
    useEffect(async () => {
        let data = await listSubjectsTreeAPIWithData();
        if (data.err_msg != "success") {
            handleMessage("无法获取课程:" + data.err_msg)
        }
        parseSubjects(data.subjects);
        setSubjectsTree(data.subjects);

        data = await listSubjectsAllAPIIWithData();
        if (data.err_msg != "success") {
            handleMessage("无法获取课程:" + data.err_msg)
        }
        subjectArray = data.subjects;
    }, []);

    useEffect(async () => {
        // if (props.clear == true) {
        setSubjects([]);
        // }
    }, [props.clear]);

    const handleRemoveSubject = (id) => {
        if (subjects == null) {
            return;
        }
        let newSubjects = [];
        for (let i = 0; i < subjects.length; i++) {
            if (subjects[i].id != id) {
                newSubjects.push(subjects[i]);
            }
        }
        setSubjects(newSubjects);
        props.handleUpdateSubjects(newSubjects);
    }

    const parseSubject = (data) => {
        if (data == null || data.length < 1) {
            return null;
        }

        let id = data[data.length - 1];
        for (let i = 0; i < subjectArray.length; i++) {
            if (id == subjectArray[i].id &&
                subjectArray[i].children == null) {
                return subjectArray[i]
            }
        }

        return null;
    }

    const handleAddSubject = (subject) => {
        if (subject == null) {
            return
        }
        if (subjects == null) {
            setSubjects([subject]);
            props.handleUpdateSubjects(newSubjects);
            return;
        }
        let newSubjects = [];
        for (let i = 0; i < subjects.length; i++) {
            if (subject.id == subjects[i].id) {
                newSubjects = [];
                return;
            }
            newSubjects.push(subjects[i]);
        }
        newSubjects.push(subject);
        setSubjects(newSubjects);
        props.handleUpdateSubjects(newSubjects);
    }
    return (
        <>
            <Panel
                title="报名意向"
                more={<a href="#" onClick={() => openSubjectsPanelVisible()}>新增</a>}
            >
                {subjects != null && subjects.map((v) =>
                    <Cell value={v} key={v.id} title={v.value}
                        description={
                            <Icon type="wrong-round" theme="primary" size="sm" onClick={() => handleRemoveSubject(v.id)} />
                        }
                    >
                    </Cell>
                )}
            </Panel>

            <StackPicker
                maskClosable
                visible={subjectsPanelVisible}
                value={subjectPanelValue}
                title="层叠选择器"
                dataSource={subjectsTree}
                onOk={(v) => {
                    console.log(v);
                    // setValue(v);
                    handleAddSubject(parseSubject(v));
                    setSubjectPanelValue(null);
                    setSubjectsPanelVisible(false);
                }}
                onCancel={() => setSubjectsPanelVisible(false)}
            />
        </>
    )
}

export default SubjectList;