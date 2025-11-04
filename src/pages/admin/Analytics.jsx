import React, { useEffect, useMemo, useState } from 'react';
import './Analytics.css';

const getBaseUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) return import.meta.env.VITE_API_URL;
  return 'http://localhost:5000';
};

const fetchJson = async (endpoint, signal) => {
  const base = getBaseUrl().replace(/\/$/, '');
  const res = await fetch(`${base}${endpoint}`, { signal });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
};

const Analytics = () => {
  const [visits, setVisits] = useState([]);
  const [summary, setSummary] = useState({ total: 0, topPages: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const [all, sum] = await Promise.all([
          fetchJson('/api/analytics', controller.signal),
          fetchJson('/api/analytics/summary', controller.signal),
        ]);
        setVisits(all.items || []);
        setSummary(sum || { total: 0, topPages: [] });
      } catch (e) {
        if (e?.name !== 'AbortError') setError(e?.message || 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  const topPages = useMemo(() => {
    return (summary.topPages || []).map((p) => ({ page: p._id, count: p.count }));
  }, [summary]);

  return (
    <div className="analytics-page">
      <div className="analytics-container">
        <div className="analytics-header">
          <h1 className="analytics-title">
            <i className="fa-solid fa-chart-line"></i>
            Analytics Dashboard
          </h1>
          <p className="analytics-subtitle">Track and analyze website visitor data</p>
        </div>

        {loading && (
          <div className="analytics-loading">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading analytics data...</p>
          </div>
        )}

        {error && (
          <div className="analytics-error">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="analytics-stats-grid">
              <div className="stat-card stat-card-primary">
                <div className="stat-icon">
                  <i className="fa-solid fa-users"></i>
                </div>
                <div className="stat-content">
                  <div className="stat-label">Total Visits</div>
                  <div className="stat-value">{summary.total || 0}</div>
                </div>
              </div>

              <div className="stat-card stat-card-secondary">
                <div className="stat-icon">
                  <i className="fa-solid fa-file-lines"></i>
                </div>
                <div className="stat-content">
                  <div className="stat-label">Pages Tracked</div>
                  <div className="stat-value">{topPages.length}</div>
                </div>
              </div>

              <div className="stat-card stat-card-tertiary">
                <div className="stat-icon">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div className="stat-content">
                  <div className="stat-label">Recent Visits</div>
                  <div className="stat-value">{Math.min(visits.length, 50)}</div>
                </div>
              </div>
            </div>

            <div className="analytics-card">
              <div className="card-header">
                <h2 className="card-title">
                  <i className="fa-solid fa-fire"></i>
                  Most Visited Pages
                </h2>
              </div>
              <div className="card-body">
                {topPages.length === 0 ? (
                  <div className="empty-state">
                    <i className="fa-solid fa-inbox"></i>
                    <p>No page visit data available</p>
                  </div>
                ) : (
                  <div className="top-pages-list">
                    {topPages.map((row, index) => (
                      <div key={row.page} className="top-page-item">
                        <div className="page-rank">#{index + 1}</div>
                        <div className="page-info">
                          <div className="page-name">{row.page}</div>
                          <div className="page-visits">{row.count} {row.count === 1 ? 'visit' : 'visits'}</div>
                        </div>
                        <div className="page-bar-container">
                          <div 
                            className="page-bar" 
                            style={{ width: `${Math.min(100, (row.count / (topPages[0]?.count || 1)) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="analytics-card">
              <div className="card-header">
                <h2 className="card-title">
                  <i className="fa-solid fa-list"></i>
                  Recent Visits (Last 50)
                </h2>
              </div>
              <div className="card-body">
                {visits.length === 0 ? (
                  <div className="empty-state">
                    <i className="fa-solid fa-inbox"></i>
                    <p>No visit records available</p>
                  </div>
                ) : (
                  <div className="table-wrapper">
                    <table className="analytics-table">
                      <thead>
                        <tr>
                          <th>Page</th>
                          <th>IP Address</th>
                          <th>User Agent</th>
                          <th>Timestamp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visits.slice(0, 50).map((v, index) => (
                          <tr key={v._id || index}>
                            <td className="page-cell">
                              <i className="fa-solid fa-file"></i>
                              <span>{v.page}</span>
                            </td>
                            <td className="ip-cell">
                              <i className="fa-solid fa-network-wired"></i>
                              <span>{v.ip}</span>
                            </td>
                            <td className="user-agent-cell">
                              <i className="fa-solid fa-desktop"></i>
                              <span title={v.userAgent}>{v.userAgent}</span>
                            </td>
                            <td className="time-cell">
                              <i className="fa-solid fa-clock"></i>
                              <span>{new Date(v.createdAt).toLocaleString()}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;


