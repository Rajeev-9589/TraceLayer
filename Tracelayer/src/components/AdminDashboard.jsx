import LockedUsers from './LockedUser';
import SuspiciousIPs from './SuspiciousIp';
import TestControls from './TestControls';

const AdminDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <LockedUsers />
      <SuspiciousIPs />
      <TestControls />
    </div>
  );
};

export default AdminDashboard;