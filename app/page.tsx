"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";
import AuthCodeRedirect from "@/components/AuthCodeRedirect";

const HomeAnimations = dynamic(
  () => import("@/components/home/HomeAnimations"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <HomeAnimations />
      <Suspense>
        <AuthCodeRedirect />
      </Suspense>

      {/* Navigation */}
      <nav className="nav" id="nav">
        <a href="#" className="nav-logo">Andrew Urom</a>
        <div className="nav-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#experience" className="nav-link">Experience</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-link">Contact</a>
          <Link href="/blog" className="nav-link">Blog</Link>
        </div>
        <a href="mailto:andrewurom@gmail.com" className="nav-cta magnetic">Hire Me</a>
        <button className="nav-hamburger" id="hamburger" aria-label="Menu">
          <span /><span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className="mobile-menu" id="mobileMenu">
        <a href="#about" className="mobile-link">About</a>
        <a href="#experience" className="mobile-link">Experience</a>
        <a href="#projects" className="mobile-link">Projects</a>
        <a href="#contact" className="mobile-link">Contact</a>
        <Link href="/blog" className="mobile-link">Blog</Link>
      </div>

      {/* Hero */}
      <section className="hero" id="hero">
        <div className="hero-noise" />
        <div className="hero-grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge reveal-up">
              <span className="badge-dot" />
              Open to relocation · NL · DE · PT
            </div>
            <h1 className="hero-name">
              <span className="name-line" data-text="Andrew">Andrew</span>
              <span className="name-line accent-line" data-text="Urom">Urom</span>
            </h1>
            <p className="hero-role reveal-up">
              <span className="role-text">Full Stack Product Engineer</span>
              <span className="role-separator">·</span>
              <span className="role-text">Fintech</span>
              <span className="role-separator">·</span>
              <span className="role-text">AI-Native</span>
            </p>
            <p className="hero-bio reveal-up">
              6+ years building fintech products at scale — from Nigeria&apos;s largest payment
              network processing <strong>30M+ daily transactions</strong> to AI-native applications
              serving millions of users.
            </p>
            <div className="hero-actions reveal-up">
              <a href="#projects" className="btn btn-primary magnetic">View My Work</a>
              <a href="#contact" className="btn btn-ghost magnetic">Get In Touch</a>
            </div>
            <div className="hero-stats reveal-up">
              <div className="stat">
                <span className="stat-num" data-count="6">0</span><span className="stat-plus">+</span>
                <span className="stat-label">Years Exp.</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-num" data-count="50">0</span><span className="stat-plus">M+</span>
                <span className="stat-label">Users Served</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-num" data-count="30">0</span><span className="stat-plus">M+</span>
                <span className="stat-label">Daily Transactions</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-num" data-count="35">0</span><span className="stat-plus">%</span>
                <span className="stat-label">Faster Load</span>
              </div>
            </div>
          </div>

          <div className="hero-visual reveal-right">
            <div className="float-card card-photo float-photo">
              <div className="profile-photo-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/andrew-profile.jpg" alt="Andrew Urom" className="profile-photo-img" />
                <div className="profile-photo-ring" />
                <div className="profile-photo-status">
                  <span className="profile-status-dot" />
                  Open to work
                </div>
              </div>
            </div>

            <div className="float-card card-role float-a">
              <div className="fc-top">
                <div className="fc-dot green" />
                <span className="fc-label">Currently at</span>
              </div>
              <div className="fc-company">Interswitch Group</div>
              <div className="fc-title">Senior Software Engineer</div>
              <div className="fc-meta">Sep 2023 - Present · Lagos, NG</div>
              <div className="fc-tags">
                <span>React</span><span>TypeScript</span><span>Next.js</span>
              </div>
            </div>

            <div className="float-card card-steward float-b">
              <div className="fc-top">
                <div className="fc-icon">📱</div>
                <div>
                  <div className="fc-app-name">Steward</div>
                  <div className="fc-app-sub">Personal Finance App</div>
                </div>
              </div>
              <div className="mini-chart">
                <svg viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1a56db" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#1a56db" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 45 L20 38 L40 42 L60 28 L80 32 L100 18 L120 22 L140 10 L160 14 L160 60 L0 60Z" fill="url(#chartGrad)" />
                  <path d="M0 45 L20 38 L40 42 L60 28 L80 32 L100 18 L120 22 L140 10 L160 14" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="160" cy="14" r="4" fill="#1a56db" />
                </svg>
              </div>
              <div className="fc-stat-row">
                <div className="fc-mini-stat">
                  <span className="fc-mini-num">↑ 94%</span>
                  <span className="fc-mini-label">AI accuracy</span>
                </div>
                <div className="fc-mini-stat">
                  <span className="fc-mini-num">Claude</span>
                  <span className="fc-mini-label">API powered</span>
                </div>
              </div>
            </div>

            <div className="float-card card-stack float-c">
              <div className="fc-stack-label">Core Stack</div>
              <div className="fc-stack-pills">
                <span className="sp sp-ts">TypeScript</span>
                <span className="sp sp-react">React 18</span>
                <span className="sp sp-next">Next.js</span>
                <span className="sp sp-ai">Claude API</span>
                <span className="sp sp-node">Node.js</span>
                <span className="sp sp-tail">PostgreSQL</span>
              </div>
            </div>

            <div className="hero-ring" />
          </div>
        </div>

        <div className="hero-marquee">
          <div className="marquee-track">
            {["React 18","TypeScript","Next.js","Node.js","PostgreSQL","Claude API","AWS","Docker","GraphQL","Redis","React Native","Storybook","GitHub Actions","Fintech","RAG Pipelines","Micro-frontends"].flatMap((t, i) => [
              <span key={`a-${i}`}>{t}</span>,
              <span key={`s-${i}`} className="sep">·</span>,
            ])}
            {["React 18","TypeScript","Next.js","Node.js","PostgreSQL","Claude API","AWS","Docker","GraphQL","Redis","React Native","Storybook","GitHub Actions","Fintech","RAG Pipelines","Micro-frontends"].flatMap((t, i) => [
              <span key={`b-${i}`}>{t}</span>,
              <span key={`t-${i}`} className="sep">·</span>,
            ])}
          </div>
        </div>

        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* About */}
      <section className="about section" id="about">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">01 - About</span>
            <h2 className="section-title split-text">Engineering at<br /><em>fintech scale.</em></h2>
          </div>
          <div className="about-grid">
            <div className="about-text">
              <p className="about-lead">
                I&apos;m Andrew — a Full Stack Product Engineer who has spent 6+ years building fintech
                infrastructure that millions of Nigerians depend on daily. Currently at{" "}
                <strong>Interswitch Group</strong>, Nigeria&apos;s largest payment network.
              </p>
              <p className="about-body">
                I&apos;ve architected high-availability systems across <strong>Interswitch Group</strong>,{" "}
                <strong>Access Bank</strong> (50M+ customers), and <strong>Africa Prudential</strong> — solving
                hard problems in real-time payment processing, distributed state management, and
                performance under load. I own entire frontend architectures, design systems, and
                engineering standards — not just features.
              </p>
              <p className="about-body">
                I practice <strong>AI-native product development</strong>: I&apos;ve built production
                LLM pipelines with Claude, designed AI-assisted financial workflows, and integrate
                generative AI into product UX decisions — not just API calls. I hold certifications
                from Anthropic, OpenAI, and Oracle, and founded <strong>Steward</strong>, a React Native
                finance app with Claude-powered AI reporting.
              </p>
              <div className="about-certs">
                <span className="cert-pill">Oracle OCI Gen AI Pro</span>
                <span className="cert-pill">Oracle AI Vector Search Pro</span>
                <span className="cert-pill">OpenAI Prompt Engineering</span>
                <span className="cert-pill">Scrum Certified</span>
              </div>
            </div>
            <div className="about-visual">
              <div className="about-card">
                <div className="about-card-inner">
                  <div className="about-avatar about-avatar-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/images/andrew-profile.jpg" alt="Andrew Urom" />
                  </div>
                  <div className="about-card-info">
                    <h3>Andrew Urom</h3>
                    <p>Lagos, Nigeria 🇳🇬</p>
                  </div>
                </div>
                <div className="about-tags">
                  <span className="tag">React 18</span>
                  <span className="tag">TypeScript</span>
                  <span className="tag">Next.js</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">PostgreSQL</span>
                  <span className="tag">Claude API</span>
                  <span className="tag">AWS</span>
                  <span className="tag">Fintech</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="skills section" id="skills">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">02 - Skills</span>
            <h2 className="section-title split-text">The full<br /><em>stack.</em></h2>
          </div>
          <div className="skills-grid">
            {[
              { icon: "⚡", title: "Frontend Architecture", desc: "React 18, TypeScript, Next.js 15, micro-frontend patterns, component library design, rendering strategies (SSR/ISR/CSR)" },
              { icon: "🏗️", title: "Design Systems", desc: "Component library architecture from scratch, Storybook, design tokens, multi-product consistency — adopted across 3+ product lines at Interswitch" },
              { icon: "🤖", title: "AI-Native Development", desc: "Claude API, OpenAI API, RAG pipeline architecture, LLM orchestration, AI-assisted UX workflows, Oracle OCI Generative AI, prompt engineering at production scale" },
              { icon: "🔧", title: "Backend & APIs", desc: "Node.js, Express, FastAPI, PostgreSQL, MongoDB, Redis, REST & GraphQL, JWT auth, payment gateway integrations (Interswitch, Paystack)" },
              { icon: "☁️", title: "Cloud & DevOps", desc: "AWS (Lambda, S3, EC2), Docker, GitHub Actions CI/CD, Vercel, performance monitoring with New Relic & Sentry, infrastructure-as-code" },
              { icon: "📱", title: "Mobile & Performance", desc: "React Native (iOS + Android), bundle optimisation, Webpack/Vite profiling, code splitting, lazy loading — 35% load time reduction in production" },
            ].map((s) => (
              <div key={s.title} className="skill-category">
                <div className="skill-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="experience section" id="experience">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">03 - Experience</span>
            <h2 className="section-title split-text">Where I&apos;ve<br /><em>shipped.</em></h2>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-left">
                <span className="timeline-year">2023 - Present</span>
                <div className="timeline-dot current" />
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="timeline-role">Senior Software Engineer</h3>
                  <span className="timeline-company">Interswitch Group</span>
                  <span className="timeline-badge">30M+ Daily Transactions</span>
                </div>
                <ul className="timeline-bullets">
                  <li>Architected React + TypeScript component library adopted across <strong>3+ payment product lines</strong> — 40% fewer production bugs, 30% faster team onboarding</li>
                  <li>Reduced bundle load time <strong>35%</strong> via code splitting, lazy loading, and Vite/Webpack profiling on Nigeria&apos;s highest-traffic payment platform</li>
                  <li>Integrated Claude API into internal tooling to automate transaction reconciliation reporting — cut analyst review time by 60%</li>
                  <li>Led 5-engineer team across payment gateway and energy marketplace platforms; set architectural standards still in use today</li>
                </ul>
                <div className="timeline-stack">
                  <span>React</span><span>TypeScript</span><span>Next.js</span><span>Redux Toolkit</span>
                  <span>Storybook</span><span>Jest</span><span>Cypress</span><span>Docker</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-left">
                <span className="timeline-year">2022 - 2023</span>
                <div className="timeline-dot" />
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="timeline-role">Software Engineer</h3>
                  <span className="timeline-company">Africa Prudential</span>
                  <span className="timeline-badge">Investment &amp; Registrar</span>
                </div>
                <ul className="timeline-bullets">
                  <li>Migrated legacy investment portal to React/TypeScript SPA — <strong>50% faster load times</strong>, 20% lift in user engagement</li>
                  <li>Built full-stack applicant management platform (Node.js + PostgreSQL) processing <strong>10,000+ applications/year</strong></li>
                  <li>Shipped GitHub Actions CI/CD pipeline adopted org-wide — 30% fewer production incidents within 3 months</li>
                </ul>
                <div className="timeline-stack">
                  <span>React</span><span>TypeScript</span><span>Redux</span><span>Material-UI</span>
                  <span>Node.js</span><span>PostgreSQL</span><span>GitHub Actions</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-left">
                <span className="timeline-year">2019 - 2022</span>
                <div className="timeline-dot" />
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="timeline-role">Full Stack Software Engineer</h3>
                  <span className="timeline-company">Access Bank</span>
                  <span className="timeline-badge">Africa&apos;s Largest Bank · 50M+ Customers</span>
                </div>
                <ul className="timeline-bullets">
                  <li>Built loan application portal with real-time processing, JWT auth, and fraud checks — served <strong>50M+ account holders</strong></li>
                  <li>Optimised React/TypeScript banking dashboards — <strong>25% reduction in API response times</strong> under high concurrency</li>
                  <li>Shipped <em>Swiftpay</em>, a cross-platform React Native payments app integrating Interswitch &amp; Paystack for Africa&apos;s largest retail bank</li>
                </ul>
                <div className="timeline-stack">
                  <span>React</span><span>TypeScript</span><span>Next.js</span><span>Node.js</span>
                  <span>PostgreSQL</span><span>MongoDB</span><span>React Native</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="projects section" id="projects">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">04 - Projects</span>
            <h2 className="section-title">Things I&apos;ve<br /><em>built.</em></h2>
          </div>

          {/* GoodAction */}
          <div className="cs-wrap">
            <div className="cs-card">
              <div className="cs-topbar">
                <div className="cs-live-badge">
                  <span className="cs-live-dot" />
                  Live product · Serving users globally
                </div>
                <a href="https://www.goodaction.com" target="_blank" rel="noopener" className="cs-visit magnetic">
                  goodaction.com
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10" /></svg>
                </a>
              </div>
              <div className="cs-body">
                <div className="cs-info">
                  <div className="cs-badges">
                    <span className="cs-badge freelance">Freelance</span>
                    <span className="cs-badge impact">Social Impact</span>
                    <span className="cs-badge web">Web + Mobile</span>
                  </div>
                  <h3 className="cs-title">GoodAction</h3>
                  <p className="cs-tagline">&quot;Build communities that take action.&quot;</p>
                  <p className="cs-desc">
                    A full-scale social impact platform - the LinkedIn for good. Organizations run programs,
                    mobilize volunteers, raise funds, and measure real-world impact. Individuals build a
                    verified <strong>Good Identity</strong> that compounds over time.
                  </p>
                  <p className="cs-desc">
                    Brought in as freelance frontend engineer to architect and ship the complete web experience
                    from design system to production - now serving a global user base across nonprofits,
                    companies, and volunteers.
                  </p>
                  <div className="cs-impact-row">
                    {[["$1.8M","Impact mobilized"],["15K+","Lives touched"],["22+","Nonprofits served"],["Global","User reach"]].map(([n,l]) => (
                      <div key={l} className="cs-impact-stat">
                        <span className="cs-impact-num">{n}</span>
                        <span className="cs-impact-label">{l}</span>
                      </div>
                    ))}
                  </div>
                  <div className="cs-stack-row">
                    <span>React</span><span>Next.js</span><span>TypeScript</span>
                    <span>Tailwind CSS</span><span>Node.js</span><span>PostgreSQL</span>
                  </div>
                  <div className="cs-actions">
                    <a href="https://www.goodaction.com" target="_blank" rel="noopener" className="btn btn-primary magnetic cs-btn-primary">
                      View Live Site
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10" /></svg>
                    </a>
                  </div>
                </div>
                <div className="cs-screens">
                  <div className="cs-screen-wrap">
                    <div className="cs-ss cs-ss-1"><img src="/assets/images/goodaction_1_hero.png" alt="GoodAction hero" loading="lazy" /></div>
                    <div className="cs-ss cs-ss-2"><img src="/assets/images/goodaction_2_problem.png" alt="GoodAction problem" loading="lazy" /></div>
                    <div className="cs-ss cs-ss-3"><img src="/assets/images/goodaction_3_platform.png" alt="GoodAction platform" loading="lazy" /></div>
                    <div className="cs-ss cs-ss-4"><img src="/assets/images/goodaction_4_audience.png" alt="GoodAction audience" loading="lazy" /></div>
                    <div className="cs-deco-ring" />
                    <div className="cs-deco-dot cs-deco-dot-1" />
                    <div className="cs-deco-dot cs-deco-dot-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Energy Marketplace */}
          <div className="cs-wrap cs-wrap-energy">
            <div className="cs-card cs-card-energy">
              <div className="cs-topbar cs-topbar-energy">
                <div className="cs-live-badge">
                  <span className="cs-live-dot cs-live-dot-blue" />
                  Live · energymarketplace.interswitchgroup.com
                </div>
                <a href="https://energymarketplace.interswitchgroup.com" target="_blank" rel="noopener" className="cs-visit cs-visit-energy magnetic">
                  Visit Platform
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10" /></svg>
                </a>
              </div>
              <div className="cs-body cs-body-energy">
                <div className="cs-info cs-info-energy">
                  <div className="cs-badges">
                    <span className="cs-badge cs-badge-interswitch">Interswitch Group</span>
                    <span className="cs-badge cs-badge-architect">Architect</span>
                    <span className="cs-badge cs-badge-enterprise">Enterprise</span>
                  </div>
                  <h3 className="cs-title">Energy Marketplace</h3>
                  <p className="cs-tagline">&quot;Smart energy, true freedom.&quot;</p>
                  <p className="cs-desc">
                    Nigeria&apos;s premier solar financing marketplace — built and architected at{" "}
                    <strong>Interswitch Group</strong>. A complete platform enabling homeowners and businesses to
                    purchase solar equipment and access flexible financing for full system installations.
                  </p>
                  <p className="cs-desc">
                    Architected the entire frontend from blank slate — product catalogue, energy calculator,
                    vendor marketplace, installation booking, and financing flows.
                  </p>
                  <div className="cs-impact-row cs-impact-row-energy">
                    {[["4","Product lines"],["CBN","Licensed"],["∞","Solar financing"],["NG","Nationwide"]].map(([n,l]) => (
                      <div key={l} className="cs-impact-stat">
                        <span className="cs-impact-num cs-impact-num-energy">{n}</span>
                        <span className="cs-impact-label">{l}</span>
                      </div>
                    ))}
                  </div>
                  <div className="cs-stack-row">
                    <span>React</span><span>TypeScript</span><span>Next.js</span>
                    <span>Tailwind CSS</span><span>Redux Toolkit</span><span>Node.js</span>
                  </div>
                  <div className="cs-actions">
                    <a href="https://energymarketplace.interswitchgroup.com" target="_blank" rel="noopener" className="btn btn-primary magnetic cs-btn-energy">
                      View Live Platform
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10" /></svg>
                    </a>
                  </div>
                </div>
                <div className="cs-screens cs-screens-energy">
                  <div className="energy-screens-wrap">
                    <div className="ess ess-1 cs-ss"><img src="/assets/images/energy/energy_1_hero.png" alt="Energy Marketplace hero" loading="lazy" /></div>
                    <div className="ess ess-2 cs-ss"><img src="/assets/images/energy/energy_2_products.png" alt="Energy products" loading="lazy" /></div>
                    <div className="ess-glow" />
                    <div className="ess-grid-deco" />
                    <div className="ess-badge-float">
                      <span className="ess-badge-icon">⚡</span>
                      <div>
                        <div className="ess-badge-title">Solar Financing</div>
                        <div className="ess-badge-sub">Powered by Interswitch</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* UiLand */}
          <div className="cs-wrap cs-wrap-uiland">
            <div className="cs-card cs-card-uiland">
              <div className="cs-topbar cs-topbar-uiland">
                <div className="cs-live-badge">
                  <span className="cs-live-dot cs-live-dot-indigo" />
                  Live product · 25K+ designers worldwide
                </div>
                <a href="https://uiland.design" target="_blank" rel="noopener" className="cs-visit cs-visit-uiland magnetic">
                  uiland.design
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10" /></svg>
                </a>
              </div>
              <div className="cs-body cs-body-uiland">
                <div className="cs-screens cs-screens-uiland">
                  <div className="uiland-mockup">
                    <div className="ulm-browser">
                      <div className="ulm-browser-bar">
                        <div className="ulm-dots"><span /><span /><span /></div>
                        <div className="ulm-url">uiland.design</div>
                        <div className="ulm-spacer" />
                      </div>
                      <div className="ulm-nav">
                        <div className="ulm-logo">UiLand</div>
                        <div className="ulm-nav-links"><span>Mobile</span><span>Web</span><span>Components</span><span>Flows</span></div>
                        <div className="ulm-nav-cta">Pro</div>
                      </div>
                      <div className="ulm-search-row">
                        <div className="ulm-search">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                          <span>Search 50,000+ screens...</span>
                        </div>
                        <div className="ulm-filter-pills">
                          <span className="ulm-pill active">All</span>
                          <span className="ulm-pill">iOS</span>
                          <span className="ulm-pill">Android</span>
                          <span className="ulm-pill">Web</span>
                          <span className="ulm-pill">Africa</span>
                        </div>
                      </div>
                      <div className="ulm-grid">
                        {[["ulm-app-1","Paystack","42",["s1","s2"]],["ulm-app-2","Airbnb","128",["s3","s4"]],["ulm-app-3","Kuda Bank","67",["s5","s6"]],["ulm-app-4","TikTok","95",["s7","s8"]],["ulm-app-5","Flutterwave","38",["s2","s5"]],["ulm-app-6","Notion","84",["s6","s1"]]].map(([cls,name,count,screens]) => (
                          <div key={name as string} className={`ulm-app-card ${cls}`}>
                            {(screens as string[]).map((s) => <div key={s} className="ulm-phone"><div className={`ulm-phone-screen ${s}`} /></div>)}
                            <div className="ulm-app-name">{name}</div>
                            <div className="ulm-app-count">{count} screens</div>
                          </div>
                        ))}
                      </div>
                      <div className="ulm-stats-bar">
                        <span><strong>50K+</strong> screens</span>
                        <span><strong>25K+</strong> designers</span>
                        <span><strong>500+</strong> apps</span>
                        <span><strong>Free</strong> to use</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cs-info cs-info-uiland">
                  <div className="cs-badges">
                    <span className="cs-badge freelance">Freelance</span>
                    <span className="cs-badge cs-badge-design">Design Tool</span>
                    <span className="cs-badge cs-badge-africa">Made in Africa</span>
                  </div>
                  <h3 className="cs-title">UiLand</h3>
                  <p className="cs-tagline">&quot;Discover the best mobile &amp; web design inspiration.&quot;</p>
                  <p className="cs-desc">
                    Africa&apos;s largest mobile design reference library — a <strong>Mobbin alternative</strong>
                    built for the global design community. Designers browse 50,000+ real in-production
                    screens from iOS, Android, and web apps across Africa and worldwide.
                  </p>
                  <p className="cs-desc">
                    Brought in as freelance frontend engineer to architect and ship the full platform —
                    from search and filtering infrastructure to app screen browser, components
                    library, and a blazing-fast UI that serves designers at top companies daily.
                  </p>
                  <div className="cs-impact-row cs-impact-row-uiland">
                    {[["50K+","Screens curated"],["25K+","Designers served"],["500+","Apps indexed"],["#1","African library"]].map(([n,l]) => (
                      <div key={l} className="cs-impact-stat">
                        <span className="cs-impact-num cs-impact-num-uiland">{n}</span>
                        <span className="cs-impact-label">{l}</span>
                      </div>
                    ))}
                  </div>
                  <div className="cs-stack-row">
                    <span>Next.js</span><span>TypeScript</span><span>React</span>
                    <span>Tailwind CSS</span><span>PostgreSQL</span><span>Node.js</span>
                  </div>
                  <div className="cs-actions">
                    <a href="https://uiland.design" target="_blank" rel="noopener" className="btn btn-primary magnetic cs-btn-uiland">
                      View Live Site
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Projects */}
          <div className="other-projects-header">
            <span className="op-label">More work</span>
            <div className="op-line" />
          </div>
          <div className="other-projects-grid">
            <div className="op-card">
              <div className="op-card-top ds-bg">
                <div className="op-mockup">
                  <div className="mockup-bar"><span /><span /><span /></div>
                  <div className="mockup-content payment">
                    <div className="mockup-stat-row"><div className="mockup-stat-box" /><div className="mockup-stat-box" /></div>
                    <div className="mockup-table">
                      <div className="mockup-table-row" /><div className="mockup-table-row" /><div className="mockup-table-row" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="op-info">
                <div className="op-tags"><span className="op-tag">Interswitch Group</span><span className="op-tag">Architecture</span></div>
                <h3 className="op-title">Component Library</h3>
                <p className="op-desc">React + TypeScript design system architected from scratch with Storybook. Shipped to 3+ product lines processing 30M+ daily transactions.</p>
                <div className="op-stack"><span>TypeScript</span><span>React</span><span>Storybook</span><span>Jest</span></div>
              </div>
            </div>

            <div className="op-card">
              <div className="op-card-top swift-bg">
                <div className="op-mockup">
                  <div className="mockup-bar"><span /><span /><span /></div>
                  <div className="mockup-content bank">
                    <div className="mockup-form">
                      <div className="mockup-input" /><div className="mockup-input" /><div className="mockup-btn" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="op-info">
                <div className="op-tags"><span className="op-tag">Access Bank</span><span className="op-tag">FinTech</span></div>
                <h3 className="op-title">Swiftpay</h3>
                <p className="op-desc">Cross-platform React Native payments app integrating Interswitch &amp; Paystack for Africa&apos;s largest bank — 50M+ customers.</p>
                <div className="op-stack"><span>React Native</span><span>TypeScript</span><span>Node.js</span></div>
              </div>
            </div>

            <div className="op-card">
              <div className="op-card-top ap-bg">
                <div className="op-mockup">
                  <div className="mockup-bar"><span /><span /><span /></div>
                  <div className="mockup-content applicant">
                    <div className="mockup-list">
                      <div className="mockup-list-item" /><div className="mockup-list-item" /><div className="mockup-list-item" /><div className="mockup-list-item short" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="op-info">
                <div className="op-tags"><span className="op-tag">Africa Prudential</span><span className="op-tag">Full-Stack</span></div>
                <h3 className="op-title">Applicant Platform</h3>
                <p className="op-desc">Full-stack platform handling 10,000+ investment applications annually. SPA migration cut load times 50%, reduced ops overhead 30%.</p>
                <div className="op-stack"><span>React</span><span>Node.js</span><span>PostgreSQL</span></div>
              </div>
            </div>

            <div className="op-card">
              <div className="op-card-top" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}>
                <div className="op-mockup">
                  <div className="mockup-bar"><span /><span /><span /></div>
                  <div className="mockup-content" style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ height: "8px", width: "60%", background: "rgba(99,102,241,0.4)", borderRadius: "4px" }} />
                    <div style={{ height: "6px", width: "40%", background: "rgba(99,102,241,0.25)", borderRadius: "4px" }} />
                    <div style={{ height: "28px", width: "100%", background: "rgba(99,102,241,0.15)", borderRadius: "6px", marginTop: "4px" }} />
                    <div style={{ height: "6px", width: "80%", background: "rgba(99,102,241,0.2)", borderRadius: "4px" }} />
                    <div style={{ height: "6px", width: "65%", background: "rgba(99,102,241,0.2)", borderRadius: "4px" }} />
                  </div>
                </div>
              </div>
              <div className="op-info">
                <div className="op-tags"><span className="op-tag">Founder</span><span className="op-tag">AI-Native</span></div>
                <h3 className="op-title">Steward</h3>
                <p className="op-desc">React Native personal finance app with Claude-powered AI reporting. Auto-categorises transactions and generates natural-language financial insights.</p>
                <div className="op-stack"><span>React Native</span><span>Claude API</span><span>Node.js</span><span>PostgreSQL</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact section" id="contact">
        <div className="container">
          <div className="contact-inner">
            <span className="section-tag">05 - Contact</span>
            <h2 className="contact-title split-text">Let&apos;s build<br /><em>something great.</em></h2>
            <p className="contact-sub">
              Actively seeking relocation to the <strong>Netherlands, Germany, or Portugal</strong>.
              Open to senior full-stack, fintech product, or AI-native engineering roles.
            </p>
            <div className="contact-links">
              <a href="mailto:andrewurom@gmail.com" className="contact-email magnetic">
                andrewurom@gmail.com
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10" /></svg>
              </a>
            </div>
            <div className="contact-socials">
              <a href="https://github.com/Akius1" target="_blank" rel="noopener" className="c-social magnetic">GitHub</a>
              <a href="https://linkedin.com/in/andrew-urom" target="_blank" rel="noopener" className="c-social magnetic">LinkedIn</a>
              <a href="tel:+2348167334417" className="c-social magnetic">+234 816 733 4417</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <span>© 2026 Andrew Urom. Built with craft.</span>
          <span>Lagos, Nigeria</span>
        </div>
      </footer>

      {/* Lightbox */}
      <div className="img-lightbox" id="lightbox">
        <button className="img-lightbox-close" id="lightboxClose">&#x2715;</button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={undefined} alt="" id="lightboxImg" />
      </div>
    </>
  );
}
