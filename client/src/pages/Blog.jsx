import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const recentPosts = [
  {
    id: 1,
    title: 'Why I Rewrote Our Cache in Rust',
    slug: 'cache-rewrite-rust',
    year: '2026-07-14',
    readTime: '8 min',
    tags: ['Rust', 'Performance', 'Infrastructure'],
    excerpt: "After hitting a wall with Go's GC pauses at 2M ops/sec, we rewrote the hot path in Rust. Here's what we learned about the migration, the wins, and the surprising pitfalls.",
    content: "After hitting a wall with Go's GC pauses at 2M ops/sec, we rewrote the hot path in Rust. Here's what we learned about the migration, the wins, and the surprising pitfalls. Further explained here",
  },
  {
    id: 2,
    title: 'CRDTs in Production: Lessons After 18 Months',
    slug: 'crdts-in-production',
    year: '2026-06-02',
    readTime: '12 min',
    tags: ['Distributed Systems', 'CRDTs', 'TypeScript'],
    excerpt: 'Conflict-free replicated data types promise a lot. Reality is messier. We shipped a CRDT-based sync layer to 50k users and want to share what actually happened.',
    content: "After hitting a wall with Go's GC pauses at 2M ops/sec, we rewrote the hot path in Rust. Here's what we learned about the migration, the wins, and the surprising pitfalls. Further explained here",

  },
  {
    id: 3,
    title: 'CRDTs in Production: Lessons After 18 Months',
    slug: 'crdts-in-production',
    year: '2026-06-02',
    readTime: '12 min',
    tags: ['Distributed Systems', 'CRDTs', 'TypeScript'],
    excerpt: 'Conflict-free replicated data types promise a lot. Reality is messier. We shipped a CRDT-based sync layer to 50k users and want to share what actually happened.',
    content: "After hitting a wall with Go's GC pauses at 2M ops/sec, we rewrote the hot path in Rust. Here's what we learned about the migration, the wins, and the surprising pitfalls. Further explained here",

  }
]
export default function Blog() {
  const navigate = useNavigate();
  let filtered = [];
  const [selectedTag, setSelectedTag] = useState(null)
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchPosts() {
      const _posts = await fetch('/api/get-posts/').then(res => res.json());
      try {
        if (_posts.ok) {
          setPosts(_posts.posts);
        }
      } catch (error) {
        setError('Unable to load posts.')
      }
    }
    fetchPosts()
  }, [])

  const allTags = Array.from(new Set(posts.length > 0 ? posts.flatMap(p => p.tags) : recentPosts.flatMap(p => p.tags)))
  filtered = selectedTag ?
    posts.length < 1 ?
      recentPosts.filter(p => p.tags.includes(selectedTag)) :
      posts.filter(p => p.tags.includes(selectedTag)) :
      posts.length > 0 ? posts : recentPosts;
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          Writing
        </p>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '1rem' }}>Blog</h1>
        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', maxWidth: '55ch' }}>
          Technical deep-dives on Sottware Engineering, AI, Backend infrastructure, and the craft of tech at scale.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setSelectedTag(null)}
          style={{
            fontFamily: 'var(--font-mono-custom)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            padding: '4px 10px',
            border: '1px solid',
            borderColor: selectedTag === null ? 'var(--primary)' : 'var(--border)',
            color: selectedTag === null ? 'var(--primary)' : 'var(--muted-foreground)',
            background: 'transparent',
            cursor: 'pointer',
            textTransform: 'uppercase',
          }}
        >
          All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            style={{
              fontFamily: 'var(--font-mono-custom)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              padding: '4px 10px',
              border: '1px solid',
              borderColor: selectedTag === tag ? 'var(--primary)' : 'var(--border)',
              color: selectedTag === tag ? 'var(--primary)' : 'var(--muted-foreground)',
              background: 'transparent',
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'all 0.15s',
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      <div style={{ borderTop: '1px solid var(--border)' }}>
        {filtered.map((post, i) => (
          <article
            key={post.id}
            onClick={() => navigate(`/blog/${post.id}`, { state: post })}
            style={{
              borderBottom: '1px solid var(--border)',
              padding: '1.5rem 0.75rem',
              cursor: 'pointer',
              display: 'grid',
              gridTemplateColumns: '2.5rem 1fr 90px',
              gap: '1rem',
              alignItems: 'start',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--card)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <span style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', color: 'var(--muted-foreground)', paddingTop: '3px', textAlign: 'right' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags.map(tag => (
                  <span key={tag} style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.6rem', letterSpacing: '0.08em', color: 'var(--primary)', textTransform: 'uppercase' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '0.5rem', lineHeight: 1.3 }}>{post.title}</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--secondary-foreground)', lineHeight: 1.6 }}>{post.excerpt}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', color: 'var(--muted-foreground)' }}>{post.year}</div>
              <div style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>{post.readTime}</div>
            </div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--muted-foreground)', fontFamily: 'var(--font-mono-custom)', fontSize: '0.8rem' }}>
          No posts found for &quot;{selectedTag}&quot;
        </div>
      )}
    </div>
  )
}
