import LockedUsers from './LockedUser';
import LogViewer from './Logviewer';
import SuspiciousIPs from './SuspiciousIp';
import TestControls from './TestControls';

const AdminDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* <LockedUsers />
      <SuspiciousIPs />
      <TestControls /> */}
      <LogViewer/>
    </div>
  );
};

export default AdminDashboard;