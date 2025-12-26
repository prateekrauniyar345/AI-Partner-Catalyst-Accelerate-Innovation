import React from 'react';
import UserDashboard from '../components/userDashboard/UserDashboard';
// import VoiceAgent from '../components/agentSystem/11labsvoiceAgent';

export default function UserDashboardPage() {
  return (
    <div className="container-fluid" style={{ paddingTop: 88 }}>
      <div className="container">
        <UserDashboard />
        {/* <VoiceAgent /> */}
      </div>
    </div>
  );
}
