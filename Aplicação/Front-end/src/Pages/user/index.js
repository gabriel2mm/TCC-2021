import React from 'react';
import { AuthenticatedLayoutComponent, UserTableComponent} from '../../Components'

function UserPage() {
  return (
    <AuthenticatedLayoutComponent>
      <div className="container">
        <h2 className="text-2xl font-bold text-gray-800 my-5">Usuários</h2>
        <UserTableComponent />
      </div>
    </AuthenticatedLayoutComponent>
  )
}

export default UserPage;