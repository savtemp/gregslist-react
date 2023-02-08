import { observer } from "mobx-react-lite"
import React from "react"
import { Link } from "react-router-dom"
import { AppState } from "../AppState.js"
import { AuthService } from "../services/AuthService.js"

// NOTE this is the 'javascript section' similar to whats in Vue 
function Login() {

  function login() {
    AuthService.loginWithRedirect()
  }

  function logout() {
    localStorage.removeItem('user-token')
    AuthService.logout({})
  }


  // NOTE Similar to a getter (a variable that can hold HTML and CSS in one) BUT these are entire components in JSX
  const notAuthenticated = (
    <button className="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" onClick={login}>Login</button>
  )

  const authenticated = (
    <div className="my-2 my-lg-0">
      <img src={AppState.account?.picture || AppState.user?.picture} alt="account photo" height="40" className="rounded selectable no-select" data-bs-toggle="dropdown"
        aria-expanded="false" />

      <div className="dropdown-menu dropdown-menu-lg-end dropdown-menu-start p-0" aria-labelledby="authDropdown">
        <div className="list-group">
          {/* NOTE link is now the 'router-link' */}
          <Link to={'Account'}>
            <div className="list-group-item dropdown-item list-group-item-action">
              Manage Account
            </div>
          </Link>
          <div className="list-group-item dropdown-item list-group-item-action text-danger selectable" onClick={logout}>
            <i className="mdi mdi-logout"></i>
            logout
          </div>
        </div>
      </div>
    </div>
  )

  // NOTE there are no such things as {{}} or ${}


  // NOTE This is the template (similar to the 'template' in Vue)
  return (
    <div>
      <span className="navbar-text">
        {!AppState.account?.id ? notAuthenticated : authenticated}
      </span>
    </div>
  )
}


// NOTE this needs to be here to export the default observer - this makes the whole 'login' component reactive because it links to the appState being updated (calls back to the makeAutoObservable in the AppState)
export default observer(Login)