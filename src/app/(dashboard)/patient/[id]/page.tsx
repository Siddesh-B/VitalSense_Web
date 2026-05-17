import React from 'react';
import PatientVitals from './PatientVitals';
import ECGTrends from './ECGTrends';
import EMGTrends from './EMGTrends';
import Tabs from './Tabs';

export default async function PatientDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="flex" style={{ flexDirection: 'column', gap: 'var(--spacing-base)' }}>
      <div className="flex items-center gap-2 mb-4 text-muted">
        <span className="font-600">Patient Roster</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        <span>{id}</span>
      </div>

      <section className="card flex items-center justify-between mb-6">
        <div className="flex items-center gap-6">
          <div className="avatar" style={{ width: '64px', height: '64px', fontSize: '24px' }}>SP</div>
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-h1" style={{ margin: 0 }}>Sample Patient</h1>
              <span className="badge badge-stable">STABLE</span>
            </div>
            <div className="flex items-center gap-4 text-muted text-body">
              <span>ID: {id}</span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--border)' }}></span>
              <span>Admitted: ---------</span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--border)' }}></span>
              <span>--------------------------------</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Notes
          </button>
          <button className="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9"></path></svg>
            Order Labs
          </button>
        </div>
      </section>

      <Tabs
        tabs={[
          {
            id: 'details',
            label: 'Patient Details',
            content: <PatientVitals />
          },
          {
            id: 'ecg',
            label: 'ECG Trends',
            content: <ECGTrends />
          },
          {
            id: 'emg',
            label: 'EMG Trends',
            content: <EMGTrends />
          }
        ]}
        defaultTab="details"
      />

      <section className="card">
        <div className="card-header border-bottom" style={{ paddingBottom: '16px' }}>
          <h2 className="text-h2" style={{ marginBottom: 0 }}>Patient Health History</h2>
        </div>
        <div className="flex items-center justify-center py-12" style={{ minHeight: '300px', color: 'var(--text-muted)' }}>
          <div className="flex" style={{ flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
            <p className="text-body" style={{ fontSize: '18px', color: 'var(--text-muted)' }}>No health history records available yet.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
