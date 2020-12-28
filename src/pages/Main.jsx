import { useState } from 'react';
import { Icon, TabBar } from 'zarm';
import { useParams, useHistory } from "react-router-dom";
import Home from './Home';
import List from './List';
import User from './User';
const TabIcon = Icon.createFromIconfont('//at.alicdn.com/t/font_1340918_lpsswvb7yv.js');

const Main = () => {
    const [activeKey, setActiveKey] = useState('home');
    let homeDisplay = activeKey == "home";
    let listDisplay = activeKey == "list";
    let userDisplay = activeKey == "user";
    return (
        <>
            <div>
                <div style={{ display: homeDisplay ? 'block' : 'none' }}>
                    <Home />
                </div>
                <div style={{ display: listDisplay ? 'block' : 'none' }}>
                    <List refresh={listDisplay} />
                </div>
                <div style={{ display: userDisplay ? 'block' : 'none' }}>
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