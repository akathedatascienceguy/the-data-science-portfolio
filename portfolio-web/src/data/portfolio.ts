export const profile = {
  name: 'Yash Vardhan Gupta',
  initials: 'YVG',
  title: 'Founding Data Scientist',
  email: 'yvg1799@gmail.com',
  location: 'Bengaluru, India',
  currentCompany: 'SuperMoney',
  bio: '5+ years designing and deploying production ML & DL systems in FinTech. Currently founding the data science function at SuperMoney — replacing rule-based systems with modern ML, driving ₹60 Cr/month incremental delta (target ₹300 Cr by Dec \'26). Specialises in LSTM / Transformer sequence models, Graph Neural Networks, reject inferencing, and learning-to-rank. Consistently maintains portfolio delinquency under 1%.',
}

export const kpis = [
  {
    value: 300,
    prefix: '₹',
    suffix: ' Cr',
    label: 'Personal Loans Target',
    sub: '₹60 Cr/month now · SuperMoney',
    accent: 'from-amber-500 to-orange-500',
    glowColor: 'rgba(245,158,11,0.25)',
    icon: '🚀',
  },
  {
    value: 12.54,
    prefix: '₹',
    suffix: ' Cr',
    decimals: 2,
    label: 'Net Delinquency Savings',
    sub: 'Nov\'23 – Aug\'25 · SeLMoRe · Simpl',
    accent: 'from-indigo-500 to-violet-500',
    glowColor: 'rgba(99,102,241,0.25)',
    icon: '🛡️',
  },
  {
    value: 10,
    suffix: 'M+',
    label: 'Users Approved',
    sub: '₹121.5 Cr Revenue · LTV Model · Simpl',
    accent: 'from-cyan-500 to-blue-500',
    glowColor: 'rgba(6,182,212,0.25)',
    icon: '👥',
  },
  {
    value: 9.56,
    suffix: '/10',
    decimals: 2,
    label: 'CGPA — Gold Medalist',
    sub: 'DTU · Dept. Rank 1 · 2022',
    accent: 'from-emerald-500 to-teal-500',
    glowColor: 'rgba(16,185,129,0.25)',
    icon: '🏅',
  },
]

export const experience = [
  {
    title: 'Founding Data Scientist',
    company: 'SuperMoney',
    type: 'Consumer FinTech',
    period: '2025 – Present',
    current: true,
    color: '#10b981',
    bullets: [
      'Architected the end-to-end ML system for the Personal Loans vertical — completely replacing traditional models and rule-based systems, now driving <strong>₹60 Cr/month incremental delta</strong> (target: ₹300 Cr/month by Dec 2026).',
      'Deployed <strong>reject inferencing and learning-to-rank (LTR)</strong> approaches to surface the best loan offers per user, eliminating confirmation bias and maximising conversion.',
      'Designed the <strong>Pay in 3 Charter from scratch</strong> — solving cold-start underwriting via unsupervised clustering to segment users without prior repayment history.',
      'Building <strong>personalisation systems</strong> to tailor product surfaces, offer ordering, and credit limits at the individual user level.',
    ],
  },
  {
    title: 'Senior Data Scientist',
    company: 'Simpl',
    type: 'FinTech · BNPL',
    period: 'Oct 2023 – 2025',
    current: false,
    color: '#6366f1',
    bullets: [
      'Built and deployed SeLMoRe — a real-time Stacked LSTM fraud detection system achieving <strong>53% precision at 5ms latency</strong>, blocking ~15K high-risk users/month and delivering ₹12.54 Cr net savings over 2+ years.',
      'Developed a novel hybrid sequential-graph LGBM ensemble (HC vectors + GraphSAGE + scorecards), achieving <strong>9% precision uplift</strong> over baseline; authoring research paper.',
      'Built LSTM-based LTV approval & retention models approving <strong>10M+ users</strong>, generating ₹121.5 Cr revenue; autoencoder reject inferencing boosted OOT ROC-AUC from 71% → 76%.',
      'Co-founded Culture × Data Science blog; led Simpl\'s first Research Roundtable on Transformers; won <strong>2nd Prize in Hackathon</strong> for a hybrid recommendation engine.',
    ],
  },
  {
    title: 'Data Scientist',
    company: 'Simpl',
    type: 'FinTech · BNPL',
    period: 'May 2022 – Oct 2023',
    current: false,
    color: '#6366f1',
    bullets: [
      'Engineered TU V3 — enhanced LightGBM credit model integrating TransUnion bureau data, improving ROC-AUC by <strong>8%</strong>, enabling 2.3M+ bulk approvals.',
      'Drove 200–300 additional daily transaction users with <strong>3% lower delinquency</strong>, making TU V3 the largest contributor to approvals after baseline models.',
    ],
  },
  {
    title: 'Data Science Intern',
    company: 'Mercedes-Benz R&D India',
    type: 'Automotive',
    period: 'Jun 2021 – Jan 2022',
    current: false,
    color: '#06b6d4',
    bullets: [
      'Built a stacked Bi-LSTM for time-to-lane-change and safety distance prediction (<strong>F1: 96% / 88%</strong>) for automated lane-change assistance POC.',
      'Applied unsupervised multivariate time-series clustering for labeling — <strong>84% accuracy</strong>.',
    ],
  },
]

export const selmoreVersions = [
  { version: 'V1', precision: 14.6, label: 'Baseline LSTM' },
  { version: 'V2', precision: 37.0, label: '+ Feature Eng. + Event Cleanup' },
  { version: 'V3', precision: 44.0, label: '+ Time-Delta Features + Binning' },
  { version: 'V4', precision: 53.0, label: '+ Stacked LSTMs + Multi-Task' },
  { version: 'V5', precision: 55.0, label: '+ Attention + Transformers' },
]

export const supermoneyTrajectory = [
  { month: 'Launch', actual: 0 },
  { month: 'M+2',   actual: 15 },
  { month: 'M+4',   actual: 30 },
  { month: 'M+6',   actual: 45 },
  { month: 'M+8',   actual: 60 },
  { month: 'M+10',  projected: 150 },
  { month: 'Dec \'26', projected: 300 },
]

export const selmoreSavings = [
  { month: "Nov'23", gross: 0.8,  cost: 0.15, net: 0.65 },
  { month: "Mar'24", gross: 2.1,  cost: 0.4,  net: 1.7  },
  { month: "Jun'24", gross: 3.9,  cost: 0.7,  net: 3.2  },
  { month: "Sep'24", gross: 6.0,  cost: 1.1,  net: 4.9  },
  { month: "Dec'24", gross: 8.5,  cost: 1.5,  net: 7.0  },
  { month: "Mar'25", gross: 11.2, cost: 1.9,  net: 9.3  },
  { month: "Jun'25", gross: 13.5, cost: 2.3,  net: 11.2 },
  { month: "Aug'25", gross: 15.08, cost: 2.54, net: 12.54 },
]

export const skills = {
  'Machine Learning & DL': [
    { name: 'LSTMs / Stacked LSTMs',               pct: 98, color: '#6366f1' },
    { name: 'LightGBM / XGBoost / Ensemble',        pct: 97, color: '#8b5cf6' },
    { name: 'Transformers / Attention Mechanisms',  pct: 88, color: '#a78bfa' },
    { name: 'Graph Neural Networks (GraphSAGE)',     pct: 85, color: '#c4b5fd' },
    { name: 'Autoencoders / VAE',                   pct: 87, color: '#7c3aed' },
  ],
  'Languages & Frameworks': [
    { name: 'Python',              pct: 99, color: '#06b6d4' },
    { name: 'SQL / Spark SQL',     pct: 95, color: '#0891b2' },
    { name: 'TensorFlow / Keras',  pct: 96, color: '#0e7490' },
    { name: 'PyTorch',             pct: 82, color: '#155e75' },
    { name: 'C++',                 pct: 70, color: '#164e63' },
  ],
  'Data Engineering & MLOps': [
    { name: 'PySpark (Databricks)',          pct: 92, color: '#10b981' },
    { name: 'Dask / AWS Athena',             pct: 90, color: '#059669' },
    { name: 'TF Serving / Docker',           pct: 88, color: '#047857' },
    { name: 'Airflow / RabbitMQ',            pct: 80, color: '#065f46' },
    { name: 'MongoDB / DynamoDB / Redshift', pct: 85, color: '#064e3b' },
  ],
  'Visualisation & BI': [
    { name: 'Tableau / Metabase / Qlik',   pct: 88, color: '#f59e0b' },
    { name: 'Plotly / Recharts / Matplotlib', pct: 92, color: '#d97706' },
    { name: 'Excel / Dashboard Design',    pct: 85, color: '#b45309' },
  ],
}

export const education = [
  {
    school: 'Delhi Technological University (DTU)',
    degree: 'B.Tech · Mechanical Engineering (Automotive Specialization)',
    detail: '2018 – 2022',
    badge: 'Gold Medalist · CGPA 9.56',
    icon: '🏛️',
  },
  {
    school: 'DL DAV Model School, New Delhi',
    degree: 'Class XII',
    detail: '94.8%',
    badge: null,
    icon: '📚',
  },
  {
    school: 'DPS Siliguri',
    degree: 'Class X',
    detail: 'CGPA: 10/10',
    badge: null,
    icon: '📚',
  },
]

export const achievements = [
  {
    icon: '🥇',
    title: 'DTU Vice-Chancellor Gold Medalist (2018–2022)',
    desc: 'Departmental Rank 1 · CGPA 9.56/10 · Merit scholarships throughout',
  },
  {
    icon: '🚗',
    title: 'Self-Driving Cars Specialization — University of Toronto',
    desc: 'CARLA simulator · ES-EKF localization · YOLOv4 object detection · Hierarchical motion planner',
  },
  {
    icon: '🧠',
    title: 'ML & DL Specialization — DeepLearning.AI',
    desc: 'Sign language DNN · Neural style transfer · Shakespeare generation · Neural machine translation',
  },
  {
    icon: '🏆',
    title: 'Winner — Web Development Battle 2020 (Internshala)',
    desc: '99% score · Responsive full-stack budget management web application',
  },
  {
    icon: '2️⃣',
    title: '2nd Prize — Simpl Internal Hackathon (Ads Platform)',
    desc: 'Hybrid recommendation engine for user retention & acquisition',
  },
]

export const blogArticles = [
  {
    icon: '🚦',
    title: 'Unsnarling Bengaluru — Traffic as a Data Science Problem',
    desc: 'Bengaluru loses ~243 crore rupees daily to gridlock. This piece models the city\'s traffic as a dynamic graph — intersections as nodes, roads as edges weighted by real-time congestion. Applies reinforcement learning for adaptive signal control, spatiotemporal demand forecasting for peak-hour routing, and anomaly detection to flag accident cascades before they propagate.',
    tags: [['Graph ML', 'cyan'], ['RL / Signal Control', 'amber'], ['Urban Analytics', 'green']],
  },
  {
    icon: '🛢️',
    title: 'Strait of Hormuz — Risk Modelling & Economic Impact',
    desc: 'Quantitative risk analysis of the world\'s most critical oil chokepoint. Supply-disruption scenarios using shipping data, oil flow volumes, and macro-economic multipliers. Framed through uncertainty quantification, scenario trees, and sensitivity analysis.',
    tags: [['Risk Modelling', 'red'], ['Macro Economics', 'amber'], ['Scenario Analysis', 'cyan']],
  },
  {
    icon: '🏛️',
    title: 'Hampi 3D Reconstruction — Computer Vision Meets Heritage',
    desc: 'Applied Structure-from-Motion (SfM) and photogrammetric techniques to reconstruct the UNESCO World Heritage site at Hampi in 3D from 2D imagery. Point cloud generation, mesh reconstruction, and texture mapping for cultural preservation.',
    tags: [['Computer Vision', ''], ['3D Reconstruction', 'cyan'], ['SfM / Photogrammetry', 'green']],
  },
  {
    icon: '🧪',
    title: 'A/B Testing & Control Sets — The Practitioner\'s Playbook',
    desc: 'SUTVA violations, novelty effects, network interference, control set contamination, and the gap between statistical significance and practical significance. Draws from real reject-inferencing control set design experience at Simpl.',
    tags: [['A/B Testing', 'green'], ['Causal Inference', 'cyan'], ['Control Sets', 'amber']],
  },
  {
    icon: '🩺',
    title: 'Differential Diagnosis in Data Science',
    desc: 'A parallel between clinical differential diagnosis and debugging a model — ruling out data leakage, distribution shift, label noise, class imbalance, and calibration failures in a structured, elimination-based framework rather than trial-and-error.',
    tags: [['Model Debugging', 'red'], ['ML Best Practices', ''], ['Diagnosis Framework', 'cyan']],
  },
  {
    icon: '📊',
    title: 'From Stethoscopes to PR Curves',
    desc: 'The debut article — a clinical analogy for the precision-recall tradeoff. Explains why ROC-AUC misleads on imbalanced datasets, using a physician\'s diagnostic decision-making as the intuition pump.',
    tags: [['PR Curve', 'green'], ['Class Imbalance', 'amber'], ['Debut Article', 'violet']],
  },
]

export const navLinks = [
  { label: 'Experience',   href: '#experience' },
  { label: 'SuperMoney',   href: '#supermoney' },
  { label: 'SeLMoRe',      href: '#selmore' },
  { label: 'Underwriting', href: '#underwriting' },
  { label: 'AI Butler',    href: '#aibutler' },
  { label: 'Dukaan AI',   href: '#dukaanai' },
  { label: 'Writing',     href: '#blog' },
  { label: 'Skills',       href: '#skills' },
]
