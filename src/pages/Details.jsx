import { useState, useEffect } from 'react';
import { Cell, Panel, Button } from 'zarm';
import { useParams, useHistory } from "react-router-dom";
import { getStudentByIdAPI } from '../api/api';

const Details = () => {
    const [studentInfo, setStudentInfo] = useState({});
    let { id } = useParams();
    let history = useHistory();

    const handleGoBack = e => {
        console.log(id);
        history.goBack();
    }
    useEffect(() => {
        const fetchData = async () => {
            if (id == null) {
                return;
            }
            let res = await getStudentByIdAPI(id);
            console.log(res);
            if (res.err_msg != "success") {
                console.log(res.err_msg);
                history.goBack();
            }
            setStudentInfo(res.student);
        }
        fetchData();
    }, []);
    console.log(studentInfo)
    return (
        <>
            <Panel
                title="学生信息"
            >
                {studentInfo != null && (
                    <div>
                        <Cell title="姓名" description={studentInfo.name}></Cell>
                        <Cell title="联系电话" description={studentInfo.telephone}></Cell>
                        <Cell title="地址" description={studentInfo.address + studentInfo.address_ext}></Cell>
                        <Cell title="订单来源" description={studentInfo.order_source_name}></Cell>
                        <Cell title="录单员" description={studentInfo.authorName}></Cell>
                        {/* <Cell title="科目" description={studentInfo.intent_subject}></Cell> */}
                    </div>
                )}

                <Button block onClick={handleGoBack} style={{ marginBottom: 60, marginLeft: "auto", marginRight: "auto" }} >返回</Button>
            </Panel>
        </>
    )
}
export default Details;