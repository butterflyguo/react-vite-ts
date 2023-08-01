import React, { useContext } from 'react'
import { RouterProvider } from 'react-router-dom'
import Router from './router'
import { ConfigProvider } from 'antd'
const UserContext = React.createContext({ name: '' })
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#a65134'
        }
      }}
    >
      <UserContext.Provider value={{name:'jack'}}>
      <RouterProvider router={Router} />
      </UserContext.Provider>
    </ConfigProvider>
  )
}

export default App
