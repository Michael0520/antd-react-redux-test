import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ClassList from './pages/class'
import ClassDetail from './pages/class/[classId]'
import { store } from './store'

const App: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/class/index" replace />} />
        <Route path="/class">
          <Route path="index" element={<ClassList />} />
          <Route path=":classId" element={<ClassDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)

export default App
