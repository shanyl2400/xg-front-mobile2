import { useState } from 'react';
import { Icon, TabBar } from 'zarm';
import { useParams, useHistory } from "react-router-dom";
import Home from './Home';
import List from './List';
import User from './User';
const TabIcon = Icon.createFromIconfont('//at.alicdn.com/t/font_1340918_lpsswvb7yv.js');

const Main = () => {
    let defaultActive = "home"
    if (sessionStorage.getItem("activeKey") != "") {
        defaultActive = sessionStorage.getItem("activeKey");
    }
    let [activeKey, setActiveKey] = useState(defaultActive);
    let listDisplay = activeKey == "list";
    return (
        <>
            <div>
                <div style={{ display: activeKey == "home" ? 'block' : 'none' }}>
                    <Home />
                </div>
                <div style={{ display: activeKey == "list" ? 'block' : 'none' }}>
                    <List refresh={listDisplay} />
                </div>
                <div style={{ display: activeKey == "user" ? 'block' : 'none' }}>
                    <User />
                </div>

            </div>
            <TabBar
                visible={true}
                activeKey={activeKey}
                onChange={setActiveKey}>
                <TabBar.Item
                    title="主页"
                    itemKey="home"
                    icon={<TabIcon type="home" />}
                />
                <TabBar.Item
                    title="名单"
                    itemKey="list"
                    icon={<TabIcon type="list" />}
                // badge={{ shape: 'circle', text: '3' }}
                />
                <TabBar.Item
                    title="我的"
                    itemKey="user"
                    icon={<TabIcon type="user" />}
                // badge={{ shape: 'dot' }}
                />
            </TabBar>
        </>
    )
}

export default Main;