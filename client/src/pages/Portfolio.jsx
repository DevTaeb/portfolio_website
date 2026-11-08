import { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'

const staticProjects = [
  {
    id: 1,
    title: 'Distributed Cache Engine',
    tech: ['Go', 'Redis', 'gRPC'],
    year: '2025',
    desc: 'High-throughput in-memory cache with consistent hashing and automatic failover. Handles 2M+ ops/sec across 12 nodes.',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=340&fit=crop&auto=format',
    status: 'Production',
  }
]

const skills = [
  { cat: 'Languages', items: ['Java', 'Javascript', 'Dart', 'Python'] },
  { cat: 'Frameworks', items: ['Node', 'Flutter', 'React', 'TailwindCSS'] },
  { cat: 'Infrastructure', items: ['Kubernetes', 'AWS', 'Git'] },
  { cat: 'Data', items: ['PostgreSQL', 'MySql', 'MongoDB'] },
  { cat: 'Frontend', items: ['HTML/CSS', 'React'] },
]

export default function Portfolio() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  useEffect(()=>{
    async function fetchProjects(){
        const _projects = await fetch('api/get-projects/').then(res=>res.json());
        console.log(_projects);
        if(_projects.ok){
          setProjects(_projects.projects);
        }
    }
    fetchProjects()
  }, [])
  return (
    <div>
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-end">
          <div>
            <p style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--primary)', marginBottom: '1rem', textTransform: 'uppercase' }}>
              ▸ Available for work
            </p>
            <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
              Taiwo Ebietanmi<br />
              <span style={{ color: 'var(--muted-foreground)', fontWeight: 300 }}>Software Engineer</span>
            </h1>
            <p style={{ color: 'var(--secondary-foreground)', lineHeight: 1.7, fontSize: '1rem', maxWidth: '42ch', marginBottom: '2rem' }}>
              I build systems that scales, that is robust and i teach. 4 years experience.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href="mailto:taeb4all@gmail.com"
                style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.75rem', letterSpacing: '0.1em', background: 'var(--primary)', color: 'var(--primary-foreground)', border: 'none', padding: '10px 20px', cursor: 'pointer', textDecoration: 'none', transition: 'opacity 0.15s', display: 'inline-block', textTransform: 'uppercase' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Get in touch
              </a>
              <a
                href="#projects"
                style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.75rem', letterSpacing: '0.1em', border: '1px solid var(--border)', color: 'var(--foreground)', padding: '10px 20px', cursor: 'pointer', textDecoration: 'none', transition: 'border-color 0.15s', textTransform: 'uppercase' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                View Projects
              </a>
            </div>
          </div>

          <div className="hidden md:block">
            <div style={{ border: '1px solid var(--border)', padding: '1.5rem', background: 'var(--card)', fontFamily: 'var(--font-mono-custom)', fontSize: '0.75rem' }}>
              <div className="space-y-1 flex justify-center">
                <img src="./client/src/assets/images/professional_avatar.jpg" alt="avatar" height={'150px'} width={'150px'}
                  style={{ border: '3px solid var(--border)', borderRadius: '10%', }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-px mt-px" style={{ background: 'var(--border)' }}>
              {[['5', 'Projects'], ['4', 'Years Exp'], ['0', 'Open Source']].map(([n, l]) => (
                <div key={l} style={{ background: 'var(--card)', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '1.5rem', fontWeight: 500, color: 'var(--primary)' }}>{n}</div>
                  <div style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.62rem', color: 'var(--muted-foreground)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.25rem' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }} className="py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map(({ cat, items }) => (
              <div key={cat}>
                <p style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.62rem', letterSpacing: '0.15em', color: 'var(--muted-foreground)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{cat}</p>
                <div className="flex flex-wrap gap-1.5">
                  {items.map(item => (
                    <span key={item} style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.7rem', border: '1px solid var(--border)', color: 'var(--secondary-foreground)', padding: '2px 8px' }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-baseline justify-between mb-10">
          <h2 style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono-custom)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
            Featured Projects
          </h2>
          <span style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', color: 'var(--muted-foreground)' }}>{projects.length} projects</span>
        </div>

        <div className="grid md:grid-cols-2 gap-px" style={{ background: 'var(--border)' }}>
          {projects.length < 1 ? staticProjects.map(proj => (
            <div
              key={proj.id}
              style={{ background: 'var(--card)', cursor: 'pointer', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--secondary)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--card)')}
            >
              <div style={{ height: '200px', overflow: 'hidden', background: 'var(--secondary)' }}>
                <img src={proj.img} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.7 }} />
              </div>
              <div style={{ padding: '1.25rem' }}>
                <div className="flex items-center justify-between mb-2">
                  <span style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--primary)', textTransform: 'uppercase' }}>{proj.status}</span>
                  <span style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.62rem', color: 'var(--muted-foreground)' }}>{proj.year}</span>
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>{proj.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--secondary-foreground)', lineHeight: 1.6, marginBottom: '1rem' }}>{proj.desc}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {proj.tech.map(t => (
                    <span key={t} style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', color: 'var(--muted-foreground)', border: '1px solid var(--border)', padding: '1px 6px' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          )): 
          projects.map(proj => (
            <div
              key={proj.id}
              style={{ background: 'var(--card)', cursor: 'pointer', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--secondary)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--card)')}
            >
              <div style={{ height: '200px', overflow: 'hidden', background: 'var(--secondary)' }}>
                <img src={proj.img} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.7 }} />
              </div>
              <div style={{ padding: '1.25rem' }}>
                <div className="flex items-center justify-between mb-2">
                  <span style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--primary)', textTransform: 'uppercase' }}>{proj.status}</span>
                  <span style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.62rem', color: 'var(--muted-foreground)' }}>{proj.year}</span>
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>{proj.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--secondary-foreground)', lineHeight: 1.6, marginBottom: '1rem' }}>{proj.desc}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {proj.tech.map(t => (
                    <span key={t} style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', color: 'var(--muted-foreground)', border: '1px solid var(--border)', padding: '1px 6px' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))
          }
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: '1px solid var(--border)', background: 'var(--card)' }} className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Let's work together</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Building something challenging?
          </h2>
          <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', marginBottom: '2rem', maxWidth: '50ch', marginLeft: 'auto', marginRight: 'auto' }}>
            I'm open to engineering roles, consulting, and advising on tech.
          </p>
          <a href="mailto:taeb4all@gmail.com" style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.75rem', letterSpacing: '0.1em', background: 'var(--primary)', color: 'var(--primary-foreground)', padding: '12px 28px', textDecoration: 'none', textTransform: 'uppercase', transition: 'opacity 0.15s', display: 'inline-block' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            taeb4all@gmail.com
          </a>
        </div>
      </section>
    </div>
  )
}
