import React from 'react';

export default function Analytics() {
  return (
    <div className="flex" style={{ flexDirection: 'column', gap: 'var(--spacing-base)' }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-h2" style={{ marginBottom: '8px' }}>Clinical Analytics</h1>
          <p className="text-muted">System-wide patient monitoring metrics and performance.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Last 30 Days
          </button>
          <button className="btn btn-primary">
            Generate Report
          </button>
        </div>
      </div>

      <section className="grid-container mb-6">
        <div className="col-4 card" style={{ minHeight: '140px' }}>
          <div className="stat-label">Average Response Time</div>
          <div className="stat-value mt-2">2.4 <span className="text-body text-muted">mins</span></div>
          <div className="stat-trend trend-down mt-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline></svg>
            15% from last week
          </div>
        </div>
        <div className="col-4 card" style={{ minHeight: '140px' }}>
          <div className="stat-label">Critical Incidents</div>
          <div className="stat-value mt-2 text-critical" style={{ color: 'var(--status-critical)' }}>14</div>
          <div className="stat-trend trend-down mt-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline></svg>
            3 fewer than last week
          </div>
        </div>
        <div className="col-4 card" style={{ minHeight: '140px' }}>
          <div className="stat-label">Patient Recovery Rate</div>
          <div className="stat-value mt-2">94%</div>
          <div className="stat-trend trend-up mt-2" style={{ color: 'var(--status-stable)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline></svg>
            +2% from last month
          </div>
        </div>
      </section>

      <section className="card mb-6">
        <h2 className="text-h3 mb-6" style={{ margin: 0 }}>Incident Volume by Department</h2>
        <div className="flex items-end gap-6" style={{ height: '300px', padding: '24px 0', borderBottom: '1px solid var(--border)' }}>
          {/* Simple Bar Chart */}
          <div className="flex" style={{ flexDirection: 'column', alignItems: 'center', flex: 1, gap: '12px' }}>
            <div style={{ width: '40px', height: '60%', backgroundColor: 'var(--primary)', borderRadius: '4px 4px 0 0' }}></div>
            <span className="text-label">Cardiology</span>
          </div>
          <div className="flex" style={{ flexDirection: 'column', alignItems: 'center', flex: 1, gap: '12px' }}>
            <div style={{ width: '40px', height: '30%', backgroundColor: 'var(--primary-light)', borderRadius: '4px 4px 0 0' }}></div>
            <span className="text-label">Neurology</span>
          </div>
          <div className="flex" style={{ flexDirection: 'column', alignItems: 'center', flex: 1, gap: '12px' }}>
            <div style={{ width: '40px', height: '80%', backgroundColor: 'var(--primary)', borderRadius: '4px 4px 0 0' }}></div>
            <span className="text-label">ICU</span>
          </div>
          <div className="flex" style={{ flexDirection: 'column', alignItems: 'center', flex: 1, gap: '12px' }}>
            <div style={{ width: '40px', height: '45%', backgroundColor: 'var(--primary-light)', borderRadius: '4px 4px 0 0' }}></div>
            <span className="text-label">Pediatrics</span>
          </div>
          <div className="flex" style={{ flexDirection: 'column', alignItems: 'center', flex: 1, gap: '12px' }}>
            <div style={{ width: '40px', height: '20%', backgroundColor: 'var(--primary-light)', borderRadius: '4px 4px 0 0' }}></div>
            <span className="text-label">Oncology</span>
          </div>
        </div>
      </section>
    </div>
  );
}
