'use client';

import React, { useState, useEffect } from 'react';

interface ECGDataPoint {
  timestamp: number;
  value: number;
}

export default function ECGTrends() {
  const [ecgData, setEcgData] = useState<ECGDataPoint[]>([]);
  const [heartRate, setHeartRate] = useState<number>(72);

  // Generate mock ECG data that simulates heart rhythm
  useEffect(() => {
    const generateECGWaveform = () => {
      const data: ECGDataPoint[] = [];
      const now = Date.now();
      
      // Generate 300 data points (about 30 seconds at 10Hz)
      for (let i = 0; i < 300; i++) {
        // Simulate ECG waveform using sine waves at different frequencies
        const t = i / 100;
        const baseValue = Math.sin(t * Math.PI * 2) * 0.5; // Main heartbeat rhythm
        const qrsComplex = Math.sin(t * Math.PI * 4) * 1.5; // QRS complex (sharp peak)
        const noise = (Math.random() - 0.5) * 0.2; // Small noise
        
        const value = baseValue + (Math.abs(Math.sin(t * 8)) > 0.7 ? qrsComplex : 0) + noise + 50;
        
        data.push({
          timestamp: now - (300 - i) * 100,
          value: Math.max(0, Math.min(100, value))
        });
      }
      
      setEcgData(data);
    };

    generateECGWaveform();

    // Update heart rate every few seconds
    const hrInterval = setInterval(() => {
      setHeartRate(prev => {
        const variation = (Math.random() - 0.5) * 6;
        return Math.max(60, Math.min(100, prev + variation));
      });
    }, 3000);

    return () => clearInterval(hrInterval);
  }, []);

  // Create SVG line points for the ECG waveform
  const createSVGPath = () => {
    if (ecgData.length === 0) return '';
    
    const width = 800;
    const height = 200;
    const maxValue = 100;
    
    const points = ecgData.map((point, index) => {
      const x = (index / ecgData.length) * width;
      const y = height - (point.value / maxValue) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return `M ${points}`;
  };

  const min = ecgData.length > 0 ? Math.min(...ecgData.map(d => d.value)) : 0;
  const max = ecgData.length > 0 ? Math.max(...ecgData.map(d => d.value)) : 100;
  const avg = ecgData.length > 0 ? ecgData.reduce((sum, d) => sum + d.value, 0) / ecgData.length : 0;

  return (
    <div className="card">
      <div className="card-header border-bottom" style={{ paddingBottom: '16px' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            <h2 className="text-h2" style={{ marginBottom: 0 }}>ECG Trends</h2>
          </div>
          <span className="badge badge-stable">NORMAL</span>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        {/* Heart Rate Display */}
        <div className="grid-container mb-6" style={{ gap: '16px' }}>
          <div className="col-3 card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '120px' }}>
            <div className="flex items-center justify-between">
              <span className="text-label text-muted">CURRENT HEART RATE</span>
              <span className="text-label">BPM</span>
            </div>
            <div className="flex items-end justify-between mt-4">
              <div className="stat-value" style={{ fontSize: '48px', color: 'var(--status-stable)' }}>{Math.round(heartRate)}</div>
              <div className="flex" style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                <div className="stat-trend trend-up">↑ Normal</div>
                <div className="text-muted text-label mt-1">REALTIME</div>
              </div>
            </div>
          </div>

          <div className="col-3 card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '120px' }}>
            <div className="flex items-center justify-between">
              <span className="text-label text-muted">MIN VALUE</span>
              <span className="text-label">mV</span>
            </div>
            <div className="stat-value" style={{ fontSize: '32px', marginTop: '16px', color: 'var(--text-secondary)' }}>{Math.round(min)}</div>
          </div>

          <div className="col-3 card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '120px' }}>
            <div className="flex items-center justify-between">
              <span className="text-label text-muted">AVG VALUE</span>
              <span className="text-label">mV</span>
            </div>
            <div className="stat-value" style={{ fontSize: '32px', marginTop: '16px', color: 'var(--text-secondary)' }}>{Math.round(avg)}</div>
          </div>

          <div className="col-3 card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '120px' }}>
            <div className="flex items-center justify-between">
              <span className="text-label text-muted">MAX VALUE</span>
              <span className="text-label">mV</span>
            </div>
            <div className="stat-value" style={{ fontSize: '32px', marginTop: '16px', color: 'var(--text-secondary)' }}>{Math.round(max)}</div>
          </div>
        </div>

        {/* ECG Waveform */}
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <div className="text-label text-muted mb-4">ECG WAVEFORM (30-Second Strip)</div>
          <svg
            width="100%"
            height="250"
            viewBox="0 0 800 200"
            style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: '4px' }}
          >
            {/* Grid lines */}
            {[...Array(9)].map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={i * 25}
                x2="800"
                y2={i * 25}
                stroke="var(--border)"
                strokeWidth="0.5"
              />
            ))}
            {[...Array(33)].map((_, i) => (
              <line
                key={`v-${i}`}
                x1={i * 25}
                y1="0"
                x2={i * 25}
                y2="200"
                stroke="var(--border)"
                strokeWidth="0.5"
              />
            ))}

            {/* ECG waveform line */}
            <polyline
              points={ecgData.map((point, index) => {
                const x = (index / ecgData.length) * 800;
                const y = 200 - (point.value / 100) * 200;
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="#FF6B6B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Status Info */}
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <div className="grid-container" style={{ gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <div className="text-label text-muted mb-2">STATUS</div>
              <div className="flex items-center gap-2">
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50' }}></div>
                <span className="text-body">Normal Sinus Rhythm</span>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div className="text-label text-muted mb-2">LAST UPDATED</div>
              <span className="text-body">Just now</span>
            </div>
            <div style={{ flex: 1 }}>
              <div className="text-label text-muted mb-2">DATA POINTS</div>
              <span className="text-body">{ecgData.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
