import React, { useEffect, useMemo, useState } from 'react';

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
    <div className="px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-[#003B95] mb-4">Analytics Dashboard</h1>
        {loading && <div className="text-gray-600">Loading…</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white shadow rounded p-4">
                <div className="text-sm text-gray-500">Total Visits</div>
                <div className="text-3xl font-bold text-[#003B95]">{summary.total || 0}</div>
              </div>
              <div className="bg-white shadow rounded p-4 md:col-span-2">
                <div className="text-sm text-gray-500 mb-2">Most Visited Pages</div>
                <div className="space-y-2">
                  {topPages.length === 0 && <div className="text-gray-500">No data</div>}
                  {topPages.map((row) => (
                    <div key={row.page} className="flex items-center gap-3">
                      <div className="w-40 text-sm text-gray-700 truncate">{row.page}</div>
                      <div className="flex-1 h-3 bg-[#EAF4FF] rounded">
                        <div className="h-3 bg-[#3c72fc] rounded" style={{ width: `${Math.min(100, (row.count / (topPages[0]?.count || 1)) * 100)}%` }} />
                      </div>
                      <div className="w-10 text-right text-sm text-gray-600">{row.count}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded p-4">
              <div className="text-sm text-gray-500 mb-3">Recent Visits</div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="py-2 pr-4">Page</th>
                      <th className="py-2 pr-4">IP</th>
                      <th className="py-2 pr-4">User-Agent</th>
                      <th className="py-2 pr-4">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(visits || []).slice(0, 50).map((v) => (
                      <tr key={v._id} className="border-b last:border-0">
                        <td className="py-2 pr-4 text-[#003B95] font-medium">{v.page}</td>
                        <td className="py-2 pr-4">{v.ip}</td>
                        <td className="py-2 pr-4 truncate max-w-[420px]">{v.userAgent}</td>
                        <td className="py-2 pr-4">{new Date(v.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;


