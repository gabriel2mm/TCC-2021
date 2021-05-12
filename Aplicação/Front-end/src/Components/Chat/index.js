import React  from "react";
import { Drawer } from 'antd';
import { useDrawerContext } from "../../Contexts";

function ChatComponent({ open }) {
  const {drawerVisibility, handleToggleVisibility} = useDrawerContext();

  function handleClose() {
    handleToggleVisibility(!drawerVisibility)
  }

  return (
      <div className="w-32 h-32"></div>
  );
}

export default ChatComponent;
