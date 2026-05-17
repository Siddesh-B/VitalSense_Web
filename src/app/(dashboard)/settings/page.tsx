import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Settings() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('auth');

  // Restrict access to Admin only
  if (auth?.value !== 'Admin') {
    redirect('/');
  }

  return (
    <div className="flex" style={{ flexDirection: 'column', gap: 'var(--spacing-base)' }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-h2" style={{ marginBottom: '8px' }}>Admin Settings</h1>
          <p className="text-muted">Manage system configuration and user preferences.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid-container">
        <div className="col-8">
          <div className="card mb-6">
            <h2 className="text-h3 mb-4">Notification Preferences</h2>
            
            <div className="flex items-center justify-between py-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <div>
                <div className="font-600 mb-1">Critical Alerts</div>
                <div className="text-muted text-body">Receive SMS and Email for critical patient alerts.</div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
              </label>
            </div>

            <div className="flex items-center justify-between py-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <div>
                <div className="font-600 mb-1">Daily Summary Report</div>
                <div className="text-muted text-body">Receive a daily summary of patient status at 8:00 AM.</div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
              </label>
            </div>

            <div className="flex items-center justify-between py-4">
              <div>
                <div className="font-600 mb-1">System Updates</div>
                <div className="text-muted text-body">Receive notifications about MedMonitor updates and maintenance.</div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
              </label>
            </div>
          </div>

          <div className="card">
            <h2 className="text-h3 mb-4">Security</h2>
            <div className="flex items-center justify-between py-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <div>
                <div className="font-600 mb-1">Two-Factor Authentication</div>
                <div className="text-muted text-body">Enhance account security by requiring a 2FA code.</div>
              </div>
              <button className="btn btn-secondary">Enable 2FA</button>
            </div>
            <div className="flex items-center justify-between py-4">
              <div>
                <div className="font-600 mb-1">Change Password</div>
                <div className="text-muted text-body">Update your account password.</div>
              </div>
              <button className="btn btn-secondary">Update</button>
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="card flex items-center justify-center" style={{ flexDirection: 'column', gap: '16px', textAlign: 'center' }}>
            <div className="avatar" style={{ width: '80px', height: '80px', fontSize: '28px' }}>AD</div>
            <div>
              <h3 className="text-h3" style={{ margin: 0 }}>System Admin</h3>
              <p className="text-muted text-body mt-1">IT Operations</p>
            </div>
            <button className="btn btn-secondary w-full">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}
