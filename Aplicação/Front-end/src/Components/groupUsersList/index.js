import React, { useEffect, useState } from 'react'
import { Spin, Tree } from 'antd';
import {BasicInputComponent} from '../../Components';
import {API} from '../../Services';
import { TeamOutlined, UserOutlined, ClusterOutlined , DownOutlined} from '@ant-design/icons';
import { useGroupSelectContext, useUserContext } from '../../Contexts';

export default function GroupUserListComponent() {
    const context = useUserContext();
    const [loading, setLoading] = useState(true);
    const [initialData, setInitialData] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [autoExpandParent, setAutoExpandParent] = useState(false);
    const [treeData, setTreeData] = useState([]);
    const groupContext = useGroupSelectContext();

    useEffect(() => {
        loadGroups();
    }, []);

    async function loadGroups(){
        setLoading(true);
        try{
            const response = await API().get('/api/groups');
            if(response.status >= 200 && response.status < 300){
                const data = [{
                    key : `o-${context.organization.id}`,
                    title : context.organization.name,
                    icon : <ClusterOutlined />,
                    type: "org",
                    children : response.data?.map(group => ({
                        key : `g-${group.id}`,
                        title : group.name,
                        icon : <TeamOutlined />,
                        type: "group",
                        children : group.users?.map(user => ({
                            key : `u-${user.id}`,
                            title : `${user.firstName} ${user.lastName}`,
                            icon : <UserOutlined />,
                            type: "user"
                        }))
                    }))
                }];
                setTreeData(data);
                setInitialData(data);
            }
        }catch(err){
            console.log(err);
        }
        setLoading(false);
    }

    function onChangeSelect(keySelected, node) {
        const type = node.node.key.split("-")[0];
        const id = node.node.key.split("-")[1];
        console.log(type ,id );

        groupContext.changeGroup(type, id);
    }

    const loop = (data) =>
    data.map((item) => {
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
            index > -1 ? (
                <span>
                    {beforeStr}
                    <span className="site-tree-search-value">{searchValue}</span>
                    {afterStr}
                </span>
            ) : (
                <span>{item.title}</span>
            );
        if (item.children) {
            return { title, key: item.key, icon: item.icon, children: loop(item.children) };
        }

        return {
            title,
            key: item.key,
            icon: item.icon
        };
    });

    const dataList = [];
    const generateList = (data) => {
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const { key } = node;
            dataList.push({ key, title: key });
            if (node.children) {
                generateList(node.children);
            }
        }
    };
    generateList(initialData || []);

    function onExpand(expandedKeys) {
        setAutoExpandParent(true);
    }

    const onChange = (e) => {
        const value = e.target.value?.toLowerCase();
        if (value) {
            const hasSearchTerm = (n) => n.toLowerCase().indexOf(value) !== -1;
            const filterData = (arr) =>
                arr?.filter(
                    (n) => hasSearchTerm(n.title) || filterData(n.children)?.length > 0
                );
            const filteredData = filterData(initialData).map((n) => {
                return {
                    ...n,
                    children: filterData(n.children)
                };
            });

            setTreeData(filteredData);
            setSearchValue(value);
            setAutoExpandParent(true);
        } else {
            setTreeData(initialData);
            setSearchValue("");
            setAutoExpandParent(false);
        }
    };

    function filterTreeNode(node) {
        const title = node.title.props.children[2];
        const result = title.indexOf(searchValue) !== -1 ? true : false;
        return result;
    };

    return (
        <div className="min-h-screen lg:block mr-0 md:mr-5 bg-white p-5 rounded-lg w-full lg:w-1/4 border-2 border-gray-200 ">
            {loading ? <center><Spin /></center> : (
                <>
                    <BasicInputComponent name="filterTree" placeholder="Buscar grupo" className="my-2" value={searchValue} onChange={onChange} />
                    {treeData ? (
                        <Tree
                        defaultExpandAll
                        defaultExpandParent
                        showLine={true}
                        showIcon
                        defaultSelectedKeys={['0']}
                        onExpand={onExpand}
                        autoExpandParent={autoExpandParent}
                        treeData={loop(treeData)}
                        filterTreeNode={filterTreeNode}
                        switcherIcon={<DownOutlined />}
                        onSelect={ onChangeSelect}
                        />
                    ) : null}
                </>
            )}
        </div>
    )
}
