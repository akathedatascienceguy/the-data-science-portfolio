import streamlit as st
import plotly.graph_objects as go
import plotly.express as px
import pandas as pd
import numpy as np

st.set_page_config(
    page_title="Yash Vardhana Gupta | Senior Data Scientist",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ── CSS ──────────────────────────────────────────────────────────────────────
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
    --bg:        #0a0e1a;
    --surface:   #111827;
    --surface2:  #1a2236;
    --border:    #1e2d42;
    --accent1:   #6366f1;
    --accent2:   #06b6d4;
    --accent3:   #10b981;
    --accent4:   #f59e0b;
    --danger:    #ef4444;
    --text:      #e2e8f0;
    --muted:     #64748b;
    --white:     #ffffff;
}

html, body, [data-testid="stAppViewContainer"] {
    background: var(--bg) !important;
    color: var(--text) !important;
    font-family: 'Inter', sans-serif !important;
}

[data-testid="stSidebar"] {
    background: var(--surface) !important;
    border-right: 1px solid var(--border) !important;
}

[data-testid="stSidebar"] * { color: var(--text) !important; }

.block-container { padding: 2rem 2.5rem !important; max-width: 1400px; }

/* ── hero ── */
.hero-wrapper {
    background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 3rem 3.5rem;
    position: relative;
    overflow: hidden;
    margin-bottom: 2rem;
}
.hero-wrapper::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%);
    border-radius: 50%;
}
.hero-wrapper::after {
    content: '';
    position: absolute;
    bottom: -40px; left: 30%;
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%);
    border-radius: 50%;
}
.hero-name {
    font-size: 3.2rem;
    font-weight: 900;
    background: linear-gradient(135deg, #fff 0%, #a5b4fc 50%, #67e8f9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.1;
    margin-bottom: 0.4rem;
}
.hero-title {
    font-size: 1.25rem;
    color: #94a3b8;
    font-weight: 500;
    margin-bottom: 1.2rem;
}
.hero-company {
    display: inline-block;
    background: linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.2));
    border: 1px solid rgba(99,102,241,0.4);
    border-radius: 100px;
    padding: 0.35rem 1.1rem;
    font-size: 0.85rem;
    color: #a5b4fc;
    font-weight: 600;
    margin-bottom: 1.5rem;
}
.hero-bio {
    color: #94a3b8;
    font-size: 1rem;
    line-height: 1.75;
    max-width: 780px;
}

/* ── kpi cards ── */
.kpi-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
}
.kpi-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 1.4rem 1.5rem;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, border-color 0.2s;
}
.kpi-card:hover { transform: translateY(-3px); border-color: var(--accent1); }
.kpi-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: var(--card-accent, linear-gradient(90deg, var(--accent1), var(--accent2)));
}
.kpi-icon { font-size: 1.6rem; margin-bottom: 0.5rem; }
.kpi-value {
    font-size: 2rem;
    font-weight: 800;
    color: var(--white);
    line-height: 1;
    margin-bottom: 0.25rem;
}
.kpi-label {
    font-size: 0.78rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 600;
}
.kpi-sub {
    font-size: 0.75rem;
    color: var(--accent3);
    margin-top: 0.3rem;
    font-weight: 500;
}

/* ── section header ── */
.section-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin: 2rem 0 1.2rem;
}
.section-icon {
    width: 38px; height: 38px;
    background: linear-gradient(135deg, var(--accent1), var(--accent2));
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
}
.section-title {
    font-size: 1.55rem;
    font-weight: 800;
    color: var(--white);
}
.section-divider {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, var(--border), transparent);
    margin-left: 1rem;
}

/* ── timeline ── */
.timeline-item {
    display: grid;
    grid-template-columns: 12px 1fr;
    gap: 1.2rem;
    margin-bottom: 1.8rem;
    padding-left: 0.5rem;
    position: relative;
}
.timeline-dot {
    width: 12px; height: 12px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent1), var(--accent2));
    margin-top: 6px;
    flex-shrink: 0;
    box-shadow: 0 0 12px rgba(99,102,241,0.5);
}
.timeline-line {
    position: absolute;
    left: 0.5rem;
    top: 18px;
    bottom: -18px;
    width: 1px;
    background: linear-gradient(180deg, var(--border), transparent);
    transform: translateX(5.5px);
}
.job-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 1.5rem 1.8rem;
    transition: border-color 0.2s;
}
.job-card:hover { border-color: rgba(99,102,241,0.4); }
.job-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.3rem; }
.job-title { font-size: 1.1rem; font-weight: 700; color: var(--white); }
.job-period {
    font-size: 0.78rem;
    background: rgba(99,102,241,0.15);
    border: 1px solid rgba(99,102,241,0.3);
    border-radius: 100px;
    padding: 0.25rem 0.8rem;
    color: #a5b4fc;
    font-weight: 600;
    white-space: nowrap;
}
.job-company {
    font-size: 0.9rem;
    color: var(--accent2);
    font-weight: 600;
    margin-bottom: 0.9rem;
}
.job-bullets { list-style: none; padding: 0; margin: 0; }
.job-bullets li {
    position: relative;
    padding-left: 1.3rem;
    color: #94a3b8;
    font-size: 0.92rem;
    line-height: 1.65;
    margin-bottom: 0.55rem;
}
.job-bullets li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: var(--accent1);
    font-size: 0.75rem;
    top: 3px;
}

/* ── project cards ── */
.proj-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.6rem 1.8rem;
    margin-bottom: 1.2rem;
    transition: border-color 0.2s, transform 0.2s;
}
.proj-card:hover { border-color: rgba(6,182,212,0.4); transform: translateY(-2px); }
.proj-card-header { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1rem; }
.proj-icon-box {
    width: 48px; height: 48px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.4rem;
    flex-shrink: 0;
}
.proj-name { font-size: 1.15rem; font-weight: 700; color: var(--white); margin-bottom: 0.2rem; }
.proj-subtitle { font-size: 0.82rem; color: var(--muted); }

/* ── tag pill ── */
.tag {
    display: inline-block;
    background: rgba(99,102,241,0.12);
    border: 1px solid rgba(99,102,241,0.25);
    border-radius: 100px;
    padding: 0.2rem 0.7rem;
    font-size: 0.73rem;
    color: #a5b4fc;
    font-weight: 600;
    margin: 0.15rem;
}
.tag-green {
    background: rgba(16,185,129,0.12);
    border-color: rgba(16,185,129,0.25);
    color: #6ee7b7;
}
.tag-cyan {
    background: rgba(6,182,212,0.12);
    border-color: rgba(6,182,212,0.25);
    color: #67e8f9;
}
.tag-amber {
    background: rgba(245,158,11,0.12);
    border-color: rgba(245,158,11,0.25);
    color: #fcd34d;
}
.tag-red {
    background: rgba(239,68,68,0.12);
    border-color: rgba(239,68,68,0.25);
    color: #fca5a5;
}

/* ── metric row ── */
.metric-row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin: 0.8rem 0;
}
.metric-pill {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.5rem 1rem;
    text-align: center;
    min-width: 110px;
}
.metric-pill .val { font-size: 1.1rem; font-weight: 800; color: var(--white); }
.metric-pill .lbl { font-size: 0.68rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.07em; margin-top: 1px; }

/* ── skill bar ── */
.skill-item {
    margin-bottom: 0.85rem;
}
.skill-label {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    color: #cbd5e1;
    font-weight: 500;
    margin-bottom: 0.35rem;
}
.skill-track {
    height: 6px;
    background: var(--surface2);
    border-radius: 100px;
    overflow: hidden;
    border: 1px solid var(--border);
}
.skill-fill {
    height: 100%;
    border-radius: 100px;
    background: var(--fill);
}

/* ── edu card ── */
.edu-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 1.3rem 1.6rem;
    margin-bottom: 1rem;
    display: flex;
    gap: 1.2rem;
    align-items: flex-start;
}
.edu-icon {
    width: 44px; height: 44px;
    background: linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.2));
    border: 1px solid rgba(99,102,241,0.3);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.3rem;
    flex-shrink: 0;
}
.edu-school { font-size: 1rem; font-weight: 700; color: var(--white); }
.edu-degree { font-size: 0.87rem; color: var(--accent2); font-weight: 500; margin: 0.15rem 0; }
.edu-detail { font-size: 0.8rem; color: var(--muted); }
.gold-badge {
    display: inline-block;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    border-radius: 100px;
    padding: 0.18rem 0.65rem;
    font-size: 0.72rem;
    font-weight: 700;
    color: #fff;
    margin-left: 0.5rem;
}

/* ── achievement ── */
.ach-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.1rem 1.4rem;
    margin-bottom: 0.8rem;
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    transition: border-color 0.2s;
}
.ach-card:hover { border-color: rgba(245,158,11,0.35); }
.ach-icon { font-size: 1.6rem; flex-shrink: 0; }
.ach-title { font-size: 0.93rem; font-weight: 700; color: var(--white); margin-bottom: 0.2rem; }
.ach-desc { font-size: 0.82rem; color: #94a3b8; line-height: 1.55; }

/* ── progress upgrade ── */
.progress-upgrade {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--accent3);
    margin: 0.8rem 0;
}
.prog-arrow { color: #6ee7b7; font-size: 1.1rem; }
.prog-from { color: #94a3b8; }

/* ── sidebar nav ── */
.nav-section {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--muted) !important;
    font-weight: 600;
    padding: 0.5rem 0 0.3rem;
    margin-top: 0.5rem;
}

/* ── contact badge ── */
.contact-row {
    display: flex;
    gap: 0.8rem;
    flex-wrap: wrap;
    margin-top: 1.2rem;
}
.contact-chip {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 0.35rem 0.9rem;
    font-size: 0.8rem;
    color: #94a3b8;
    font-weight: 500;
}

/* misc streamlit overrides */
h1, h2, h3, h4 { color: var(--white) !important; }
.stExpander { background: var(--surface) !important; border: 1px solid var(--border) !important; border-radius: 12px !important; }
.stExpander > div { background: transparent !important; }
[data-testid="stMetricValue"] { color: var(--white) !important; font-weight: 800 !important; }
</style>
""", unsafe_allow_html=True)


# ── DATA ─────────────────────────────────────────────────────────────────────

KPI_DATA = [
    {"icon": "₹", "value": "12.54 Cr", "label": "Net Delinquency Savings", "sub": "Nov'23 – Aug'25 · SeLMoRe", "accent": "linear-gradient(90deg,#6366f1,#8b5cf6)"},
    {"icon": "👥", "value": "10M+", "label": "Users Approved", "sub": "₹121.5 Cr Revenue · LTV Model", "accent": "linear-gradient(90deg,#06b6d4,#0891b2)"},
    {"icon": "🛡️", "value": "~15K", "label": "High-Risk Blocks/Month", "sub": "53% Precision · 5ms Latency", "accent": "linear-gradient(90deg,#10b981,#059669)"},
    {"icon": "🏅", "value": "9.56", "label": "CGPA – Gold Medalist", "sub": "DTU · Dept. Rank 1 · 2022", "accent": "linear-gradient(90deg,#f59e0b,#d97706)"},
]

WORK_EXP = [
    {
        "title": "Senior Data Scientist",
        "company": "Simpl, FinTech (BNPL)",
        "period": "OCT 2023 – PRESENT",
        "bullets": [
            "Built and deployed SeLMoRe — a real-time Stacked LSTM fraud detection system achieving <b>53% precision at 5ms latency</b>, blocking ~15K high-risk users/month and delivering ₹12.54 Cr net delinquency savings over 2+ years.",
            "Developed a novel hybrid sequential-graph LGBM ensemble (HC vectors + GraphSAGE + scorecards), achieving <b>9% precision uplift</b> over baseline; authoring research paper on the methodology.",
            "Built LSTM-based LTV approval & retention models that approved <b>10M+ users</b>, generating ₹121.5 Cr revenue; deployed autoencoder-based reject inferencing boosting OOT ROC-AUC from 71% → 76%.",
            "Co-founded Culture × Data Science blog; led Simpl's first Research Roundtable on Transformers; won <b>2nd Prize in Hackathon</b> (Ads Platform) for a hybrid recommendation engine.",
        ],
    },
    {
        "title": "Data Scientist",
        "company": "Simpl, FinTech (BNPL)",
        "period": "MAY 2022 – OCT 2023",
        "bullets": [
            "Engineered TU V3 — an enhanced LightGBM credit model integrating TransUnion bureau data, improving ROC-AUC by <b>8%</b>, enabling 2.3M+ bulk approvals.",
            "Drove 200–300 additional daily transaction users with <b>3% lower delinquency</b>, making TU V3 the largest contributor to approvals after baseline models.",
        ],
    },
    {
        "title": "Data Science Intern",
        "company": "Mercedes-Benz R&D India",
        "period": "JUN 2021 – JAN 2022",
        "bullets": [
            "Built a stacked Bi-LSTM for time-to-lane-change and safety distance prediction (<b>F1: 96% / 88%</b>) for automated lane-change assistance POC.",
            "Applied unsupervised multivariate time-series clustering for labeling achieving <b>84% accuracy</b>.",
        ],
    },
]

SELMORE_VERSIONS = [
    {"version": "V1", "precision": 14.6, "label": "Baseline LSTM"},
    {"version": "V2", "precision": 37.0, "label": "+ Feature Eng. + Event Cleanup"},
    {"version": "V3", "precision": 44.0, "label": "+ Time-Delta Features + Binning"},
    {"version": "V4", "precision": 53.0, "label": "+ Stacked LSTMs + Multi-Task"},
    {"version": "V5", "precision": 55.0, "label": "+ Attention + Transformers"},
]

SKILLS_DATA = {
    "Machine Learning & DL": [
        ("LSTMs / Stacked LSTMs", 98, "#6366f1"),
        ("LightGBM / XGBoost / Ensemble", 97, "#8b5cf6"),
        ("Transformers / Attention", 88, "#a78bfa"),
        ("Graph Neural Networks (GraphSAGE)", 85, "#c4b5fd"),
        ("Autoencoders / VAE", 87, "#7c3aed"),
    ],
    "Languages & Frameworks": [
        ("Python", 99, "#06b6d4"),
        ("SQL / Spark SQL", 95, "#0891b2"),
        ("TensorFlow / Keras", 96, "#0e7490"),
        ("PyTorch", 82, "#155e75"),
        ("C++", 70, "#164e63"),
    ],
    "Data Engineering & MLOps": [
        ("PySpark (Databricks)", 92, "#10b981"),
        ("Dask / AWS Athena", 90, "#059669"),
        ("TensorFlow Serving / Docker", 88, "#047857"),
        ("Airflow / RabbitMQ", 80, "#065f46"),
        ("DynamoDB / MongoDB / Redshift", 85, "#064e3b"),
    ],
    "Visualization & BI": [
        ("Tableau / Metabase / Qlik Sense", 88, "#f59e0b"),
        ("Plotly / Matplotlib", 92, "#d97706"),
        ("Excel / Dashboard Design", 85, "#b45309"),
    ],
}

SELMORE_EVENTS = [
    ("UserApprovedEvent", 2, "#6366f1"),
    ("ZeroClickTransactionEligibilitySuccessEvent", 2, "#6366f1"),
    ("UserApprovalFailedEvent", 3, "#8b5cf6"),
    ("ZeroClickTransactionEligibilityFailedEvent", 3, "#8b5cf6"),
    ("TransactionClaimedEvent", 4, "#06b6d4"),
    ("CashbackChargedEvent", 5, "#10b981"),
    ("TransactionRefundedEvent", 6, "#0891b2"),
    ("BillGeneratedEvent", 7, "#f59e0b"),
    ("BillUpdatedEvent", 8, "#f59e0b"),
    ("UserRepaymentAttemptFailedEvent", 9, "#ef4444"),
    ("UserRepaidEvent", 10, "#10b981"),
    ("UserRepaymentFailedEvent", 11, "#ef4444"),
    ("UserCreditLimitCreatedEvent", 13, "#a78bfa"),
    ("UserCreditLimitUpdatedEvent", 13, "#a78bfa"),
    ("ZeroClickVerificationInitiationEvent", 14, "#06b6d4"),
    ("ZeroClickVerificationInitiationFailedEvent", 15, "#ef4444"),
    ("ZeroClickTokenConfirmedEvent", 16, "#10b981"),
    ("ZeroClickTokenConfirmedFailedEvent", 17, "#ef4444"),
    ("ZeroClickTokenDeletedEvent", 18, "#94a3b8"),
]


# ── HELPERS ──────────────────────────────────────────────────────────────────

def section_header(icon: str, title: str):
    st.markdown(f"""
    <div class="section-header">
        <div class="section-icon">{icon}</div>
        <div class="section-title">{title}</div>
        <div class="section-divider"></div>
    </div>
    """, unsafe_allow_html=True)


def tag(label: str, color: str = "") -> str:
    cls = f"tag tag-{color}" if color else "tag"
    return f'<span class="{cls}">{label}</span>'


def metric_pill(val: str, lbl: str) -> str:
    return f'<div class="metric-pill"><div class="val">{val}</div><div class="lbl">{lbl}</div></div>'


# ── SECTIONS ─────────────────────────────────────────────────────────────────

def render_hero():
    st.markdown("""
    <div class="hero-wrapper">
        <div class="hero-name">Yash Vardhana Gupta</div>
        <div class="hero-title">Senior Data Scientist &nbsp;·&nbsp; AI/ML Systems &nbsp;·&nbsp; FinTech</div>
        <div class="hero-company">⚡ Currently @ Simpl · BNPL FinTech</div>
        <p class="hero-bio">
            4+ years designing and deploying production ML & DL systems in FinTech. Specializes in
            <strong style="color:#a5b4fc">LSTM / Transformer sequence models</strong>,
            <strong style="color:#67e8f9">Graph Neural Networks</strong>, and
            <strong style="color:#6ee7b7">ensemble frameworks</strong> for real-time fraud detection,
            credit underwriting, and user retention. Consistently maintains portfolio delinquency
            under 1%.
        </p>
        <div class="contact-row">
            <span class="contact-chip">🎓 DTU Gold Medalist · CGPA 9.56</span>
            <span class="contact-chip">🏙️ New Delhi, India</span>
            <span class="contact-chip">📧 yvg1799@gmail.com</span>
            <span class="contact-chip">🔬 Research · Fraud · Underwriting · GenAI</span>
        </div>
    </div>
    """, unsafe_allow_html=True)


def render_kpis():
    cols = st.columns(4)
    for i, k in enumerate(KPI_DATA):
        with cols[i]:
            st.markdown(f"""
            <div class="kpi-card" style="--card-accent:{k['accent']}">
                <div class="kpi-icon">{k['icon']}</div>
                <div class="kpi-value">{k['value']}</div>
                <div class="kpi-label">{k['label']}</div>
                <div class="kpi-sub">{k['sub']}</div>
            </div>
            """, unsafe_allow_html=True)


def render_experience():
    section_header("💼", "Work Experience")
    for i, job in enumerate(WORK_EXP):
        bullets_html = "".join(f"<li>{b}</li>" for b in job["bullets"])
        line_html = '<div class="timeline-line"></div>' if i < len(WORK_EXP) - 1 else ""
        st.markdown(f"""
        <div class="timeline-item">
            <div style="position:relative">
                <div class="timeline-dot"></div>
                {line_html}
            </div>
            <div class="job-card">
                <div class="job-header">
                    <span class="job-title">{job['title']}</span>
                    <span class="job-period">{job['period']}</span>
                </div>
                <div class="job-company">{job['company']}</div>
                <ul class="job-bullets">{bullets_html}</ul>
            </div>
        </div>
        """, unsafe_allow_html=True)


def render_selmore():
    section_header("🔴", "Antifraud · SeLMoRe — Real-Time Deep Learning")

    st.markdown(f"""
    <div class="proj-card">
        <div class="proj-card-header">
            <div class="proj-icon-box" style="background:linear-gradient(135deg,rgba(239,68,68,0.2),rgba(99,102,241,0.2));border:1px solid rgba(239,68,68,0.3)">🛡️</div>
            <div>
                <div class="proj-name">SeLMoRe — Sequence-Level Model for Repeat-user fraud</div>
                <div class="proj-subtitle">Stacked LSTM · Multi-Task Learning · MaaS · TensorFlow Serving · Apache Flink</div>
            </div>
        </div>
        <div>
            {tag("Stacked LSTM")} {tag("Multi-Task", "cyan")} {tag("MaaS", "green")} {tag("DynamoDB→MongoDB", "amber")} {tag("5ms Latency", "green")} {tag("Databricks / PySpark", "cyan")}
        </div>
    </div>
    """, unsafe_allow_html=True)

    col1, col2 = st.columns([3, 2])

    with col1:
        # Precision evolution chart
        versions = [v["version"] for v in SELMORE_VERSIONS]
        precisions = [v["precision"] for v in SELMORE_VERSIONS]
        labels = [v["label"] for v in SELMORE_VERSIONS]

        fig = go.Figure()
        fig.add_trace(go.Scatter(
            x=versions, y=precisions,
            mode="lines+markers+text",
            line=dict(color="#6366f1", width=3),
            marker=dict(size=10, color="#6366f1", line=dict(color="#fff", width=2)),
            text=[f"{p}%" for p in precisions],
            textposition="top center",
            textfont=dict(color="#e2e8f0", size=12, family="Inter"),
            hovertext=labels,
            hoverinfo="x+y+text",
        ))
        fig.add_hrect(y0=50, y1=55, fillcolor="rgba(16,185,129,0.08)", line_width=0)
        fig.update_layout(
            title=dict(text="SeLMoRe Precision Evolution (2+ Years)", font=dict(color="#e2e8f0", size=14, family="Inter"), x=0),
            paper_bgcolor="rgba(0,0,0,0)", plot_bgcolor="rgba(0,0,0,0)",
            font=dict(color="#64748b", family="Inter"),
            xaxis=dict(showgrid=False, color="#64748b"),
            yaxis=dict(showgrid=True, gridcolor="rgba(30,45,66,0.8)", ticksuffix="%", color="#64748b", range=[0, 65]),
            margin=dict(l=0, r=0, t=40, b=0),
            height=280,
        )
        st.plotly_chart(fig, use_container_width=True)

    with col2:
        st.markdown("""
        <div style="display:flex;flex-direction:column;gap:0.7rem;padding-top:0.5rem">
        """, unsafe_allow_html=True)
        metrics = [
            ("53%", "Precision"), ("34.7%", "Recall"), ("86.44%", "In-Time ROC-AUC"),
            ("79.23%", "OOT ROC-AUC"), ("5ms", "P90 Latency"), ("₹12.54 Cr", "Net Savings"),
        ]
        html = '<div class="metric-row" style="flex-direction:column">'
        for v, l in metrics:
            html += metric_pill(v, l)
        html += "</div>"
        st.markdown(html, unsafe_allow_html=True)

    with st.expander("▸  Architecture & Version History", expanded=False):
        tab1, tab2, tab3, tab4 = st.tabs(["V1→V2", "V3 Enhancements", "V4 Stacked + MTL", "V5 Transformers"])

        with tab1:
            st.markdown("""
**V1 → V2 Improvements**
- Event selection & cleanup: Skipped events reduced **~40% → <1%**; added approval amounts, removed redundant features
- Coverage expanded: **2–8 → 2–15 cycle** users
- Pipeline: Training & prediction time **2 months → 2.5 days**; JSON generation **66 min → 8 min** for 100K records
- Parallelized GPU, optimised DaskQL, removed redundant joins, column pruning
- **Impact: Precision 14.6% → 37%** at ~15K blocks/month
""")

        with tab2:
            st.markdown("""
**V3 — Early Fraud Detection**
- Target label refinement: Extended grace-period cycles, enabling *earlier* fraud detection
- Added **13 key events** including approvals for point-in-time savings
- Novel `user_m_e_act` feature: time since last identical event at a merchant — flags suspicious velocity patterns
- Optimal binning on 9 numerical features + distribution skew/missing value reports (train, OOT, backfill)
- Tolerance testing: model robustness under 5–20% skipped events + alerting pipeline
- **Impact: Precision 37% → 44%, Recall +3%**
""")

        with tab3:
            st.markdown("""
**V4 — Stacked LSTMs & Multi-Task Learning**
- Simultaneously trained on **DPD30 & DPD90** targets; training lifecycle **7 days → 1 day**
- Adam optimizer + exponential LR decay + early stopping + mixed-precision training + checkpointing
- Skipped events **1% → 0.02%**
- Infrastructure: **DynamoDB → MongoDB** (halved storage costs); TensorFlow Serving for real-time scoring
- 6 new events (re-linking/delinking, credit limits) + 12 new features (delta txn amounts, max settlement age, vintage-rios)
- Exchange rate improved **₹31L → ₹18L** per crore blocked
- **Impact: Precision 44% → 53%** at same recall (~15K blocks/month)
""")

        with tab4:
            st.markdown("""
**V5 — Attention Mechanisms & Transformers**
- Introduced self-attention over the event sequence for global context capture
- Transformer encoder layers replace upper LSTM stack for parallelised training
- Further precision gains beyond 53% (ongoing)
""")

    with st.expander("▸  Event Taxonomy (19 Events)", expanded=False):
        # Visual event taxonomy
        events_df = pd.DataFrame(SELMORE_EVENTS, columns=["Event", "Priority", "Color"])

        fig2 = go.Figure(go.Bar(
            y=events_df["Event"],
            x=events_df["Priority"],
            orientation="h",
            marker=dict(color=events_df["Color"], line=dict(color="rgba(0,0,0,0)")),
            text=events_df["Priority"],
            textposition="outside",
            textfont=dict(color="#e2e8f0"),
        ))
        fig2.update_layout(
            paper_bgcolor="rgba(0,0,0,0)", plot_bgcolor="rgba(0,0,0,0)",
            xaxis=dict(showgrid=False, showticklabels=False),
            yaxis=dict(showgrid=False, color="#94a3b8", autorange="reversed"),
            margin=dict(l=0, r=40, t=10, b=0),
            height=460,
            font=dict(color="#94a3b8", family="Inter", size=11),
        )
        st.plotly_chart(fig2, use_container_width=True)

    with st.expander("▸  MaaS Architecture & Pipeline", expanded=False):
        st.markdown("""
```
┌─────────────────────────────────────────────────────────────────────┐
│                     SeLMoRe — MaaS Architecture                     │
├─────────────┬──────────────────────────────┬────────────────────────┤
│  DATA LAYER │       MODEL LAYER            │   SERVING LAYER        │
│             │                              │                        │
│  Databricks │  Stacked LSTM (TF/Keras)     │  TensorFlow Serving    │
│  PySpark    │  ┌───────────────────────┐   │  ┌──────────────────┐  │
│  AWS Athena │  │ Embedding Layer       │   │  │  REST / gRPC     │  │
│  Dask       │  │ LSTM₁ (64 H/C)        │   │  │  Pydantic Schema │  │
│             │  │ LSTM₂ (32 H/C)        │   │  │  Validation      │  │
│  Features:  │  │ Dense₁ → Dense₂       │   │  └────────┬─────────┘  │
│  19 events  │  │   └─ Sigmoid → DPD30  │   │           │            │
│  19 feats   │  │ Dense₃ → Dense₄       │   │  Apache Flink          │
│  Merchant   │  │   └─ Sigmoid → DPD90  │   │  Real-time stream      │
│  Event-time │  └───────────────────────┘   │  P90 latency: 5ms      │
│  deltas     │                              │                        │
└─────────────┴──────────────────────────────┴────────────────────────┘
  Training: Databricks GPU cluster · Mixed precision · Checkpointing
  Storage:  MongoDB (replaced DynamoDB — 50% cost reduction)
  Scoring:  1.5 days end-to-end (down from multiple days)
```
""")


def render_ensemble():
    section_header("🔵", "Antifraud · Hybrid Sequential-Graph Ensemble")

    st.markdown(f"""
    <div class="proj-card">
        <div class="proj-card-header">
            <div class="proj-icon-box" style="background:linear-gradient(135deg,rgba(99,102,241,0.2),rgba(16,185,129,0.2));border:1px solid rgba(99,102,241,0.3)">🕸️</div>
            <div>
                <div class="proj-name">Hybrid Sequential-Graph LGBM Ensemble</div>
                <div class="proj-subtitle">HC Vectors · GraphSAGE Embeddings · Scorecard Fusion · Research Paper In Progress</div>
            </div>
        </div>
        <div>
            {tag("GraphSAGE")} {tag("LGBM Ensemble")} {tag("HC Vectors", "cyan")} {tag("Research Paper", "amber")} {tag("+9% Precision", "green")}
        </div>
    </div>
    """, unsafe_allow_html=True)

    col1, col2 = st.columns(2)
    with col1:
        st.markdown("""
**Framework**
- Combined **HC vectors** from stacked LSTM (SeLMoRe), Selmore raw scores, scorecard outputs, exponentially weighted delays, and **GraphSAGE-based graph embeddings**
- Unified feature space fed into a single **LightGBM classifier**
- Integrates both **sequential behavioral patterns** (event journey) and **graph-structural patterns** (device/phone/email linkages)
""")
    with col2:
        # Precision comparison
        fig = go.Figure(go.Bar(
            x=["Baseline Model", "Ensemble Model"],
            y=[44, 53],
            marker=dict(
                color=["rgba(100,116,139,0.6)", "rgba(99,102,241,0.8)"],
                line=dict(color=["#64748b", "#6366f1"], width=2)
            ),
            text=["44%", "53%"],
            textposition="outside",
            textfont=dict(color="#e2e8f0", size=14, family="Inter"),
        ))
        fig.update_layout(
            title=dict(text="Precision Uplift", font=dict(color="#e2e8f0", size=13), x=0),
            paper_bgcolor="rgba(0,0,0,0)", plot_bgcolor="rgba(0,0,0,0)",
            yaxis=dict(showgrid=True, gridcolor="rgba(30,45,66,0.8)", ticksuffix="%", color="#64748b", range=[0, 65]),
            xaxis=dict(showgrid=False, color="#64748b"),
            font=dict(color="#64748b", family="Inter"),
            margin=dict(l=0, r=0, t=35, b=0),
            height=220,
        )
        st.plotly_chart(fig, use_container_width=True)

    st.markdown("""
> **Research:** Currently authoring _"Hybrid Sequential-Graph Ensemble for Fraud Detection in User Journeys"_ — detailing the ensemble methodology, feature fusion strategy, and performance gains.
""")


def render_underwriting():
    section_header("🟢", "Underwriting Systems")

    tab1, tab2, tab3 = st.tabs(["LTV Approval & Retention Model", "Reject Inferencing", "TU V3 Credit Model"])

    with tab1:
        col1, col2 = st.columns([3, 2])
        with col1:
            st.markdown(f"""
            <div class="proj-card" style="margin-bottom:0.5rem">
                <div class="proj-card-header">
                    <div class="proj-icon-box" style="background:linear-gradient(135deg,rgba(16,185,129,0.2),rgba(6,182,212,0.2));border:1px solid rgba(16,185,129,0.3)">📈</div>
                    <div>
                        <div class="proj-name">LSTM-based LTV Underwriting Model</div>
                        <div class="proj-subtitle">Approval · Retention · Multi-Task Learning · 10M+ Users</div>
                    </div>
                </div>
                <div>{tag("Stacked LSTM")} {tag("Multi-Task", "cyan")} {tag("DPD30 + LTV", "green")} {tag("10M+ Users", "amber")}</div>
            </div>
            """, unsafe_allow_html=True)
            st.markdown("""
**Architecture:**
`Input → Embedding Layer → LSTM₁(64) → LSTM₂(32) → [Branch 1: Dense → Sigmoid → DPD30] + [Branch 2: Dense → Sigmoid → LTV]`

**Key Features Used:**
Merchant ID · Transaction amounts (log, ratio) · Time-of-day properties · Merchant properties · Device price/affluence · Demographics change · Rate-of-events · Device-city interaction · User visibility

**Interesting Observations:**
- Masking layer for variable-length sequences
- Dropout + Layer + Batch Normalisation
- Split from 80/20 → 90/10 for more training signal
- Formula: `D/(1-D)×R` → **+6 pp retention uplift** with only 0.089% delinquency trade-off at same recall
- CTR uplift for high-intent users: **0.1% → 0.26%**
""")
        with col2:
            metrics2 = [
                ("71%", "ROC-AUC (Approval)"), ("65%", "ROC-AUC (Retention)"),
                ("10M+", "Users Approved"), ("₹121.5 Cr", "Revenue Generated"),
                ("3K/day", "New User Acquisition"), ("80%", "Share of Total Approvals"),
            ]
            html = '<div style="display:flex;flex-direction:column;gap:0.6rem;padding-top:0.3rem">'
            for v, l in metrics2:
                html += metric_pill(v, l)
            html += "</div>"
            st.markdown(html, unsafe_allow_html=True)

    with tab2:
        col1, col2 = st.columns(2)
        with col1:
            st.markdown(f"""
            <div class="proj-card" style="margin-bottom:0.5rem">
                <div class="proj-card-header">
                    <div class="proj-icon-box" style="background:linear-gradient(135deg,rgba(139,92,246,0.2),rgba(6,182,212,0.2));border:1px solid rgba(139,92,246,0.3)">🔄</div>
                    <div>
                        <div class="proj-name">Autoencoder-based Reject Inferencing</div>
                        <div class="proj-subtitle">USL → SL · Alternate Data · Bureau + Merchant</div>
                    </div>
                </div>
                <div>{tag("Autoencoder")} {tag("Unsupervised→Supervised", "cyan")} {tag("CRIF · TU · Myntra · Zepto", "amber")}</div>
            </div>
            """, unsafe_allow_html=True)
            st.markdown("""
**Problem:** Standard supervised models trained only on approved users suffer from **confirmation bias** — rejected users are never observed.

**Solution:** Autoencoder pipeline (`Encoder → Bottleneck → Decoder`, minimise reconstruction loss) trained on alternate merchant (Myntra, Zepto) and bureau data (CRIF, TransUnion) to generate enriched latent representations for rejected users, enabling supervised training without label leakage.

**Why Autoencoder > PCA?** Captures **non-linear interactions** (vs PCA/SVD which are purely linear). Extension to VAE uses KL divergence to regularise the latent distribution to a normal — enabling generation.
""")
        with col2:
            fig = go.Figure()
            fig.add_trace(go.Scatter(
                x=["Baseline (Supervised Only)", "With Reject Inferencing"],
                y=[71, 76],
                mode="lines+markers",
                fill="tozeroy",
                fillcolor="rgba(16,185,129,0.08)",
                line=dict(color="#10b981", width=3),
                marker=dict(size=12, color="#10b981"),
            ))
            fig.update_layout(
                title=dict(text="OOT ROC-AUC Uplift", font=dict(color="#e2e8f0", size=13), x=0),
                paper_bgcolor="rgba(0,0,0,0)", plot_bgcolor="rgba(0,0,0,0)",
                yaxis=dict(showgrid=True, gridcolor="rgba(30,45,66,0.8)", ticksuffix="%", color="#64748b", range=[65, 82]),
                xaxis=dict(showgrid=False, color="#64748b"),
                font=dict(color="#64748b", family="Inter"),
                margin=dict(l=0, r=0, t=35, b=0),
                height=200,
            )
            st.plotly_chart(fig, use_container_width=True)

    with tab3:
        col1, col2 = st.columns([3, 2])
        with col1:
            st.markdown(f"""
            <div class="proj-card" style="margin-bottom:0.5rem">
                <div class="proj-card-header">
                    <div class="proj-icon-box" style="background:linear-gradient(135deg,rgba(245,158,11,0.2),rgba(99,102,241,0.2));border:1px solid rgba(245,158,11,0.3)">🏦</div>
                    <div>
                        <div class="proj-name">TU V3 — Growth Credit Scoring Model</div>
                        <div class="proj-subtitle">LightGBM · TransUnion Bureau Integration · 2.3M+ Approvals</div>
                    </div>
                </div>
                <div>{tag("LightGBM")} {tag("TransUnion CIBIL", "amber")} {tag("+8% ROC-AUC", "green")} {tag("2.3M Approvals", "cyan")} {tag("-3% Delinquency", "green")}</div>
            </div>
            """, unsafe_allow_html=True)
            st.markdown("""
- Integrated **TransUnion (CIBIL) bureau data** with merchant and user activity features into an enhanced LightGBM credit model
- End-to-end ownership: EDA → feature engineering (identity + credit-level) → model selection → containerised prediction pipeline
- **+8% ROC-AUC** over existing model, enabling 2.3M previously unapproved users to gain approval
- Drove **200–300 incremental transaction users/day** — largest contributor to approvals after baseline models
- Outperformed TU V2 on high-risk UNT (unapproved) users, contributing to **−3% delinquency rate**
""")
        with col2:
            metrics3 = [
                ("+8%", "ROC-AUC Improvement"), ("2.3M+", "New Users Approved"),
                ("200–300", "Incremental Users/Day"), ("−3%", "Delinquency Drop"),
            ]
            html = '<div style="display:flex;flex-direction:column;gap:0.7rem;padding-top:0.5rem">'
            for v, l in metrics3:
                html += metric_pill(v, l)
            html += "</div>"
            st.markdown(html, unsafe_allow_html=True)


def render_other_projects():
    section_header("🔬", "Research, Blogs & Other Projects")

    col1, col2 = st.columns(2)

    with col1:
        st.markdown("""
**Blog Series: Culture × Data Science**

Co-founded _Culture × Data Science_ — a publication exploring data science practices through real-world cultural analogies. Debut article: _"From Stethoscopes to PR Curves"_.

---

**Research Roundtable**

Conducted Simpl's **first Research Roundtable** on Transformers and their role in sequence modeling for FinTech use cases.

---

**Hackathon — 2nd Prize, Simpl Ads Platform**

Built a hybrid collaborative + content-based ad recommendation engine:
- Candidate generation: Repeat users with ≥5 transactions
- Scoring: Exponentially weighted merchant × category score
- Re-ranking: Non-conflict recommendations, undiscovered merchant uplift, high-presence penalties
""")

    with col2:
        st.markdown("""
**Speed-Sensitive Smart Speed Bump** *(Published — Elsevier, 2022)*

Intelligent retractable speed breaker adjusting to vehicle speed. Integrated YOLOv4 + Hidden Markov Models + licence plate recognition. **90% mean precision** in congestion/emergency detection.

---

**Weapon & Mask Detection — VAAS** *(2021)*

Real-time deep learning security system. **F1: 0.92**, 48.4 FPS inference. Automated authority alerts with optimised threshold parameters.

---

**COVID-19 Detection via POCUS Ultrasound** *(2020)*

VGG-16 / MobileNetV2 / NasNet ensemble on lung ultrasound images. **95.2% accuracy** on 60/40 imbalanced dataset.

---

**Autonomous Drone — 3D Motion Planning** *(2020)*

Event-driven Python control for autonomous flight, waypoint planning, and collision-free navigation in dense environments using real-world map data.
""")


def render_certifications():
    section_header("🏆", "Achievements & Certifications")

    achievements = [
        {
            "icon": "🥇",
            "title": "DTU Vice-Chancellor Gold Medalist (2018–2022)",
            "desc": "Departmental Rank 1 · CGPA 9.56/10 · Merit scholarships for academic excellence throughout",
        },
        {
            "icon": "🚗",
            "title": "Self-Driving Cars Specialization — University of Toronto",
            "desc": "CARLA simulator · ES-EKF localization · YOLOv4 object detection · Hierarchical motion planner for lane-change navigation",
        },
        {
            "icon": "🧠",
            "title": "ML & DL Specialization — DeepLearning.AI",
            "desc": "Projects: House price, cancer prediction, sign language DNN, autonomous driving OD, neural style transfer, Shakespeare generation, neural machine translation",
        },
        {
            "icon": "🏅",
            "title": "Winner — Web Development Battle 2020 (Internshala)",
            "desc": "99% score · Responsive full-stack budget management web application",
        },
        {
            "icon": "2️⃣",
            "title": "2nd Prize — Simpl Internal Hackathon (Ads Platform)",
            "desc": "Hybrid recommendation engine for user retention & acquisition",
        },
    ]

    for a in achievements:
        st.markdown(f"""
        <div class="ach-card">
            <div class="ach-icon">{a['icon']}</div>
            <div>
                <div class="ach-title">{a['title']}</div>
                <div class="ach-desc">{a['desc']}</div>
            </div>
        </div>
        """, unsafe_allow_html=True)


def render_skills():
    section_header("⚙️", "Technical Skills")

    for category, skills in SKILLS_DATA.items():
        st.markdown(f"**{category}**")
        for skill, level, color in skills:
            st.markdown(f"""
            <div class="skill-item">
                <div class="skill-label">
                    <span>{skill}</span>
                    <span style="color:{color};font-weight:700">{level}%</span>
                </div>
                <div class="skill-track">
                    <div class="skill-fill" style="width:{level}%;--fill:{color};background:{color}"></div>
                </div>
            </div>
            """, unsafe_allow_html=True)
        st.markdown("<br>", unsafe_allow_html=True)


def render_education():
    section_header("🎓", "Education")

    edu = [
        {
            "icon": "🏛️",
            "school": "Delhi Technological University (DTU)",
            "degree": "B.Tech · Mechanical Engineering (Automotive Specialization)",
            "detail": "2018 – 2022",
            "badge": "Gold Medalist · CGPA 9.56",
        },
        {
            "icon": "📚",
            "school": "DL DAV Model School, New Delhi",
            "degree": "Class XII",
            "detail": "94.8%",
            "badge": None,
        },
        {
            "icon": "📚",
            "school": "DPS Siliguri",
            "degree": "Class X",
            "detail": "CGPA: 10/10",
            "badge": None,
        },
    ]

    for e in edu:
        badge_html = f'<span class="gold-badge">⭐ {e["badge"]}</span>' if e["badge"] else ""
        st.markdown(f"""
        <div class="edu-card">
            <div class="edu-icon">{e['icon']}</div>
            <div>
                <div class="edu-school">{e['school']}{badge_html}</div>
                <div class="edu-degree">{e['degree']}</div>
                <div class="edu-detail">{e['detail']}</div>
            </div>
        </div>
        """, unsafe_allow_html=True)


def render_impact_chart():
    section_header("📊", "Business Impact Overview")

    col1, col2 = st.columns(2)

    with col1:
        # SeLMoRe financial impact
        months = ["Nov'23", "Mar'24", "Jun'24", "Sep'24", "Dec'24", "Mar'25", "Jun'25", "Aug'25"]
        savings = [0.8, 2.1, 3.9, 6.0, 8.5, 11.2, 13.5, 15.08]
        costs = [0.15, 0.4, 0.7, 1.1, 1.5, 1.9, 2.3, 2.54]
        net = [s - c for s, c in zip(savings, costs)]

        fig = go.Figure()
        fig.add_trace(go.Scatter(x=months, y=savings, name="Gross Savings (₹ Cr)", line=dict(color="#10b981", width=2.5), fill="tozeroy", fillcolor="rgba(16,185,129,0.07)"))
        fig.add_trace(go.Scatter(x=months, y=net, name="Net Impact (₹ Cr)", line=dict(color="#6366f1", width=2.5, dash="dash")))
        fig.add_trace(go.Scatter(x=months, y=costs, name="Cost in Good TPV (₹ Cr)", line=dict(color="#ef4444", width=1.5)))

        fig.update_layout(
            title=dict(text="SeLMoRe Cumulative Financial Impact", font=dict(color="#e2e8f0", size=13), x=0),
            paper_bgcolor="rgba(0,0,0,0)", plot_bgcolor="rgba(0,0,0,0)",
            legend=dict(bgcolor="rgba(0,0,0,0)", font=dict(color="#94a3b8", size=10)),
            yaxis=dict(showgrid=True, gridcolor="rgba(30,45,66,0.8)", tickprefix="₹", ticksuffix=" Cr", color="#64748b"),
            xaxis=dict(showgrid=False, color="#64748b"),
            font=dict(color="#64748b", family="Inter"),
            margin=dict(l=0, r=0, t=35, b=0),
            height=270,
        )
        st.plotly_chart(fig, use_container_width=True)

    with col2:
        # Approvals breakdown
        labels = ["LTV LSTM Model", "TU V3", "Other Models"]
        values = [80, 13, 7]
        colors = ["#6366f1", "#10b981", "#64748b"]

        fig2 = go.Figure(go.Pie(
            labels=labels, values=values,
            hole=0.6,
            marker=dict(colors=colors, line=dict(color="#0a0e1a", width=3)),
            textfont=dict(color="#e2e8f0", family="Inter"),
        ))
        fig2.add_annotation(text="10M+<br><span style='font-size:11px'>Approvals</span>", x=0.5, y=0.5, showarrow=False,
                            font=dict(color="#ffffff", size=18, family="Inter"))
        fig2.update_layout(
            title=dict(text="Approval Share by Model (%)", font=dict(color="#e2e8f0", size=13), x=0),
            paper_bgcolor="rgba(0,0,0,0)", plot_bgcolor="rgba(0,0,0,0)",
            legend=dict(bgcolor="rgba(0,0,0,0)", font=dict(color="#94a3b8", size=11)),
            font=dict(color="#64748b", family="Inter"),
            margin=dict(l=0, r=0, t=35, b=0),
            height=270,
        )
        st.plotly_chart(fig2, use_container_width=True)


# ── SIDEBAR ──────────────────────────────────────────────────────────────────

def render_sidebar():
    with st.sidebar:
        st.markdown("""
        <div style="padding:1rem 0 0.5rem">
            <div style="font-size:1.1rem;font-weight:800;color:#e2e8f0">Yash Vardhana Gupta</div>
            <div style="font-size:0.8rem;color:#64748b;margin-top:0.2rem">Senior Data Scientist</div>
        </div>
        <hr style="border-color:#1e2d42;margin:0.8rem 0">
        """, unsafe_allow_html=True)

        pages = {
            "🏠  Overview": "overview",
            "💼  Experience": "experience",
            "📊  Impact Charts": "impact",
            "🛡️  SeLMoRe (Antifraud)": "selmore",
            "🕸️  Ensemble Model": "ensemble",
            "📈  Underwriting Systems": "underwriting",
            "🔬  Research & Projects": "research",
            "⚙️  Skills": "skills",
            "🎓  Education": "education",
            "🏆  Achievements": "achievements",
        }

        selected = st.radio(
            "Navigate",
            list(pages.keys()),
            label_visibility="collapsed",
        )

        st.markdown("""
        <hr style="border-color:#1e2d42;margin:1rem 0">
        <div style="font-size:0.72rem;color:#475569;line-height:1.6">
            <b style="color:#64748b">Core Stack</b><br>
            Python · TensorFlow · LightGBM<br>
            PySpark · Databricks · Docker<br>
            TF Serving · Flink · MongoDB
        </div>
        <hr style="border-color:#1e2d42;margin:0.8rem 0">
        <div style="font-size:0.72rem;color:#475569">
            © 2025 · Built with Streamlit
        </div>
        """, unsafe_allow_html=True)

        return pages[selected]


# ── MAIN ─────────────────────────────────────────────────────────────────────

def main():
    page = render_sidebar()

    if page == "overview":
        render_hero()
        render_kpis()
        render_experience()

    elif page == "experience":
        render_hero()
        render_experience()

    elif page == "impact":
        render_hero()
        render_kpis()
        render_impact_chart()

    elif page == "selmore":
        render_selmore()

    elif page == "ensemble":
        render_ensemble()

    elif page == "underwriting":
        render_underwriting()

    elif page == "research":
        render_other_projects()

    elif page == "skills":
        render_skills()

    elif page == "education":
        render_education()

    elif page == "achievements":
        render_certifications()


if __name__ == "__main__":
    main()
