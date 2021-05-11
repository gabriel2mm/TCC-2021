import React  from "react";
import { Drawer } from 'antd';
import { useDrawerContext } from "../../Contexts";

function ChatComponent({ open }) {
  const {drawerVisibility, handleToggleVisibility} = useDrawerContext();

  function handleClose() {
    handleToggleVisibility(!drawerVisibility)
  }

  return (
      <Drawer title="Help desk" closable={true} onClose={handleClose} visible={drawerVisibility} />
  );
}

export default ChatComponent;
