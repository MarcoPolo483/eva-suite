import React from 'react';
import { useI18n } from '../i18n/i18n';
import AuditTrailDashboard from '../components/AuditTrailDashboard';

const DevToolsProductPage: React.FC = () => {
    const { t } = useI18n();

    return (
        <div className="container">
            {/* Hero Section */}
            <section className="card" style={{ marginBottom: '2rem' }}>
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#4ade80' }}>
                        ⚙️ {t('devtools.hero.title')}
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#aaa', maxWidth: '800px', margin: '0 auto 1rem' }}>
                        {t('devtools.hero.subtitle')}
                    </p>
                    <p style={{ fontSize: '1rem', color: '#888', maxWidth: '700px', margin: '0 auto' }}>
                        {t('devtools.hero.description')}
                    </p>
                </div>
            </section>

            {/* Highlight Cards */}
            <section style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    <div className="card" style={{ padding: '1.5rem' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔎</div>
                        <h3 style={{ marginBottom: '0.75rem', color: '#4ade80' }}>{t('devtools.highlights.audit.title')}</h3>
                        <p style={{ color: '#aaa', fontSize: '0.95rem' }}>{t('devtools.highlights.audit.description')}</p>
                    </div>
                    <div className="card" style={{ padding: '1.5rem' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>⚙️</div>
                        <h3 style={{ marginBottom: '0.75rem', color: '#4ade80' }}>{t('devtools.highlights.automate.title')}</h3>
                        <p style={{ color: '#aaa', fontSize: '0.95rem' }}>{t('devtools.highlights.automate.description')}</p>
                    </div>
                    <div className="card" style={{ padding: '1.5rem' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>💸</div>
                        <h3 style={{ marginBottom: '0.75rem', color: '#4ade80' }}>{t('devtools.highlights.measure.title')}</h3>
                        <p style={{ color: '#aaa', fontSize: '0.95rem' }}>{t('devtools.highlights.measure.description')}</p>
                    </div>
                    <div className="card" style={{ padding: '1.5rem' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📊</div>
                        <h3 style={{ marginBottom: '0.75rem', color: '#4ade80' }}>{t('devtools.highlights.liveops.title')}</h3>
                        <p style={{ color: '#aaa', fontSize: '0.95rem' }}>{t('devtools.highlights.liveops.description')}</p>
                    </div>
                    <div className="card" style={{ padding: '1.5rem' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔄</div>
                        <h3 style={{ marginBottom: '0.75rem', color: '#4ade80' }}>{t('devtools.highlights.multirepo.title')}</h3>
                        <p style={{ color: '#aaa', fontSize: '0.95rem' }}>{t('devtools.highlights.multirepo.description')}</p>
                    </div>
                    <div className="card" style={{ padding: '1.5rem' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🧪</div>
                        <h3 style={{ marginBottom: '0.75rem', color: '#4ade80' }}>{t('devtools.highlights.experiments.title')}</h3>
                        <p style={{ color: '#aaa', fontSize: '0.95rem' }}>{t('devtools.highlights.experiments.description')}</p>
                    </div>
                </div>
            </section>

            {/* EVA Audit Trail Section */}
            <section className="card" style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#4ade80', marginBottom: '1rem' }}>
                    📋 {t('devtools.auditTrail.title')}
                </h2>
                <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>
                    {t('devtools.auditTrail.description')}
                </p>
                <div style={{ background: 'rgba(74, 222, 128, 0.05)', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#4ade80' }}>
                        {t('devtools.auditTrail.features.title')}
                    </h3>
                    <ul style={{ color: '#aaa', lineHeight: '1.8' }}>
                        <li><strong>{t('devtools.auditTrail.features.jsonl')}</strong> – {t('devtools.auditTrail.features.jsonlDesc')}</li>
                        <li><strong>{t('devtools.auditTrail.features.map')}</strong> – {t('devtools.auditTrail.features.mapDesc')}</li>
                        <li><strong>{t('devtools.auditTrail.features.queries')}</strong> – {t('devtools.auditTrail.features.queriesDesc')}</li>
                        <li><strong>{t('devtools.auditTrail.features.sessions')}</strong> – {t('devtools.auditTrail.features.sessionsDesc')}</li>
                    </ul>
                </div>

                {/* Live Dashboard */}
                <h3 style={{ marginBottom: '1rem', color: '#4ade80' }}>{t('devtools.auditTrail.liveDashboard')}</h3>
                <AuditTrailDashboard />
            </section>

            {/* P02 Requirements Engine & Power BI Analytics */}
            <section className="card" style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#4ade80', marginBottom: '1rem' }}>
                    🤖 {t('devtools.p02.title')}
                </h2>
                <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>
                    {t('devtools.p02.description')}
                </p>

                {/* Power BI Integration Callout */}
                <div style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
                    border: '2px solid rgba(59, 130, 246, 0.3)',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    marginBottom: '1.5rem'
                }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#60a5fa' }}>
                        📊 {t('devtools.p02.powerbi.title')}
                    </h3>
                    <p style={{ color: '#aaa', marginBottom: '1rem' }}>
                        {t('devtools.p02.powerbi.description')}
                    </p>
                    <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
                        <code style={{ color: '#22c55e', fontSize: '0.9rem' }}>
                            .\scripts\p02-usage-report.ps1 -AsCsv
                        </code>
                    </div>
                    <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        <strong>{t('devtools.p02.powerbi.output')}</strong> docs\_audit\P02-Usage-Report.csv
                    </p>
                    <p style={{ color: '#888', fontSize: '0.9rem' }}>
                        <strong>{t('devtools.p02.powerbi.columns')}</strong> {t('devtools.p02.powerbi.columnsDesc')}
                    </p>

                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                            <strong>{t('devtools.p02.powerbi.separation.title')}</strong>
                        </p>
                        <ul style={{ color: '#888', fontSize: '0.85rem', lineHeight: '1.6', marginLeft: '1.5rem' }}>
                            <li>{t('devtools.p02.powerbi.separation.devtools')}</li>
                            <li>{t('devtools.p02.powerbi.separation.liveops')}</li>
                        </ul>
                    </div>
                </div>

                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#4ade80' }}>
                    {t('devtools.p02.capabilities.title')}
                </h3>
                <ul style={{ color: '#aaa', lineHeight: '1.8' }}>
                    <li>{t('devtools.p02.capabilities.usage')}</li>
                    <li>{t('devtools.p02.capabilities.breakdown')}</li>
                    <li>{t('devtools.p02.capabilities.filters')}</li>
                    <li>{t('devtools.p02.capabilities.export')}</li>
                </ul>
            </section>

            {/* FinOps Integration */}
            <section className="card" style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#4ade80', marginBottom: '1rem' }}>
                    💰 {t('devtools.finops.title')}
                </h2>
                <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>
                    {t('devtools.finops.description')}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: 'rgba(74, 222, 128, 0.05)', padding: '1rem', borderRadius: '6px' }}>
                        <h4 style={{ color: '#4ade80', marginBottom: '0.5rem' }}>{t('devtools.finops.metrics.perFile')}</h4>
                        <p style={{ color: '#888', fontSize: '0.9rem' }}>{t('devtools.finops.metrics.perFileDesc')}</p>
                    </div>
                    <div style={{ background: 'rgba(74, 222, 128, 0.05)', padding: '1rem', borderRadius: '6px' }}>
                        <h4 style={{ color: '#4ade80', marginBottom: '0.5rem' }}>{t('devtools.finops.metrics.perFeature')}</h4>
                        <p style={{ color: '#888', fontSize: '0.9rem' }}>{t('devtools.finops.metrics.perFeatureDesc')}</p>
                    </div>
                    <div style={{ background: 'rgba(74, 222, 128, 0.05)', padding: '1rem', borderRadius: '6px' }}>
                        <h4 style={{ color: '#4ade80', marginBottom: '0.5rem' }}>{t('devtools.finops.metrics.perSprint')}</h4>
                        <p style={{ color: '#888', fontSize: '0.9rem' }}>{t('devtools.finops.metrics.perSprintDesc')}</p>
                    </div>
                </div>
            </section>

            {/* LiveOps Dashboards */}
            <section className="card" style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#4ade80', marginBottom: '1rem' }}>
                    📊 {t('devtools.liveops.title')}
                </h2>
                <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>
                    {t('devtools.liveops.description')}
                </p>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#4ade80' }}>
                    {t('devtools.liveops.dashboards.title')}
                </h3>
                <ul style={{ color: '#aaa', lineHeight: '1.8' }}>
                    <li><strong>{t('devtools.liveops.dashboards.activity')}</strong> – {t('devtools.liveops.dashboards.activityDesc')}</li>
                    <li><strong>{t('devtools.liveops.dashboards.hotspots')}</strong> – {t('devtools.liveops.dashboards.hotspotsDesc')}</li>
                    <li><strong>{t('devtools.liveops.dashboards.velocity')}</strong> – {t('devtools.liveops.dashboards.velocityDesc')}</li>
                    <li><strong>{t('devtools.liveops.dashboards.sessions')}</strong> – {t('devtools.liveops.dashboards.sessionsDesc')}</li>
                </ul>
            </section>

            {/* Multi-Repo Pattern */}
            <section className="card" style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#4ade80', marginBottom: '1rem' }}>
                    🔄 {t('devtools.multirepo.title')}
                </h2>
                <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>
                    {t('devtools.multirepo.description')}
                </p>
                <div style={{ background: 'rgba(74, 222, 128, 0.05)', padding: '1.5rem', borderRadius: '8px' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#4ade80' }}>
                        {t('devtools.multirepo.bootstrap.title')}
                    </h3>
                    <ol style={{ color: '#aaa', lineHeight: '1.8' }}>
                        <li>{t('devtools.multirepo.bootstrap.step1')}</li>
                        <li>{t('devtools.multirepo.bootstrap.step2')}</li>
                        <li>{t('devtools.multirepo.bootstrap.step3')}</li>
                        <li>{t('devtools.multirepo.bootstrap.step4')}</li>
                        <li>{t('devtools.multirepo.bootstrap.step5')}</li>
                    </ol>
                </div>
            </section>

            {/* GitHub Actions Automation */}
            <section className="card" style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#4ade80', marginBottom: '1rem' }}>
                    🤖 {t('devtools.automation.title')}
                </h2>
                <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>
                    {t('devtools.automation.description')}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '1rem', borderRadius: '6px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌙</div>
                        <h4 style={{ color: '#60a5fa', marginBottom: '0.5rem' }}>{t('devtools.automation.triggers.nightly')}</h4>
                        <p style={{ color: '#888', fontSize: '0.85rem' }}>{t('devtools.automation.triggers.nightlyDesc')}</p>
                    </div>
                    <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '1rem', borderRadius: '6px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📝</div>
                        <h4 style={{ color: '#60a5fa', marginBottom: '0.5rem' }}>{t('devtools.automation.triggers.push')}</h4>
                        <p style={{ color: '#888', fontSize: '0.85rem' }}>{t('devtools.automation.triggers.pushDesc')}</p>
                    </div>
                    <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '1rem', borderRadius: '6px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎯</div>
                        <h4 style={{ color: '#60a5fa', marginBottom: '0.5rem' }}>{t('devtools.automation.triggers.manual')}</h4>
                        <p style={{ color: '#888', fontSize: '0.85rem' }}>{t('devtools.automation.triggers.manualDesc')}</p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="card" style={{ textAlign: 'center', padding: '3rem 2rem', background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)' }}>
                <h2 style={{ color: '#4ade80', marginBottom: '1rem', fontSize: '1.8rem' }}>
                    {t('devtools.cta.title')}
                </h2>
                <p style={{ color: '#aaa', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
                    {t('devtools.cta.subtitle')}
                </p>
                <p style={{ color: '#888', fontSize: '0.95rem', maxWidth: '700px', margin: '0 auto' }}>
                    {t('devtools.cta.description')}
                </p>
            </section>
        </div>
    );
};

export default DevToolsProductPage;
