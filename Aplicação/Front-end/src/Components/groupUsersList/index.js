import React, { useState } from 'react'
import { Tree } from 'antd';
import {BasicInputComponent} from '../../Components';
import { DownOutlined } from '@ant-design/icons';
import { treeData as initialData } from './dataSource';

export default function GroupUserListComponent() {


    const [autoExpandParent, setAutoExpandParent] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [treeData, setTreeData] = useState(initialData);

    function onChangeSelect(keySelected, node) {
        console.log(keySelected, node.node);
    }

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
    generateList(initialData);

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

    return (
        <div className="hidden lg:block mr-0 md:mr-5 bg-white p-5 rounded-lg w-1/4 h-screen border-2 border-gray-200 ">
            <BasicInputComponent name="filterTree" placeholder="Buscar grupo" className="my-2" value={searchValue} onChange={onChange} />
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
                onSelect={onChangeSelect}
            />
        </div>
    )
}
