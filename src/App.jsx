import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import './App.css';
import Registration from './Registration';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import ListOfUsers from './ListofUsers';
import Layout from './component/Layout';
import ProtectedRoute from './component/ProtectedRoute';
import SingleUserDetails from './SingleUserDetails';
import Goal from './Goal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import AdminRegistrationField from './AdminRegistrationField';
import RegistrationNew from './RegistrationNew';
import AdminProtectedRoute from './component/AdminProtectedRoute';
import AdminUsers from './AdminUsers';
const queryClient = new QueryClient();
function App() {
  const [user, setUser] = useState(null)
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Parent route */}
              <Route path="/" element={<Layout user={user} setUser={setUser} />}>
                <Route index element={<Home />} /> {/* Default route */}
                <Route path="registration" element={<RegistrationNew userRole={"user"} />} />
                <Route path="login" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="profile" element={<Profile />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                  <Route path="list_of_users" element={<ListOfUsers />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                  <Route path="user" element={<SingleUserDetails />} />
                </Route>
                {/* <Route path="list_of_users" element={<ListOfUsers />} />
                <Route path="user" element={<SingleUserDetails />} /> */}
                <Route path="goal" element={<Goal />} />
                <Route path="admin" element={<Layout user={user} setUser={setUser} />}>
                  <Route element={<AdminProtectedRoute />}>
                    <Route path="" element={<AdminUsers />} />
                    <Route path="registrationField" element={<AdminRegistrationField />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="user" element={<SingleUserDetails />} />
                    <Route path="user/add" element={<RegistrationNew userRole={"admin"} />} />
                    {/* <Route path="settings" element={<RegistrationNew userRole={"admin"} />} /> */}

                  </Route>

                  {/* <Route path='registrationField' element={<AdminRegistrationField />}>
                  </Route>
                  <Route path='users' element={<AdminRegistrationField />}></Route> */}
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;




