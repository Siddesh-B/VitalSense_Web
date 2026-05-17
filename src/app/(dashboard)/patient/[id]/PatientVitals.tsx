'use client';

import React, { useEffect, useState } from 'react';

interface SensorData {
    heartRate: number | null;
    spO2: number | null;
    temperature: number | null;
    gsr: number | null;
    motionMagnitude: number | null;
    latitude: number | null;
    longitude: number | null;
    riskScore: number | null;
    timestamp: string | null;
}

export default function PatientVitals() {
    const [isOnline, setIsOnline] = useState<boolean>(false);
    const [vitals, setVitals] = useState<SensorData>({
        heartRate: null,
        spO2: null,
        temperature: null,
        gsr: null,
        motionMagnitude: null,
        latitude: null,
        longitude: null,
        riskScore: null,
        timestamp: null
    });

    useEffect(() => {
        // Connect to the WebSocket server
        const ws = new WebSocket('ws://localhost:5000');

        ws.onopen = () => {
            console.log('Connected to backend WebSocket');
        };

        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                
                if (message.type === 'status') {
                    setIsOnline(message.isOnline);
                } else if (message.type === 'vitals') {
                    setVitals(message.data);
                }
            } catch (error) {
                console.error('Failed to parse WebSocket message:', error);
            }
        };

        ws.onclose = () => {
            console.log('Disconnected from backend WebSocket');
            setIsOnline(false);
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <section className="mb-6 relative">
            {!isOnline && (
                <div className="flex justify-center mb-4">
                    <span className="badge badge-critical flex items-center gap-2" style={{ padding: '8px 16px', fontSize: '14px', boxShadow: 'var(--shadow-md)', animation: 'pulse 2s infinite' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                        DEVICE OFFLINE
                    </span>
                </div>
            )}
            
            <div className={`grid-container ${!isOnline ? 'opacity-50' : ''}`} style={{ transition: 'opacity 0.3s ease' }}>
                {/* Heart Rate */}
                <div className="col-3 card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '140px' }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            <h3 className="text-h3" style={{ margin: 0 }}>Heart Rate</h3>
                        </div>
                        <span className="text-label">BPM</span>
                    </div>
                    <div className="flex items-end justify-between mt-4">
                        <div className="stat-value" style={{ fontSize: '48px' }}>{vitals.heartRate ?? '--'}</div>
                        <div className="flex" style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                            <div className="stat-trend trend-up">Live</div>
                            <div className="text-muted text-label mt-1">REALTIME</div>
                        </div>
                    </div>
                </div>

                {/* SpO2 */}
                <div className="col-3 card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '140px' }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path></svg>
                            <h3 className="text-h3" style={{ margin: 0 }}>SpO2</h3>
                        </div>
                        <span className="text-label">%</span>
                    </div>
                    <div className="flex items-end justify-between mt-4">
                        <div className="stat-value" style={{ fontSize: '48px' }}>{vitals.spO2 ?? '--'}</div>
                        <div className="flex" style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                            <div className="stat-trend text-muted">Live</div>
                            <div className="text-muted text-label mt-1">REALTIME</div>
                        </div>
                    </div>
                </div>

                {/* Temperature */}
                <div className="col-3 card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '140px' }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>
                            <h3 className="text-h3" style={{ margin: 0 }}>Temperature</h3>
                        </div>
                        <span className="text-label">°F</span>
                    </div>
                    <div className="flex items-end justify-between mt-4">
                        <div className="stat-value" style={{ fontSize: '48px' }}>{vitals.temperature ?? '--'}</div>
                        <div className="flex" style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                            <div className="stat-trend text-muted">Live</div>
                            <div className="text-muted text-label mt-1">REALTIME</div>
                        </div>
                    </div>
                </div>

                {/* Risk Score */}
                <div className="col-3 card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '140px' }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                            <h3 className="text-h3" style={{ margin: 0 }}>Risk Score</h3>
                        </div>
                        <span className="text-label">INDEX</span>
                    </div>
                    <div className="flex items-end justify-between mt-4">
                        <div className="stat-value" style={{ fontSize: '48px', color: (vitals.riskScore !== null && vitals.riskScore > 7) ? 'var(--status-critical)' : 'inherit' }}>
                            {vitals.riskScore ?? '--'}
                        </div>
                        <div className="flex" style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                            <div className="stat-trend text-muted">Live</div>
                            <div className="text-muted text-label mt-1">REALTIME</div>
                        </div>
                    </div>
                </div>

                {/* GSR */}
                <div className="col-6 card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '140px' }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                            <h3 className="text-h3" style={{ margin: 0 }}>GSR</h3>
                        </div>
                        <span className="text-label">µS</span>
                    </div>
                    <div className="flex items-end justify-between mt-4">
                        <div className="stat-value" style={{ fontSize: '48px' }}>{vitals.gsr ?? '--'}</div>
                        <div className="flex" style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                            <div className="stat-trend text-muted">Live</div>
                            <div className="text-muted text-label mt-1">REALTIME</div>
                        </div>
                    </div>
                </div>

                {/* Motion Magnitude */}
                <div className="col-6 card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '140px' }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                            <h3 className="text-h3" style={{ margin: 0 }}>Motion</h3>
                        </div>
                        <span className="text-label">G-FORCE</span>
                    </div>
                    <div className="flex items-end justify-between mt-4">
                        <div className="stat-value" style={{ fontSize: '48px' }}>{vitals.motionMagnitude ?? '--'}</div>
                        <div className="flex" style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                            <div className="stat-trend text-muted">Live</div>
                            <div className="text-muted text-label mt-1">REALTIME</div>
                        </div>
                    </div>
                </div>

                {/* Map Location */}
                <div className="col-12 card" style={{ padding: 0, overflow: 'hidden', height: '360px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="flex items-center gap-2 text-muted">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            <h3 className="text-h3" style={{ margin: 0 }}>Live Tracking</h3>
                        </div>
                        {vitals.latitude !== null && vitals.longitude !== null && (
                            <div className="text-mono text-label" style={{ color: 'var(--primary)' }}>
                                {vitals.latitude.toFixed(6)}, {vitals.longitude.toFixed(6)}
                            </div>
                        )}
                    </div>
                    <div style={{ flex: 1, backgroundColor: 'var(--background)' }}>
                        {vitals.latitude !== null && vitals.longitude !== null ? (
                            <iframe 
                                width="100%" 
                                height="100%" 
                                frameBorder="0" 
                                scrolling="no" 
                                marginHeight={0} 
                                marginWidth={0} 
                                src={`https://www.openstreetmap.org/export/embed.html?bbox=${vitals.longitude - 0.005},${vitals.latitude - 0.005},${vitals.longitude + 0.005},${vitals.latitude + 0.005}&layer=mapnik&marker=${vitals.latitude},${vitals.longitude}`}
                                style={{ border: 'none' }}
                            ></iframe>
                        ) : (
                            <div className="flex items-center justify-center w-full" style={{ height: '100%', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                <span>Waiting for GPS signal...</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
