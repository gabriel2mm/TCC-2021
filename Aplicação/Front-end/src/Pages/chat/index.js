import React from 'react'
import { AuthenticatedLayoutComponent, ChatComponent } from '../../Components';

export default function ChatPage() {
    return (
        <AuthenticatedLayoutComponent>
            <ChatComponent defaultVisible={true}/>
        </AuthenticatedLayoutComponent>
    )
}
