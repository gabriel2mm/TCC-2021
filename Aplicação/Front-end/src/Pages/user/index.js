import React from 'react';
import { Link } from 'react-router-dom';
import { AuthenticatedLayoutComponent, ButtonComponent, UserTableComponent} from '../../Components'

function UserPage() {
  return (
    <AuthenticatedLayoutComponent>
      <div className="container">
        <h2 className="text-2xl font-bold text-gray-800 my-5">Usuários</h2>

        <div className="mt-5 w-full flex flex-col md:flex-row flex-shrink-0 justify-start md:justify-between md:items-center">
          <input type="text" name="search" placeholder="Buscar usuário" className="order-2 md:order-1 w-full md:w-80 pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-purple-500 transition-colors" />
          <Link to="/settings/users/new" className="order-1 md:order-2">
            <ButtonComponent className="float-left md:float-right mb-4 w-28 md:w-48 ">Novo Usuário</ButtonComponent>
          </Link>
        </div>
        <UserTableComponent />
      </div>
    </AuthenticatedLayoutComponent>
  )
}

export default UserPage;