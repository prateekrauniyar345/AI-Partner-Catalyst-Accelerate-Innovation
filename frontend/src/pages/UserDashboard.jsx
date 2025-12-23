import React from 'react';
import UserDashboard from '../components/userDashboard/UserDashboard';

export default function UserDashboardPage() {
  return (
    <div className="container-fluid" style={{ paddingTop: 88 }}>
      <div className="container">
        <UserDashboard />
      </div>
    </div>
  );
}
