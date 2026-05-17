'use client';

import React, { useState } from 'react';
import { login } from '../actions';

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Left side: Branding / Illustration */}
      <div className="left-panel" style={{
        flex: 1,
        position: 'relative',
        background: 'linear-gradient(135deg, #0F172A 0%, #1e293b 100%)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px',
        color: '#fff',
      }}>
        {/* Abstract decorative elements */}
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(2, 132, 199, 0.4) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(0, 168, 255, 0.3) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(50px)' }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '500px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, var(--primary) 0%, #00a8ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(2, 132, 199, 0.5)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
            </div>
            <span style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em' }}>VitalSense</span>
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em' }}>
            Precision Care,<br />
            <span style={{ color: '#00a8ff' }}>Intelligent Insights.</span>
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--sidebar-text)', lineHeight: 1.6 }}>
            Access the Clinical Dashboard to monitor patient vitals in real-time, analyze trends and make data-driven decisions for better patient outcomes.
          </p>
        </div>

        {/* Glassmorphic decorative card */}
        <div style={{
          position: 'absolute',
          right: '40px',
          bottom: '80px',
          width: '320px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 'var(--radius-md)',
          padding: '24px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
          zIndex: 10,
          transform: 'rotate(-5deg)',
          animation: 'float 6s ease-in-out infinite'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Heart Rate</div>
            <div className="badge badge-stable" style={{ animation: 'pulse-stable 2s infinite' }}>Stable</div>
          </div>
          <div style={{ fontSize: '42px', fontWeight: 700, color: '#fff', lineHeight: 1, marginBottom: '8px' }}>70 <span style={{ fontSize: '16px', color: '#94a3b8', fontWeight: 400 }}>bpm</span></div>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '40px', gap: '4px', marginTop: '16px' }}>
            {[30, 40, 35, 50, 45, 60, 80, 100].map((h, i) => (
              <div key={i} style={{ flex: 1, backgroundColor: i === 7 ? 'var(--status-stable)' : 'rgba(255, 255, 255, 0.2)', height: `${h}%`, borderRadius: '2px 2px 0 0' }} />
            ))}
          </div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        position: 'relative'
      }}>
        {/* Background glow for right side */}
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(204, 229, 255, 0.5) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(30px)', pointerEvents: 'none' }} />

        <div style={{ width: '100%', maxWidth: '420px', zIndex: 10 }}>
          <div style={{ marginBottom: '40px' }}>
            <h2 className="text-h2" style={{ marginBottom: '8px', fontSize: '32px' }}>Welcome back</h2>
            <p className="text-muted text-body" style={{ fontSize: '16px' }}>Please enter your credentials to continue.</p>
          </div>

          {error && (
            <div style={{
              padding: '16px',
              backgroundColor: 'var(--status-critical-bg)',
              color: 'var(--status-critical)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '24px',
              fontSize: '14px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderLeft: '4px solid var(--status-critical)',
              animation: 'fade-in 0.3s ease-out'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="input-group">
              <label className="text-label block mb-2" htmlFor="username" style={{ color: 'var(--text-main)', fontSize: '13px' }}>Username</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="e.g. Doctor"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    paddingLeft: '44px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--surface)',
                    fontFamily: 'inherit',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(2, 132, 199, 0.15)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.02)'; }}
                />
                <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
              </div>
            </div>

            <div className="input-group">
              <div className="flex items-center justify-between mb-2">
                <label className="text-label" htmlFor="password" style={{ color: 'var(--text-main)', fontSize: '13px' }}>Password</label>
                <a href="#" style={{ fontSize: '13px', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Forgot password?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    paddingLeft: '44px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--surface)',
                    fontFamily: 'inherit',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(2, 132, 199, 0.15)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.02)'; }}
                />
                <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              style={{
                height: '48px',
                fontSize: '16px',
                marginTop: '8px',
                position: 'relative',
                overflow: 'hidden'
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <div style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  Signing In...
                </div>
              ) : (
                'Sign In to Portal'
              )}
            </button>
          </form>

          <div style={{ marginTop: '40px', padding: '24px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              Demo Credentials
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ padding: '12px', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px' }}>DOCTOR</div>
                <div style={{ fontSize: '14px', fontFamily: 'monospace', color: 'var(--text-main)', fontWeight: 700 }}>Doctor / doctor</div>
              </div>
              <div style={{ padding: '12px', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px' }}>ADMIN</div>
                <div style={{ fontSize: '14px', fontFamily: 'monospace', color: 'var(--text-main)', fontWeight: 700 }}>Admin / admin</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float {
          0% { transform: rotate(-5deg) translateY(0px); }
          50% { transform: rotate(-5deg) translateY(-15px); }
          100% { transform: rotate(-5deg) translateY(0px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .left-panel { display: none !important; }
        }
      `}} />
    </div>
  );
}
