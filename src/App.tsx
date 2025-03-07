import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ClassList from './pages/class'
import ClassDetail from './pages/class/[classId]'
import StudentList from './pages/student-list/[classId]'
import { DataProvider } from './providers/DataProvider'
import { store } from './store'

const App: React.FC = () => (
  <Provider store={store}>
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/class/index" replace />} />
          <Route path="/class">
            <Route path="index" element={<ClassList />} />
            <Route path=":classId" element={<ClassDetail />} />
          </Route>
          <Route path="/student-list/:classId" element={<StudentList />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  </Provider>
)

export default App
