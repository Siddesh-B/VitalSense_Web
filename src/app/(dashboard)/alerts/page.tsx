import React from 'react';

export default function Alerts() {
  const alerts = [
    { id: '1', patient: 'SP 1', type: 'Mild Tachycardia', severity: 'CRITICAL', time: '10:42 AM', status: 'UNRESOLVED' },
    { id: '2', patient: 'SP 2', type: 'Missed Medication', severity: 'MODERATE', time: '09:15 AM', status: 'UNRESOLVED' },
    { id: '3', patient: 'SP 3', type: 'Abnormal BP', severity: 'MODERATE', time: '08:30 AM', status: 'RESOLVED' },
    { id: '4', patient: 'SP 4', type: 'Low SpO2', severity: 'CRITICAL', time: 'Yesterday', status: 'RESOLVED' },
  ];

  return (
    <div className="flex" style={{ flexDirection: 'column', gap: 'var(--spacing-base)' }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-h2" style={{ marginBottom: '8px' }}>Alerts Management</h1>
          <p className="text-muted">Review and triage system generated alerts.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            Filter Alerts
          </button>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Alert ID</th>
                <th>Patient</th>
                <th>Alert Type</th>
                <th>Severity</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map(alert => (
                <tr key={alert.id} style={{ opacity: alert.status === 'RESOLVED' ? 0.6 : 1 }}>
                  <td className="text-mono text-muted">{alert.id}</td>
                  <td className="font-600">{alert.patient}</td>
                  <td>{alert.type}</td>
                  <td>
                    {alert.severity === 'CRITICAL' ? (
                      <span className="badge badge-critical">CRITICAL</span>
                    ) : (
                      <span className="badge badge-moderate">MODERATE</span>
                    )}
                  </td>
                  <td className="text-muted">{alert.time}</td>
                  <td>
                    {alert.status === 'UNRESOLVED' ? (
                      <span className="badge" style={{ backgroundColor: 'var(--surface-variant)', color: 'var(--text-main)' }}>UNRESOLVED</span>
                    ) : (
                      <span className="badge badge-stable">RESOLVED</span>
                    )}
                  </td>
                  <td>
                    {alert.status === 'UNRESOLVED' && (
                      <button className="btn btn-ghost" style={{ padding: '4px 8px', color: 'var(--primary)' }}>Resolve</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
