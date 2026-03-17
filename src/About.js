import React from 'react'

const About = () => {
  return (
    <main className='About' style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1.5rem', lineHeight: '1.7' }}>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.6rem', textAlign: 'center' }}>About</h2>
        <div style={{ width: '48px', height: '4px', background: '#66d8f5', borderRadius: '2px', margin: '0 auto' }}></div>
      </div>

     

     

      {/* Tech Stack */}
      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem' }}>🛠 Tech Stack</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'CSS'].map(tech => (
            <span key={tech} style={{
              background: '#f0f0f0', border: '1px solid #ddd',
              borderRadius: '20px', padding: '4px 14px',
              fontSize: '13px', fontWeight: '600', color: '#333'
            }}>
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>📬 Get in Touch</h3>
        <p style={{ color: '#444' }}>
          Feel free to reach out if you'd like to collaborate, give feedback, or just say hello. I'm always open to connecting with other developers and creators.
        </p>
      </section>

    </main>
  )
}

export default About
