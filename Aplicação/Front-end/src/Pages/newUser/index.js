import React from 'react';
import { AuthenticatedLayoutComponent, UserFormComponent } from '../../Components'

function NewUserPage() {
  return (
    <AuthenticatedLayoutComponent>
      <div className="container">
        <UserFormComponent />
      </div>
    </AuthenticatedLayoutComponent>
  )
}

export default NewUserPage;