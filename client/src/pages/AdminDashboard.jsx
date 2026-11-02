import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const staticStats = [
  { label: 'Total Projects', value: '42', delta: '+3 this month', up: true },
  { label: 'Blog Posts', value: '18', delta: '+2 this month', up: true },
  { label: 'Page Views', value: '24,810', delta: '+12% vs last month', up: true },
  { label: 'Avg Read Time', value: '9.4m', delta: '-0.3 vs last month', up: false },
]

const recentProjects = [
  { title: 'Distributed Cache Engine', status: 'Production', views: 1420, tech: "React Node, JS, Python", year: '2026-07-01' },
  { title: 'ML Pipeline Orchestrator', status: 'Production', views: 980, tech: "React Node, JS, Python", year: '2026-06-15' },
  { title: 'Real-time Collaboration SDK', status: 'Open Source', views: 2100, tech: "React Node, JS, Python", year: '2026-05-30' },
  { title: 'Observability Platform', status: 'Production', views: 760, tech: "React Node, JS, Python", year: '2026-05-10' },
  { title: 'Auth Service (WIP)', status: 'In Progress', views: 120, tech: "React Node, JS, Python", year: '2026-07-20' },
]

const recentPosts = [
  { title: 'Why I Rewrote Our Cache in Rust', status: 'Published', views: 4820, year: '2026-07-14' },
  { title: 'CRDTs in Production: Lessons After 18 Months', status: 'Published', views: 3210, year: '2026-06-02' },
  { title: 'Kubernetes Cost Optimization', status: 'Published', views: 2980, year: '2026-05-18' },
  { title: 'Draft: gRPC vs REST in 2026', status: 'Draft', views: 0, year: '2026-07-28' },
]

const activityLog = [
  { event: 'Post published', detail: '"Why I Rewrote Our Cache in Rust"', time: '2 days ago' },
  { event: 'Project updated', detail: 'Distributed Cache Engine — status → Production', time: '4 days ago' },
  { event: 'Login', detail: 'taeb4all@gmail.com from 192.168.1.1', time: '5 days ago' },
  { event: 'Post drafted', detail: '"gRPC vs REST in 2026"', time: '1 week ago' },
  { event: 'Project created', detail: 'Auth Service (WIP)', time: '2 weeks ago' },
]

const statusColor = {
  Production: '#00e676',
  'Open Source': '#64b5f6',
  'In Progress': '#ffb74d',
  Archived: '#9e9e9e',
  Concept: '#ce93d8',
  Published: '#00e676',
  Draft: '#ffb74d',
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const lastLogin = Date();
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [projectCount, setProjectCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const [getProjectsResponse, getPostsResponse] = await Promise.all([
        fetch('/api/get-projects/'),
        fetch('/api/get-posts/'),
      ]);
      try {
        setLoading(true);
        const _projects = await getProjectsResponse.json();
        const _posts = await getPostsResponse.json();
        if (_projects.statusCode === 201) {
          setProjects(_projects.projects);
          setProjectCount(projects.length)
        }
        if(_posts.statusCode === 201){
          setPosts(_posts.posts);
          setPostCount(posts.length);
        
        }        
      } catch (err) {
        setError('Failed to load');
      }
      finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);


  return (

    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
        <div>
          <p style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            Admin Panel
          </p>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, letterSpacing: '-0.03em' }}>Dashboard</h1>
          <p style={{ color: 'var(--muted-foreground)', fontSize: '0.8rem', marginTop: '0.25rem', fontFamily: 'var(--font-mono-custom)' }}>
            Last login:{lastLogin}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => navigate('/admin/create-project')} style={primaryBtn}>
            + New Project
          </button>
          <button onClick={() => navigate('/admin/create-blog')} style={secondaryBtn}>
            + New Post
          </button>
          <button
            onClick={() => navigate('/')}
            style={ghostBtn}
          >
            View Site
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-px" style={{ background: 'var(--border)' }}>
        {staticStats.map(s => (
          <div key={s.label} style={{ background: 'var(--card)', padding: '1.25rem' }}>
            <p style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--muted-foreground)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{s.label}</p>
            <p style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '1.8rem', fontWeight: 500, color: 'var(--foreground)', lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', color: s.up ? 'var(--primary)' : '#ff6b6b', marginTop: '0.4rem' }}>
              {s.up ? '↑' : '↓'} {s.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-px mt-px" style={{ background: 'var(--border)' }}>
        {/* Projects table */}
        <div style={{ background: 'var(--card)', gridColumn: 'span 2' }}>
          <div style={{ borderBottom: '1px solid var(--border)', padding: '0.875rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--muted-foreground)', textTransform: 'uppercase' }}>Projects</span>
            <button onClick={() => navigate('/admin/create-project')} style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.6rem', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.08em' }}>
              + Add
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Title', 'Status', 'views', 'Tech', 'Year'].map(h => (
                  <th key={h} style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--muted-foreground)', textTransform: 'uppercase', textAlign: 'left', padding: '0.5rem 1.25rem', fontWeight: 400 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.length < 1 ? (recentProjects.map((p, i) => {
               return  <tr key={i} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.12s', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--secondary)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '0.75rem 1.25rem', fontSize: '0.82rem', fontWeight: 500 }}>{p.title}</td>
                  <td style={{ padding: '0.75rem 1.25rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.6rem', letterSpacing: '0.06em', color: statusColor[p.status] || 'var(--muted-foreground)' }}>
                      ● {p.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 1.25rem', fontFamily: 'var(--font-mono-custom)', fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>
                    {p.views}
                  </td>
                  <td style={{ padding: '0.75rem 1.25rem', fontFamily: 'var(--font-mono-custom)', fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>
                    {p.tech.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.75rem 1.25rem', fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', color: 'var(--muted-foreground)' }}>
                    {p.year}
                  </td>
                </tr>
              })) : projects.map((p, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.12s', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--secondary)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '0.75rem 1.25rem', fontSize: '0.82rem', fontWeight: 500 }}>{p.title}</td>
                  <td style={{ padding: '0.75rem 1.25rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.6rem', letterSpacing: '0.06em', color: statusColor[p.status] || 'var(--muted-foreground)' }}>
                      ● {p.status}
                    </span>
                  </td>
                    <td style={{ padding: '0.75rem 1.25rem', fontFamily: 'var(--font-mono-custom)', fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>
                    {p.views<1? '-': p.views}
                  </td>
                  <td style={{ padding: '0.75rem 1.25rem', fontFamily: 'var(--font-mono-custom)', fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>
                    {p.tech.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.75rem 1.25rem', fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', color: 'var(--muted-foreground)' }}>
                    {p.year}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Activity log */}
        <div style={{ background: 'var(--card)' }}>
          <div style={{ borderBottom: '1px solid var(--border)', padding: '0.875rem 1.25rem' }}>
            <span style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--muted-foreground)', textTransform: 'uppercase' }}>Activity Log</span>
          </div>
          <div style={{ padding: '0.75rem' }}>
            {activityLog.map((a, i) => (
              <div key={i} style={{ padding: '0.75rem', borderBottom: i < activityLog.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', color: 'var(--primary)', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>{a.event}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--secondary-foreground)', marginBottom: '0.3rem', lineHeight: 1.4 }}>{a.detail}</div>
                <div style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.6rem', color: 'var(--muted-foreground)' }}>{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blog posts table */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', marginTop: '1px' }}>
        <div style={{ borderBottom: '1px solid var(--border)', padding: '0.875rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--muted-foreground)', textTransform: 'uppercase' }}>Blog Posts</span>
          <button onClick={() => navigate('/admin/create-blog')} style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.6rem', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.08em' }}>
            + New Post
          </button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Title', 'Status', 'Views', 'Published'].map(h => (
                <th key={h} style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--muted-foreground)', textTransform: 'uppercase', textAlign: 'left', padding: '0.5rem 1.25rem', fontWeight: 400 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.length < 1 ? posts.map((p, i) => (
             <tr key={i} style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.12s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--secondary)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ padding: '0.75rem 1.25rem', fontSize: '0.82rem', fontWeight: 500 }}>{p.title}</td>
                <td style={{ padding: '0.75rem 1.25rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.6rem', letterSpacing: '0.06em', color: statusColor[p.published] || 'var(--muted-foreground)' }}>
                    ● {p.status}
                  </span>
                </td>
                <td style={{ padding: '0.75rem 1.25rem', fontFamily: 'var(--font-mono-custom)', fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>
                  {p.views > 0 ? p.views.toLocaleString() : '—'}
                </td>
                <td style={{ padding: '0.75rem 1.25rem', fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', color: 'var(--muted-foreground)' }}>{p.dateCreated}</td>
                <td style={{ padding: '0.75rem 1.25rem', fontFamily: 'var(--font-mono-custom)', fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>
                  {p.year}
                </td>
                <td style={{ padding: '0.75rem 1.25rem', fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', color: 'var(--muted-foreground)' }}>{p.dateCreated}</td>
              </tr>
            )) : posts.map((p, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.12s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--secondary)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ padding: '0.75rem 1.25rem', fontSize: '0.82rem', fontWeight: 500 }}>{p.title}</td>
                <td style={{ padding: '0.75rem 1.25rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.6rem', letterSpacing: '0.06em', color: statusColor[p.published] || 'var(--muted-foreground)' }}>
                    ● {p.status}
                  </span>
                </td>
                <td style={{ padding: '0.75rem 1.25rem', fontFamily: 'var(--font-mono-custom)', fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>
                  {p.views > 0 ? p.views.toLocaleString() : '—'}
                </td>
                <td style={{ padding: '0.75rem 1.25rem', fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', color: 'var(--muted-foreground)' }}>{p.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {[
          { label: 'View Portfolio', to: '/', icon: '↗' },
          { label: 'View Blog', to: '/blog', icon: '↗' },
          { label: 'Sign Out', to: '/login', icon: '→' },
        ].map(({ label, to, icon }) => (
          <button
            key={label}
            onClick={() => navigate(to)}
            style={ghostBtn}
          >
            {icon} {label}
          </button>
        ))}
      </div>
    </div>
  )
}

const primaryBtn = {
  fontFamily: 'var(--font-mono-custom)',
  fontSize: '0.7rem',
  letterSpacing: '0.1em',
  padding: '8px 16px',
  background: 'var(--primary)',
  color: 'var(--primary-foreground)',
  border: 'none',
  cursor: 'pointer',
  textTransform: 'uppercase',
}

const secondaryBtn = {
  fontFamily: 'var(--font-mono-custom)',
  fontSize: '0.7rem',
  letterSpacing: '0.1em',
  padding: '8px 16px',
  background: 'var(--secondary)',
  color: 'var(--foreground)',
  border: '1px solid var(--border)',
  cursor: 'pointer',
  textTransform: 'uppercase',
}

const ghostBtn = {
  fontFamily: 'var(--font-mono-custom)',
  fontSize: '0.65rem',
  letterSpacing: '0.08em',
  padding: '8px 14px',
  background: 'transparent',
  color: 'var(--muted-foreground)',
  border: '1px solid var(--border)',
  cursor: 'pointer',
  textTransform: 'uppercase',
  transition: 'all 0.15s',
  width: '100%',
  textAlign: 'center',
}
