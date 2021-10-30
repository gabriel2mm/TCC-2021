import React from 'react';
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

function GroupListComponent({ dataSource, data, setData, ...props }) {

    function handleChangePermission(e, permission) {
        if (e) {
            const isAditionalPermission = data.permissions?.find(item => item.permission === permission);
            if(!isAditionalPermission){
                setData({ ...data, permissions: [...data.permissions, {permission}] })
            }
        } else {
            setData({ ...data, permissions: data.permissions.filter(item => item.permission !== permission) })
        }
    }

    return (
        dataSource.map( (item, i) => (
            <div className="container mx-auto" key={i}>
                <h3 className="mt-5 mb-1 font-semibold text-gray-600 mb-2">{item.group}</h3>
                {item.permissions.map( (p, j) => (
                    <div key={j} className="w-full flex flex-row justify-between pb-2 mb-2 border-b-2 border-gray-200">
                        <div className="flex flex-col justify-start">
                            <span className="title text-lg text-gray-800 font-medium">{p.name}</span>
                            <span className="description font-thin text-gray-600">{p.description}</span>
                        </div>

                        <div className="switch ml-10 flex flex-row items-center">
                            <Switch checked={data.permissions?.find(item => item.permission === p.permission) !== undefined} onChange={e => handleChangePermission(e, p.permission)} checkedChildren={<CheckOutlined className="flex justify-items-center" />} unCheckedChildren={<CloseOutlined className="flex justify-items-center" />} />
                        </div>
                    </div>
                ))}
            </div>
        ))
    );
}

export default GroupListComponent;