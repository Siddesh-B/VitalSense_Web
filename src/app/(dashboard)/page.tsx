import React from 'react';

export default function Dashboard() {
  const patients = [
    { id: '1', name: 'SP 1', status: 'CRITICAL', time: '2 mins ago', hr: '118', bp: '160/95', hrTrend: 'up' },
    { id: '2', name: 'SP 2', status: 'STABLE', time: '15 mins ago', hr: '72', bp: '120/80', hrTrend: 'stable' },
    { id: '3', name: 'SP 3', status: 'MODERATE', time: '1 hour ago', hr: '95', bp: '135/88', hrTrend: 'up' },
    { id: '4', name: 'SP 4', status: 'STABLE', time: '3 hours ago', hr: '68', bp: '118/75', hrTrend: 'down' },
    { id: '5', name: 'SP 5', status: 'MODERATE', time: '12 mins ago', hr: '105', bp: '142/90', hrTrend: 'up' },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'CRITICAL':
        return <span className="badge badge-critical">CRITICAL</span>;
      case 'MODERATE':
        return <span className="badge badge-moderate">MODERATE</span>;
      case 'STABLE':
        return <span className="badge badge-stable">STABLE</span>;
      default:
        return null;
    }
  };

  const getSparkline = (trend: string) => {
    if (trend === 'up') {
      return (
        <div className="sparkline-container">
          <div className="sparkline-bar" style={{ height: '30%' }}></div>
          <div className="sparkline-bar" style={{ height: '50%' }}></div>
          <div className="sparkline-bar" style={{ height: '40%' }}></div>
          <div className="sparkline-bar" style={{ height: '70%' }}></div>
          <div className="sparkline-bar" style={{ height: '90%', backgroundColor: 'var(--status-critical)' }}></div>
        </div>
      );
    } else if (trend === 'down') {
      return (
        <div className="sparkline-container">
          <div className="sparkline-bar" style={{ height: '80%' }}></div>
          <div className="sparkline-bar" style={{ height: '60%' }}></div>
          <div className="sparkline-bar" style={{ height: '70%' }}></div>
          <div className="sparkline-bar" style={{ height: '40%' }}></div>
          <div className="sparkline-bar" style={{ height: '30%', backgroundColor: 'var(--status-stable)' }}></div>
        </div>
      );
    } else {
      return (
        <div className="sparkline-container">
          <div className="sparkline-bar" style={{ height: '50%' }}></div>
          <div className="sparkline-bar" style={{ height: '55%' }}></div>
          <div className="sparkline-bar" style={{ height: '45%' }}></div>
          <div className="sparkline-bar" style={{ height: '50%' }}></div>
          <div className="sparkline-bar" style={{ height: '55%' }}></div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-h2" style={{ marginBottom: 0 }}>Dashboard Overview</h1>
        <div className="flex gap-4">
          <button className="btn btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Export Report
          </button>
          <button className="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Patient
          </button>
        </div>
      </div>

      <div className="grid-container mb-6">
        <div className="col-3 card">
          <div className="stat-label">Total Monitored Patients</div>
          <div className="flex justify-between items-end">
            <div className="stat-value">248</div>
            <div className="stat-trend trend-down">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              2.4%
            </div>
          </div>
        </div>
        <div className="col-3 card" style={{ borderColor: 'var(--status-critical-bg)' }}>
          <div className="stat-label">Critical Alerts</div>
          <div className="flex justify-between items-end">
            <div className="stat-value" style={{ color: 'var(--status-critical)' }}>12</div>
            <div className="stat-trend trend-up">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
              15%
            </div>
          </div>
        </div>
        <div className="col-3 card">
          <div className="stat-label">Avg Resting HR</div>
          <div className="flex justify-between items-end">
            <div className="stat-value">76 <span className="text-body text-muted">bpm</span></div>
            <div className="stat-trend trend-down">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              1.2%
            </div>
          </div>
        </div>
        <div className="col-3 card">
          <div className="stat-label">Moderate Risk Patients</div>
          <div className="flex justify-between items-end">
            <div className="stat-value" style={{ color: 'var(--status-mod)' }}>34</div>
            <div className="stat-trend trend-up">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
              5%
            </div>
          </div>
        </div>
      </div>

      <div className="card col-12">
        <div className="card-header">
          <div className="card-title">Patient Roster</div>
          <div className="flex gap-4">
            <button className="btn btn-ghost text-muted">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              Filter
            </button>
            <button className="btn btn-ghost text-muted">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
            </button>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Status</th>
                <th>Last Update</th>
                <th className="text-right">Heart Rate</th>
                <th className="text-right">Blood Pressure</th>
                <th style={{ width: '100px' }}>Trend</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {patients.map(p => (
                <tr key={p.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{p.name}</div>
                    <div className="text-label" style={{ marginTop: '4px' }}>{p.id}</div>
                  </td>
                  <td>{getStatusBadge(p.status)}</td>
                  <td className="text-muted">{p.time}</td>
                  <td className="text-right text-mono" style={{ fontWeight: 600, color: p.status === 'CRITICAL' ? 'var(--status-critical)' : 'inherit' }}>
                    {p.hr} bpm
                  </td>
                  <td className="text-right text-mono">{p.bp}</td>
                  <td>{getSparkline(p.hrTrend)}</td>
                  <td className="text-right">
                    <button className="btn btn-ghost" style={{ padding: '4px 8px', color: 'var(--primary)' }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
