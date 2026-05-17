'use client';

import React, { useState, useEffect } from 'react';

interface EMGDataPoint {
  timestamp: number;
  value: number;
  muscleGroup: string;
}

export default function EMGTrends() {
  const [emgData, setEMGData] = useState<EMGDataPoint[]>([]);
  const [muscleActivity, setMuscleActivity] = useState({
    biceps: 45,
    triceps: 32,
    forearm: 28,
    shoulder: 55
  });

  // Generate mock EMG data
  useEffect(() => {
    const generateEMGData = () => {
      const data: EMGDataPoint[] = [];
      const now = Date.now();
      const muscleGroups = ['biceps', 'triceps', 'forearm', 'shoulder'];
      
      // Generate 300 data points
      for (let i = 0; i < 300; i++) {
        const t = i / 100;
        // Simulate muscle activation patterns with bursts
        const burstPattern = Math.sin(t * Math.PI * 1.5) > 0.3 ? Math.sin(t * 8) * 0.8 : 0;
        const baseline = 20;
        const noise = (Math.random() - 0.5) * 10;
        const value = baseline + burstPattern * 40 + noise;
        
        data.push({
          timestamp: now - (300 - i) * 100,
          value: Math.max(0, Math.min(100, value)),
          muscleGroup: muscleGroups[Math.floor(Math.random() * muscleGroups.length)]
        });
      }
      
      setEMGData(data);
    };

    generateEMGData();

    // Update muscle activity every 2 seconds
    const activityInterval = setInterval(() => {
      setMuscleActivity(prev => ({
        biceps: Math.max(0, Math.min(100, prev.biceps + (Math.random() - 0.5) * 15)),
        triceps: Math.max(0, Math.min(100, prev.triceps + (Math.random() - 0.5) * 12)),
        forearm: Math.max(0, Math.min(100, prev.forearm + (Math.random() - 0.5) * 10)),
        shoulder: Math.max(0, Math.min(100, prev.shoulder + (Math.random() - 0.5) * 14))
      }));
    }, 2000);

    return () => clearInterval(activityInterval);
  }, []);

  const getMuscleActivityColor = (value: number) => {
    if (value < 30) return '#4CAF50'; // Green - Low activity
    if (value < 60) return '#FFC107'; // Yellow - Moderate activity
    return '#FF6B6B'; // Red - High activity
  };

  const getMuscleActivityLabel = (value: number) => {
    if (value < 30) return 'Low';
    if (value < 60) return 'Moderate';
    return 'High';
  };

  return (
    <div className="card">
      <div className="card-header border-bottom" style={{ paddingBottom: '16px' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 4h12v16H6z"></path>
              <line x1="9" y1="4" x2="9" y2="20"></line>
              <line x1="15" y1="4" x2="15" y2="20"></line>
              <line x1="6" y1="10" x2="18" y2="10"></line>
              <line x1="6" y1="16" x2="18" y2="16"></line>
            </svg>
            <h2 className="text-h2" style={{ marginBottom: 0 }}>EMG Trends</h2>
          </div>
          <span className="badge badge-stable">NORMAL</span>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        {/* Muscle Activity Indicators */}
        <div className="grid-container mb-6" style={{ gap: '16px' }}>
          {Object.entries(muscleActivity).map(([muscle, value]) => (
            <div key={muscle} className="col-3 card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '140px' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: getMuscleActivityColor(value)
                    }}
                  ></div>
                  <span className="text-label text-muted">{muscle.toUpperCase()}</span>
                </div>
              </div>
              <div className="flex items-end justify-between mt-4">
                <div className="stat-value" style={{ fontSize: '48px', color: getMuscleActivityColor(value) }}>
                  {Math.round(value)}
                </div>
                <div className="flex" style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div className="stat-trend" style={{ color: getMuscleActivityColor(value) }}>
                    {getMuscleActivityLabel(value)}
                  </div>
                  <div className="text-muted text-label mt-1">µV RMS</div>
                </div>
              </div>

              {/* Activity bar */}
              <div style={{ marginTop: '12px', height: '6px', backgroundColor: 'var(--bg-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${value}%`,
                    backgroundColor: getMuscleActivityColor(value),
                    transition: 'width 0.3s ease'
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* EMG Signal Waveform */}
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <div className="text-label text-muted mb-4">EMG SIGNAL WAVEFORM (30-Second Strip)</div>
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

            {/* EMG waveform line */}
            <polyline
              points={emgData.map((point, index) => {
                const x = (index / emgData.length) * 800;
                const y = 200 - (point.value / 100) * 200;
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="#9C27B0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Activity Summary */}
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <div className="text-label text-muted mb-4">ACTIVITY SUMMARY</div>
          <div className="grid-container" style={{ gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <div className="text-label text-muted mb-2">AVERAGE ACTIVITY</div>
              <div className="stat-value" style={{ fontSize: '32px' }}>
                {Math.round(
                  Object.values(muscleActivity).reduce((a, b) => a + b, 0) / Object.keys(muscleActivity).length
                )}
              </div>
              <span className="text-body text-muted">µV RMS</span>
            </div>
            <div style={{ flex: 1 }}>
              <div className="text-label text-muted mb-2">PEAK ACTIVITY</div>
              <div className="stat-value" style={{ fontSize: '32px' }}>
                {Math.round(Math.max(...Object.values(muscleActivity)))}
              </div>
              <span className="text-body text-muted">µV RMS</span>
            </div>
            <div style={{ flex: 1 }}>
              <div className="text-label text-muted mb-2">MOST ACTIVE</div>
              <div className="text-body" style={{ fontSize: '18px', fontWeight: 600, textTransform: 'capitalize', marginTop: '8px' }}>
                {Object.entries(muscleActivity).reduce((a, b) => (b[1] > a[1] ? b : a))[0]}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div className="text-label text-muted mb-2">STATUS</div>
              <div className="flex items-center gap-2">
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50' }}></div>
                <span className="text-body">Normal Patterns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
