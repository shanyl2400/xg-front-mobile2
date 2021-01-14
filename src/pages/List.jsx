import { useState, useEffect } from 'react';
import { listStudentAPI } from '../api/api';
import { Cell, Panel, Button } from 'zarm';
import { useHistory } from "react-router-dom";

const pageSize = 20;
let currentPage = 1;
const List = (props) => {
    const [students, setStudents] = useState({
        total: 0,
        data: []
    });
    let history = useHistory();
    const fetchStudent = async (page, pageSize) => {
        const rawRes = await listStudentAPI(page, pageSize, {});
        if (rawRes.err_msg != "success") {
            return;
        }
        const rawStudents = rawRes.result.students;
        let students = {
            total: rawRes.result.total,
            data: []
        };
        if (students == null) {
            return;
        }
        for (let i = 0; i < rawStudents.length; i++) {
            students.data.push({
                id: rawStudents[i].id,
                author: rawStudents[i].author,
                gender: rawStudents[i].gender,
                email: rawStudents[i].email,
                created_at: rawStudents[i].created_at,
                student_name: rawStudents[i].name,
                address: rawStudents[i].address + rawStudents[i].address_ext,
                telephone: rawStudents[i].telephone,
                intent_subject: rawStudents[i].intent_subject,
                status: rawStudents[i].status,
                author: rawStudents[i].authorName
            })
        }
        return students
    }
    const handleMore = async () => {
        let res = await fetchStudent(currentPage, pageSize);
        if (res.data.length > 0) {
            currentPage++;
            let newStudents = {
                total: res.total,
                data: []
            };
            for (let i = 0; i < students.data.length; i++) {
                newStudents.data.push(students.data[i]);
            }
            for (let i = 0; i < res.data.length; i++) {
                newStudents.data.push(res.data[i]);
            }
            setStudents(newStudents);
        }
    }
    const refreshList = async e => {
        currentPage = 1;
        let res = await fetchStudent(currentPage, pageSize);
        currentPage++;
        setStudents(res);
    }
    const handleDetails = v => {
        console.log(v);
        history.push("/details/" + v.id);
    }
    useEffect(() => {
        currentPage = 1;
        const fetchData = async () => {
            let res = await fetchStudent(currentPage, pageSize);
            currentPage++;
            setStudents(res);
        }
        fetchData();
    }, [props.refresh]);

    return (
        <>
            <Panel
                title="我的录单"
                more={<a href="#" onClick={() => refreshList()}>刷新</a>}
            >
                {students != null && students.data != null && students.data.map((v) =>
                    <Cell hasArrow onClick={() => { handleDetails(v) }} key={v.id} title={v.student_name} description={v.created_at.replace(/T/g, " ").replace(/Z/g, " ")}>
                    </Cell>
                )}
                <Button block size="xs" onClick={handleMore} style={{ marginBottom: 60, marginLeft: "auto", marginRight: "auto" }} >更多</Button>
            </Panel>
        </>
    )
}
export default List;