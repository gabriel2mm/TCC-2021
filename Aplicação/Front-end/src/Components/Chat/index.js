import React, {useState, useEffect} from "react";
import { SearchOutlined} from "@ant-design/icons";
import {List} from 'antd';
import axios from 'axios'

function ChatComponent() {
  const maxCharacters = 30;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const fakeService = `https://60727341e4e0160017ddea55.mockapi.io/tcc/api/users/User`;

  useEffect(() => {
    async function getData(){
     const response =await axios.get(fakeService)
     setData(response.data);
     setLoading(false);
    };

    getData();  
  }, [data, fakeService])


  function cutTextLonger(text){
    if (text.length <= maxCharacters) return text;
  
    return text.substring(0, maxCharacters-1).substring(0, text.lastIndexOf(" ")) + "...";
  }

  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-4 gap-1 max-h-screen">
        <div className="bg-gray-100">
        <h1 className="antialiased text-xl font-medium text-gray-700 pl-10 pt-5">Conversas</h1>

          <form className="w-full bg-gray-100 pl-10 pr-10 pt-3 pb-3 text-gray-800 relative overflow-hidden">
            <div className="relative mt-1">
              <input type="text" name="search" placeholder="Procurar contatos" className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"/>
              <button className="block w-7 h-7 text-center text-xl leading-0 absolute top-0.5 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors">
                <SearchOutlined />
              </button>
            </div>
          </form>

          <h1 className="antialiased text-base font-normal text-gray-700 pl-10 pt-5">Contatos</h1>

          <div className="max-h-screen overflow-y-auto">
            <List loading={loading} dataSource={data} itemLayout="horizontal" renderItem={item => (
                <List.Item className="flex flex-row justify-between items-center hover:bg-gray-200 transition-colors" key={item.id}>
                <div className="flex flex-row justify-center items-center">
                    <div className="pl-10"> 
                        <div className="rounded-full bg-gray-400 h-12 w-12 flex flex-row justify-center items-center">
                          <span className="antialiased font-bold text-gray-700 text-2xl">{item.Nome.substring(0,1) + item.Sobrenome.substring(0,1)}</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-justify-items-start">
                      <span className="antialiased font-bold text-gray-700 pl-2">{item.Nome} {item.Sobrenome}</span>
                      <span className="antialiased pl-2 font-thin text-gray-400">{cutTextLonger(item.ultimaMsg)}</span>
                    </div>
                  </div>
                  <div className="">
                    <span className="antialiased pr-5 font-thin text-gray-400">{new Date(item.createdAt).getHours() + ':' + new Date(item.createdAt).getMinutes()}</span>
                  </div>
                </List.Item>
            )}
          />
         </div>

        </div>
        <div className="px-4 py-4 col-span-3 bg-gray-700">área 2</div>
      </div>
    </div>
  );
}

export default ChatComponent;
