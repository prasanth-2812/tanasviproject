import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CareerApplications.css';

const API = (
  typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.VITE_API_URL
) || (process as any).env?.REACT_APP_API_URL || 'http://localhost:5000';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return API;
};

const CareerApplications: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  useEffect(() => {
    const existing = sessionStorage.getItem('ADMIN_TOKEN') || '';
    if (!existing) {
      const t = window.prompt('Enter Admin Token') || '';
      if (t) sessionStorage.setItem('ADMIN_TOKEN', t);
      setToken(t);
    } else {
      setToken(existing);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    loadApplications();
  }, [token, statusFilter, page]);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError('');
      const params = new URLSearchParams();
      if (statusFilter !== 'All') params.set('status', statusFilter);
      params.set('page', String(page));
      params.set('limit', '20');

      const res = await fetch(`${API}/api/career/applications?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.status === 401) {
        sessionStorage.removeItem('ADMIN_TOKEN');
        setError('Unauthorized. Please refresh and enter the correct admin token.');
        return;
      }

      if (!res.ok) {
        throw new Error('Failed to load applications');
      }

      const data = await res.json();
      setApplications(data.applications || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (e: any) {
      setError(e?.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`${API}/api/career/applications/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) throw new Error('Failed to update status');
      
      await loadApplications();
    } catch (e: any) {
      alert('Failed to update status: ' + (e?.message || 'Unknown error'));
    }
  };

  const deleteApplication = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;

    try {
      const res = await fetch(`${API}/api/career/applications/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Failed to delete application');
      
      await loadApplications();
    } catch (e: any) {
      alert('Failed to delete: ' + (e?.message || 'Unknown error'));
    }
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return 'Unknown';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      'New': '#384bff',
      'Reviewed': '#17a2b8',
      'Contacted': '#ffc107',
      'Rejected': '#dc3545',
      'Hired': '#28a745'
    };
    return colors[status] || '#6c757d';
  };

  const getResumeUrl = (resumePath: string) => {
    if (!resumePath) return '';
    if (resumePath.startsWith('http')) return resumePath;
    return `${getBaseUrl()}${resumePath}`;
  };

  return (
    <div className="career-applications-page">
      <div className="applications-container">
        <div className="applications-header">
          <h1 className="applications-title">
            <i className="fa-solid fa-briefcase"></i>
            Career Applications Dashboard
          </h1>
          <p className="applications-subtitle">View and manage all job applications</p>
        </div>

        {loading && (
          <div className="applications-loading">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading applications...</p>
          </div>
        )}

        {error && (
          <div className="applications-error">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="applications-filters">
              <div className="filter-group">
                <label>Filter by Status:</label>
                <select 
                  value={statusFilter} 
                  onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                  className="status-filter"
                >
                  <option value="All">All Applications</option>
                  <option value="New">New</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Hired">Hired</option>
                </select>
              </div>
              <div className="applications-count">
                <strong>{total}</strong> total application{total !== 1 ? 's' : ''}
              </div>
            </div>

            {applications.length === 0 ? (
              <div className="empty-state">
                <i className="fa-solid fa-inbox"></i>
                <p>No applications found</p>
              </div>
            ) : (
              <div className="applications-grid">
                {applications.map((app, index) => (
                  <motion.div
                    key={app.id}
                    className="application-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div className="application-header">
                      <div className="application-name-section">
                        <h3 className="applicant-name">{app.name}</h3>
                        <span 
                          className="status-badge" 
                          style={{ backgroundColor: getStatusColor(app.status) }}
                        >
                          {app.status}
                        </span>
                      </div>
                      <div className="application-actions">
                        <select
                          value={app.status}
                          onChange={(e) => updateStatus(app.id, e.target.value)}
                          className="status-select"
                          style={{ borderColor: getStatusColor(app.status) }}
                        >
                          <option value="New">New</option>
                          <option value="Reviewed">Reviewed</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Hired">Hired</option>
                        </select>
                        <button
                          className="delete-btn"
                          onClick={() => deleteApplication(app.id)}
                          title="Delete application"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>

                    <div className="application-details">
                      <div className="detail-row">
                        <i className="fa-solid fa-envelope"></i>
                        <span className="detail-label">Email:</span>
                        <a href={`mailto:${app.email}`} className="detail-value">{app.email}</a>
                      </div>
                      <div className="detail-row">
                        <i className="fa-solid fa-phone"></i>
                        <span className="detail-label">Phone:</span>
                        <a href={`tel:${app.phone}`} className="detail-value">{app.phone}</a>
                      </div>
                      <div className="detail-row">
                        <i className="fa-solid fa-briefcase"></i>
                        <span className="detail-label">Position:</span>
                        <span className="detail-value">{app.position}</span>
                      </div>
                      {app.message && (
                        <div className="detail-row message-row">
                          <i className="fa-solid fa-comment"></i>
                          <span className="detail-label">Message:</span>
                          <span className="detail-value message-text">{app.message}</span>
                        </div>
                      )}
                      <div className="detail-row">
                        <i className="fa-solid fa-calendar"></i>
                        <span className="detail-label">Applied:</span>
                        <span className="detail-value">
                          {new Date(app.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="application-resume">
                      <div className="resume-header">
                        <i className="fa-solid fa-file-pdf"></i>
                        <span className="resume-label">Resume:</span>
                        <span className="resume-filename">{app.resumeFileName}</span>
                        <span className="resume-size">({formatFileSize(app.resumeFileSize)})</span>
                      </div>
                      <div className="resume-actions">
                        <a
                          href={getResumeUrl(app.resumePath)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="resume-btn view-btn"
                        >
                          <i className="fa-solid fa-eye"></i> View
                        </a>
                        <a
                          href={getResumeUrl(app.resumePath)}
                          download={app.resumeFileName}
                          className="resume-btn download-btn"
                        >
                          <i className="fa-solid fa-download"></i> Download
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="page-btn"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <i className="fa-solid fa-chevron-left"></i> Previous
                </button>
                <span className="page-info">
                  Page {page} of {totalPages}
                </span>
                <button
                  className="page-btn"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CareerApplications;

