'use client';

import React, { useState } from 'react';

interface TabsProps {
  tabs: Array<{
    id: string;
    label: string;
    content: React.ReactNode;
  }>;
  defaultTab?: string;
}

export default function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className="card">
      {/* Tab navigation */}
      <div className="card-header border-bottom" style={{ paddingBottom: 0 }}>
        <div className="flex gap-0" style={{ borderBottom: '1px solid var(--border)' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 24px',
                paddingBottom: '11px',
                backgroundColor: activeTab === tab.id ? 'transparent' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeTab === tab.id ? 600 : 500,
                color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-secondary)',
                transition: 'all 0.2s ease',
                position: 'relative',
                bottom: '-1px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            style={{
              display: activeTab === tab.id ? 'block' : 'none'
            }}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
