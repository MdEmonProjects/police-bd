import { useState } from 'react'
import {Outlet } from 'react-router-dom';

function Layout() {

  const [user, setUser] = useState(null)
  return (
    <div>
      <Outlet context={{ user, setUser }} /> {/* Outlet for child routes */}
    </div>
  );
}

export default Layout;




