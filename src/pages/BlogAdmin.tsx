import React from 'react';
import { Toaster, toast } from 'react-hot-toast';
import '../styles/BlogAdmin.css';

const API = (
  typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.VITE_API_URL
) || (process as any).env?.REACT_APP_API_URL || 'http://localhost:5000';

type Blog = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  status: 'Draft'|'Published';
  publishedDate?: string;
  featuredImage?: string;
};

const slugify = (text: string) => text.toString().toLowerCase().trim()
  .replace(/\s+/g, '-')
  .replace(/[^a-z0-9-]/g, '')
  .replace(/--+/g, '-');

function useDebounced<T>(value: T, delay = 400) {
  const [v, setV] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

const BlogAdmin: React.FC = () => {
  const [tab, setTab] = React.useState<'new'|'all'|'drafts'>('new');
  const [token, setToken] = React.useState<string>('');

  // List state
  const [items, setItems] = React.useState<Blog[]>([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [q, setQ] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<'All'|'Published'|'Draft'>('All');
  const [sort, setSort] = React.useState<'Newest'|'Oldest'>('Newest');
  const dq = useDebounced(q, 400);

  // Form state (used for create and edit)
  const [form, setForm] = React.useState({
    title: '', slug: '', shortDescription: '', content: '', category: '', tags: '', author: 'Tanasvi Technologies', status: 'Draft' as 'Draft'|'Published', featuredImage: null as File|null,
    coverImageUrl: '', readingTime: '', metaTitle: '', metaDescription: '', publishedDate: new Date().toISOString().slice(0,10)
  });
  const [filePreview, setFilePreview] = React.useState<string>('');
  const [showPreview, setShowPreview] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [editing, setEditing] = React.useState<Blog|null>(null);
  const [showDeleteFor, setShowDeleteFor] = React.useState<Blog|null>(null);
  const [slugTaken, setSlugTaken] = React.useState(false);

  React.useEffect(() => {
    const existing = sessionStorage.getItem('ADMIN_TOKEN') || '';
    if (!existing) {
      const t = window.prompt('Enter Admin Token') || '';
      if (t) sessionStorage.setItem('ADMIN_TOKEN', t);
      setToken(t);
    } else {
      setToken(existing);
    }
  }, []);

  // Debounced slug availability check
  const dslug = useDebounced(form.slug, 400);
  React.useEffect(() => {
    if (!dslug) { setSlugTaken(false); return; }
    // If editing and slug unchanged, skip
    if (editing && editing.slug === dslug) { setSlugTaken(false); return; }
    fetch(`${API}/api/blogs/${dslug}`).then(r => {
      setSlugTaken(r.ok); // 200 -> taken, 404 -> free
    }).catch(() => setSlugTaken(false));
  }, [dslug, editing]);

  function sanitizeSlug(s: string) {
    return s.replace(/[^a-z0-9-]/g, '').replace(/--+/g, '-').replace(/^-+|-+$/g, '');
  }

  // Load list
  const loadList = React.useCallback(async () => {
    const params = new URLSearchParams();
    if (statusFilter !== 'All') params.set('status', statusFilter);
    if (dq) params.set('q', dq);
    params.set('page', String(page));
    params.set('limit', String(limit));
    params.set('sort', sort === 'Newest' ? 'new' : 'old');
    const res = await fetch(`${API}/api/blogs?${params.toString()}`);
    if (!res.ok) { toast.error('Failed to load'); return; }
    const data = await res.json();
    setItems(data.items || []);
    setTotal(data.total || 0);
  }, [API, statusFilter, dq, page, limit, sort]);

  React.useEffect(() => { if (tab !== 'new') loadList(); }, [tab, loadList]);
  React.useEffect(() => { if (tab !== 'new') loadList(); }, [dq, statusFilter, page, limit, sort]);

  // Create / Update
  async function submitCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || form.title.trim().length < 4) return toast.error('Title is too short');
    if (!form.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug)) return toast.error('Invalid slug');
    if (!form.content || form.content.replace(/<[^>]*>/g,'').trim().length < 20) return toast.error('Content is too short');
    if (!form.shortDescription || form.shortDescription.trim().length < 1) return toast.error('Short description required');
    if (!form.featuredImage && !form.coverImageUrl) return toast.error('Provide Cover Image URL or upload a file');
    if (slugTaken) return toast.error('Slug already taken');
    try {
      setSubmitting(true);
      const fd = new FormData();
      Object.entries({
        title: form.title,
        slug: sanitizeSlug(form.slug),
        shortDescription: form.shortDescription,
        content: form.content,
        category: form.category,
        tags: form.tags,
        author: form.author,
        status: form.status,
        coverImageUrl: form.coverImageUrl,
        readingTime: form.readingTime,
        metaTitle: form.metaTitle || form.title,
        metaDescription: form.metaDescription || form.shortDescription,
        publishedDate: form.publishedDate ? new Date(form.publishedDate).toISOString() : ''
      }).forEach(([k,v]) => fd.append(k, String(v)));
      if (form.featuredImage) fd.append('featuredImage', form.featuredImage);
      const res = await fetch(`${API}/api/blogs`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
      if (res.status === 401) { sessionStorage.removeItem('ADMIN_TOKEN'); toast.error('Unauthorized'); return; }
      if (!res.ok) { const j = await res.json().catch(()=>({error:'Create failed'})); throw new Error(j.error); }
      toast.success('Created');
      setForm({ title:'', slug:'', shortDescription:'', content:'', category:'', tags:'', author:'Tanasvi Technologies', status:'Draft', featuredImage:null, coverImageUrl:'', readingTime:'', metaTitle:'', metaDescription:'', publishedDate: new Date().toISOString().slice(0,10) });
      setFilePreview('');
    } catch (err:any) {
      toast.error(err?.message || 'Create failed');
    } finally { setSubmitting(false); }
  }

  async function submitUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    if (!editing.title || editing.title.trim().length < 4) return toast.error('Title is too short');
    if (!editing.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(editing.slug)) return toast.error('Invalid slug');
    if (!editing.content || editing.content.trim().length < 20) return toast.error('Content is too short');
    try {
      const body: any = { ...editing, tags: editing.tags };
      if (Array.isArray(body.tags)) body.tags = body.tags.join(',');
      const res = await fetch(`${API}/api/blogs/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(body) });
      if (res.status === 401) { sessionStorage.removeItem('ADMIN_TOKEN'); toast.error('Unauthorized'); return; }
      if (!res.ok) { const j = await res.json().catch(()=>({error:'Update failed'})); throw new Error(j.error); }
      toast.success('Updated');
      setEditing(null);
      if (tab !== 'new') loadList();
    } catch (err:any) {
      toast.error(err?.message || 'Update failed');
    }
  }

  async function confirmDelete() {
    if (!showDeleteFor) return;
    try {
      const res = await fetch(`${API}/api/blogs/${showDeleteFor.id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 401) { sessionStorage.removeItem('ADMIN_TOKEN'); toast.error('Unauthorized'); return; }
      if (!res.ok) { const j = await res.json().catch(()=>({error:'Delete failed'})); throw new Error(j.error); }
      toast.success('Deleted');
      setShowDeleteFor(null);
      setItems(prev => prev.filter(x => x.id !== showDeleteFor.id));
      setTotal(t => Math.max(0, t - 1));
    } catch (err:any) { toast.error(err?.message || 'Delete failed'); }
  }

  // UI Helpers
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="admin-wrap">
      <Toaster position="top-right" />
      <aside className="admin-sidebar">
        <div className="admin-brand">Blog Admin</div>
        <div className="admin-nav">
          <button className={tab==='new'?'active':''} onClick={() => setTab('new')}>Post New Blog</button>
          <button className={tab==='all'?'active':''} onClick={() => setTab('all')}>All Blogs</button>
          <button className={tab==='drafts'?'active':''} onClick={() => { setStatusFilter('Draft'); setTab('drafts'); }}>Drafts</button>
        </div>
      </aside>
      <main className="admin-content">
        {tab === 'new' && (
          <div className="admin-card">
            <h2 style={{ color: '#003B95', marginBottom: 12 }}>Create New Post</h2>
            <form onSubmit={submitCreate} className="form-grid">
              <div className="form-row">
                <label>Title</label>
                <input value={form.title} onChange={(e) => {
                  const v = e.target.value; setForm(f => ({ ...f, title: v }));
                  if (!form.slug || form.slug === slugify(form.title)) setForm(f => ({ ...f, slug: slugify(v) }));
                }} required />
              </div>
              <div className="form-row">
                <label>Slug</label>
                <input value={form.slug} onChange={(e) => setForm(f => ({ ...f, slug: sanitizeSlug(e.target.value) }))} required />
                {form.slug && slugTaken && <span className="error">Slug already taken</span>}
              </div>
              <div className="form-row full">
                <label>Short Description <span style={{ fontWeight: 400, color: '#64748b' }}>({form.shortDescription.length}/240)</span></label>
                <textarea rows={3} maxLength={240} value={form.shortDescription} onChange={(e) => setForm(f => ({ ...f, shortDescription: e.target.value }))} required />
                {form.shortDescription.length > 220 && <span className="error">Recommended ≤ 220 characters</span>}
              </div>
              <div className="form-row full">
                <label>Content (HTML allowed)</label>
                <textarea rows={10} value={form.content} onChange={(e) => setForm(f => ({ ...f, content: e.target.value }))} required />
              </div>
              <div className="form-row">
                <label>Category</label>
                <select value={form.category} onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}>
                  <option value="">— Select —</option>
                  <option>Technology</option>
                  <option>AI</option>
                  <option>Business</option>
                </select>
              </div>
              <div className="form-row">
                <label>Tags (comma-separated)</label>
                <input value={form.tags} onChange={(e) => setForm(f => ({ ...f, tags: e.target.value }))} />
              </div>
              <div className="form-row">
                <label>Author</label>
                <input value={form.author} onChange={(e) => setForm(f => ({ ...f, author: e.target.value }))} />
              </div>
              <div className="form-row">
                <label>Status</label>
                <select value={form.status} onChange={(e) => setForm(f => ({ ...f, status: e.target.value as 'Draft'|'Published' }))}>
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>
              <div className="form-row">
                <label>Date</label>
                <input type="date" value={form.publishedDate} onChange={(e) => setForm(f => ({ ...f, publishedDate: e.target.value }))} />
              </div>
              <div className="form-row">
                <label>Reading Time</label>
                <input placeholder="e.g., 5 min read" value={form.readingTime} onChange={(e) => setForm(f => ({ ...f, readingTime: e.target.value }))} />
              </div>
              <div className="form-row full">
                <label>Meta Title</label>
                <input value={form.metaTitle} onChange={(e) => setForm(f => ({ ...f, metaTitle: e.target.value }))} />
              </div>
              <div className="form-row full">
                <label>Meta Description</label>
                <textarea rows={2} value={form.metaDescription} onChange={(e) => setForm(f => ({ ...f, metaDescription: e.target.value }))} />
              </div>
              <div className="form-row full">
                <label>Cover Image URL</label>
                <input placeholder="https://..." value={form.coverImageUrl} onChange={(e) => setForm(f => ({ ...f, coverImageUrl: e.target.value }))} />
                {form.coverImageUrl && (
                  <div style={{ marginTop: 8 }}>
                    <img src={form.coverImageUrl} alt="cover preview" style={{ maxWidth: '100%', borderRadius: 8 }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display='none'; }} />
                  </div>
                )}
              </div>
              <div className="form-row full">
                <label>Featured Image</label>
                <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  if (file && file.size > 5*1024*1024) { toast.error('Image too large'); return; }
                  setForm(f => ({ ...f, featuredImage: file }));
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setFilePreview(url);
                  } else {
                    setFilePreview('');
                  }
                }} />
                {filePreview && (
                  <div style={{ marginTop: 8 }}>
                    <img src={filePreview} alt="file preview" style={{ maxWidth: '100%', borderRadius: 8 }} />
                  </div>
                )}
              </div>
              <div className="form-row full" style={{ display:'flex', gap: 8 }}>
                <button className="btn btn-primary" disabled={submitting || slugTaken} type="submit">{submitting ? 'Submitting…' : (form.status === 'Published' ? 'Publish Now' : 'Save as Draft')}</button>
                <button className="btn btn-ghost" type="button" onClick={() => { setForm({ title:'', slug:'', shortDescription:'', content:'', category:'', tags:'', author:'Tanasvi Technologies', status:'Draft', featuredImage:null, coverImageUrl:'', readingTime:'', metaTitle:'', metaDescription:'', publishedDate: new Date().toISOString().slice(0,10) }); setFilePreview(''); }}>Clear</button>
                <button className="btn btn-ghost" type="button" onClick={() => setShowPreview(true)}>Preview Blog</button>
              </div>
            </form>
          </div>
        )}

        {(tab === 'all' || tab === 'drafts') && (
          <div className="admin-card">
            <h2 style={{ color: '#003B95', marginBottom: 12 }}>{tab === 'drafts' ? 'Drafts' : 'All Blogs'}</h2>
            <div className="admin-toolbar">
              <input placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}>
                <option>All</option>
                <option>Published</option>
                <option>Draft</option>
              </select>
              <select value={sort} onChange={(e) => setSort(e.target.value as any)}>
                <option>Newest</option>
                <option>Oldest</option>
              </select>
              <select value={limit} onChange={(e) => { setPage(1); setLimit(parseInt(e.target.value, 10)); }}>
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
                <option value={50}>50 / page</option>
              </select>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Published</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((b) => (
                  <tr key={b.id}>
                    <td>{b.title}</td>
                    <td>{b.status}</td>
                    <td>{b.category}</td>
                    <td>{b.author}</td>
                    <td>{b.publishedDate ? new Date(b.publishedDate).toLocaleDateString() : ''}</td>
                    <td>
                      <div className="admin-actions">
                        <button className="btn btn-ghost" onClick={() => setEditing(b)}>Edit</button>
                        <button className="btn btn-ghost" onClick={() => setShowDeleteFor(b)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop: 10 }}>
              <div>Page {page} of {totalPages} • {total} total</div>
              <div style={{ display:'flex', gap: 6 }}>
                <button className="btn btn-ghost" disabled={page<=1} onClick={() => setPage(p => Math.max(1, p-1))}>Prev</button>
                <button className="btn btn-ghost" disabled={page>=totalPages} onClick={() => setPage(p => Math.min(totalPages, p+1))}>Next</button>
              </div>
            </div>
          </div>
        )}

        {editing && (
          <div className="modal" onClick={() => setEditing(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <h3 style={{ color:'#003B95', marginBottom: 8 }}>Edit Post</h3>
              <form onSubmit={submitUpdate} className="form-grid">
                <div className="form-row">
                  <label>Title</label>
                  <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} required />
                </div>
                <div className="form-row">
                  <label>Slug</label>
                  <input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: sanitizeSlug(e.target.value) })} required />
                </div>
                <div className="form-row full">
                  <label>Short Description</label>
                  <textarea rows={3} value={editing.shortDescription} onChange={(e) => setEditing({ ...editing, shortDescription: e.target.value })} required />
                </div>
                <div className="form-row full">
                  <label>Content</label>
                  <textarea rows={10} value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} required />
                </div>
                <div className="form-row">
                  <label>Category</label>
                  <input value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} />
                </div>
                <div className="form-row">
                  <label>Tags</label>
                  <input value={editing.tags?.join(',') || ''} onChange={(e) => setEditing({ ...editing, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} />
                </div>
                <div className="form-row">
                  <label>Author</label>
                  <input value={editing.author} onChange={(e) => setEditing({ ...editing, author: e.target.value })} />
                </div>
                <div className="form-row">
                  <label>Status</label>
                  <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as any })}>
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
                <div className="form-row full" style={{ display:'flex', gap: 8 }}>
                  <button className="btn btn-primary" type="submit">Save</button>
                  <button className="btn btn-ghost" type="button" onClick={() => setEditing(null)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showDeleteFor && (
          <div className="modal" onClick={() => setShowDeleteFor(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <h3 style={{ color:'#003B95' }}>Delete Post</h3>
              <p>Type DELETE to confirm.</p>
              <input placeholder="DELETE" onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const v = (e.target as HTMLInputElement).value.trim();
                  if (v === 'DELETE') confirmDelete(); else toast.error('Type DELETE to confirm');
                }
              }} />
              <div style={{ display:'flex', gap: 8, marginTop: 10 }}>
                <button className="btn btn-primary" onClick={confirmDelete}>Confirm</button>
                <button className="btn btn-ghost" onClick={() => setShowDeleteFor(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
        {showPreview && (
          <div className="modal" onClick={() => setShowPreview(false)}>
            <div className="modal-card" style={{ maxWidth: 900 }} onClick={(e) => e.stopPropagation()}>
              <h2 style={{ color: '#003B95', marginBottom: 8 }}>{form.title || 'Preview'}</h2>
              <p style={{ color: '#475569', marginTop: 0 }}>{form.author} • {form.publishedDate}</p>
              {(filePreview || form.coverImageUrl) && (
                <div style={{ margin: '8px 0' }}>
                  <img src={filePreview || form.coverImageUrl} alt="cover" style={{ width: '100%', borderRadius: 12 }} />
                </div>
              )}
              <div style={{ color: '#0b1a33', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: (form.content || '').replace(/<script[^>]*>[\s\S]*?<\/script>/gi,'') }} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogAdmin;


