import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TAG_OPTIONS = [
  'Rust', 'Go', 'TypeScript', 'Python',
  'Distributed Systems', 'Infrastructure', 'Performance',
  'Kubernetes', 'AWS', 'Data Engineering',
  'Career', 'Engineering Leadership', 'WebAssembly',
  'CRDTs', 'SQL', 'Edge Computing', 'Cost',
]

export default function CreateBlog() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    readTime: '',
    tags: [],
    published: false,

  })

  const [selectedTags, setSelectedTags] = useState([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('write')

  const toggleTag = (t) =>
    setSelectedTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  form.tags = selectedTags;

  const handleChange = (field, value) =>
    setForm(prev => ({ ...prev, [field]: value }))


  const handleSubmit = async (e) => {
    e.preventDefault()
    // setSaving(true)
    const response = await fetch('/api/create-post/', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
      credentials: 'include'
    });
    if (response.ok) {
      setSaved(true);
      setSaving(false)
      navigate('/admin')
    } else {
      setSaved(false);
      setSaving(false)
      form = setForm();
    }
  }

  if (saved) {
    return (
      <div className="min-h-[calc(100vh-56px)] flex items-center justify-center">
        <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono-custom)' }}>
          <div style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }}>✓</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>Post {form.published ? 'published' : 'saved as draft'}. Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Admin</p>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em' }}>New Blog Post</h1>
        </div>
        <button
          onClick={() => navigate('/admin')}
          style={ghostBtn}
        >
          ← Dashboard
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
        {/* Title bar */}
        <div style={{ background: 'var(--card)', padding: '1.25rem 1.5rem', borderBottom: 'none' }}>
          <input
            required
            value={form.title}
            onChange={e => handleChange('title', e.target.value)}
            placeholder="Post title..."
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              color: 'var(--foreground)',
              fontSize: '1.5rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              outline: 'none',
            }}
          />
        </div>

        {/* Excerpt */}
        <div style={{ background: 'var(--card)', padding: '1rem 1.5rem' }}>
          <label style={labelStyle}>Excerpt</label>
          <input
            value={form.excerpt}
            onChange={e => handleChange('excerpt', e.target.value)}
            placeholder="One-paragraph summary shown in blog listings..."
            style={{ ...inputStyle, marginTop: '0.4rem' }}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          />
        </div>

        {/* Editor */}
        <div style={{ background: 'var(--card)', padding: '1rem 1.5rem' }}>
          <div className="flex items-center justify-between mb-3">
            <label style={labelStyle}>Content (Markdown)</label>
            <div className="flex" style={{ border: '1px solid var(--border)' }}>
              {(['write', 'preview']).map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  style={{
                    fontFamily: 'var(--font-mono-custom)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.08em',
                    padding: '4px 12px',
                    border: 'none',
                    background: activeTab === tab ? 'var(--primary)' : 'transparent',
                    color: activeTab === tab ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    transition: 'all 0.15s',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'write' ? (
            <textarea
              value={form.content}
              onChange={e => handleChange('content', e.target.value)}
              placeholder={`## Introduction\n\nStart writing your post here...\n\n\`\`\`go\nfunc main() {\n  fmt.Println("Hello, World!")\n}\n\`\`\``}
              rows={16}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7, paddingTop: '0.75rem' }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
          ) : (
            <div
              style={{
                minHeight: '320px',
                padding: '1rem',
                border: '1px solid var(--border)',
                background: 'var(--background)',
                color: 'var(--secondary-foreground)',
                fontSize: '0.85rem',
                lineHeight: 1.75,
                whiteSpace: 'pre-wrap',
                fontFamily: 'var(--font-body)',
              }}
            >
              {form.content || <span style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-mono-custom)', fontSize: '0.75rem' }}>Nothing to preview yet.</span>}
            </div>
          )}
        </div>

        {/* Meta */}
        <div style={{ background: 'var(--card)', padding: '1rem 1.5rem' }}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Cover Image URL</label>
              <input
                type="url"
                value={form.coverImage}
                onChange={e => handleChange('coverImage', e.target.value)}
                placeholder="https://images.unsplash.com/..."
                style={{ ...inputStyle, marginTop: '0.4rem' }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>
            <div>
              <label style={labelStyle}>Read Time</label>
              <input
                value={form.readTime}
                onChange={e => handleChange('readTime', e.target.value)}
                placeholder="8 min"
                style={{ ...inputStyle, marginTop: '0.4rem' }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div style={{ background: 'var(--card)', padding: '1rem 1.5rem' }}>
          <label style={labelStyle}>Tags ({selectedTags.length} selected)</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {TAG_OPTIONS.map(t => {
              const active = selectedTags.includes(t)
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTag(t)}
                  style={{
                    fontFamily: 'var(--font-mono-custom)',
                    fontSize: '0.65rem',
                    padding: '3px 10px',
                    border: '1px solid',
                    borderColor: active ? 'var(--primary)' : 'var(--border)',
                    color: active ? 'var(--primary)' : 'var(--muted-foreground)',
                    background: 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {t}
                </button>
              )
            })}
          </div>
        </div>

        {/* Publish toggle + actions */}
        <div style={{ background: 'var(--card)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => { handleChange('published', !form.published), console.log(form.published) }}
              style={{
                width: 36,
                height: 20,
                borderRadius: 10,
                background: form.published ? 'var(--primary)' : 'var(--secondary)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s',
                flexShrink: 0,
              }}
            >
              <span style={{
                position: 'absolute',
                top: 2,
                left: form.published ? 18 : 2,
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: form.published ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                transition: 'left 0.2s',
              }} />
            </button>
            <span style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>
              {form.published ? 'Publish immediately' : 'Save as draft'}
            </span>
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={() => navigate('/admin')} style={ghostBtn}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.7rem', letterSpacing: '0.1em', padding: '8px 20px', background: saving ? 'var(--muted)' : 'var(--primary)', color: 'var(--primary-foreground)', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', textTransform: 'uppercase', transition: 'opacity 0.15s' }}
            >
              {saving ? 'Saving...' : form.published ? 'Publish Post' : 'Save Draft'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

const labelStyle = {
  fontFamily: 'var(--font-mono-custom)',
  fontSize: '0.62rem',
  letterSpacing: '0.1em',
  color: 'var(--muted-foreground)',
  textTransform: 'uppercase',
  display: 'block',
}

const inputStyle = {
  width: '100%',
  padding: '0.55rem 0.75rem',
  background: 'var(--background)',
  border: '1px solid var(--border)',
  color: 'var(--foreground)',
  fontFamily: 'var(--font-mono-custom)',
  fontSize: '0.8rem',
  outline: 'none',
  transition: 'border-color 0.15s',
}

const ghostBtn = {
  fontFamily: 'var(--font-mono-custom)',
  fontSize: '0.65rem',
  color: 'var(--muted-foreground)',
  background: 'none',
  border: '1px solid var(--border)',
  padding: '6px 12px',
  cursor: 'pointer',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  transition: 'all 0.15s',
}
