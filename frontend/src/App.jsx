import { useEffect, useRef, useState } from "react";

import {
  LayoutDashboard,
  Play,
  BarChart3,
  Users,
  GitBranch,
  UserRoundCheck,
  FileText,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Search,
  Settings,
  ArrowRight,
  RotateCcw,
  Download,
  SlidersHorizontal,
  GraduationCap,
  BriefcaseBusiness,
  Code2,
  Clock3,
  TrendingUp,
  Database,
  Target,
  Sparkles,
  Camera,
  LogIn,
  Volume2,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://fairpath-gblx.onrender.com";
/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "simulation",
      label: "Simulation",
      icon: Play,
    },
    {
      id: "fairness",
      label: "Fairness Analysis",
      icon: BarChart3,
    },
    {
      id: "candidates",
      label: "Candidates",
      icon: Users,
    },
    {
      id: "pipeline",
      label: "Hiring Pipeline",
      icon: GitBranch,
    },
    {
      id: "returnship",
      label: "Return-to-Work",
      icon: UserRoundCheck,
    },
    {
      id: "interview",
      label: "Interview Verification",
      icon: Camera,
    },
    {
      id: "reports",
      label: "Reports",
      icon: FileText,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <ShieldCheck size={25} />
        </div>

        <div>
          <div className="brand-name">
            FairPath<span>AI</span>
          </div>

          <div className="brand-subtitle">
            Hiring Fairness Platform
          </div>
        </div>
      </div>

      <div className="sidebar-section-title">
        WORKSPACE
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={`sidebar-item ${
                activePage === item.id ? "active" : ""
              }`}
              onClick={() => setActivePage(item.id)}
            >
              <Icon size={18} />

              <span>{item.label}</span>

              {activePage === item.id && (
                <ChevronRight
                  size={16}
                  className="sidebar-arrow"
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-status">
          <div className="status-dot"></div>

          <div>
            <div className="status-title">
              System Online
            </div>

            <div className="status-subtitle">
              FairPath engine active
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* =========================================================
   TOP BAR
========================================================= */

function TopBar({ title, subtitle }) {
  return (
    <header className="topbar">
      <div>
        <h2>{title}</h2>

        <p>{subtitle}</p>
      </div>

      <div className="topbar-actions">
        <div className="topbar-status">
          <span className="status-dot"></span>
          Live
        </div>

        <button className="icon-button">
          <Search size={18} />
        </button>

        <button className="icon-button">
          <Settings size={18} />
        </button>

        <div className="profile-avatar">
          A
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({
  setActivePage,
  results,
  lastConfig,
}) {
  return (
    <>
      <TopBar
        title="Fairness Dashboard"
        subtitle="Monitor hiring fairness, progression, and candidate outcomes."
      />

      <main className="page-content">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              FAIRNESS MONITORING
            </span>

            <h1>
              Hiring fairness at a glance
            </h1>

            <p>
              Review simulated hiring outcomes and identify
              where representation changes across the pipeline.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() =>
              setActivePage("simulation")
            }
          >
            <Play size={17} />
            New Simulation
          </button>
        </div>

        <div className="stats-grid">
          <StatCard
            icon={Users}
            title="Candidates"
            value={
              results?.configuration?.candidate_count ||
              lastConfig?.candidate_count ||
              "1,000"
            }
            subtitle="Simulated candidates"
          />

          <StatCard
            icon={Target}
            title="Selection Rate"
            value="18.4%"
            subtitle="Overall selection"
          />

          <StatCard
            icon={BarChart3}
            title="Fairness Index"
            value="0.82"
            subtitle="Group comparison"
          />

          <StatCard
            icon={Activity}
            title="Pipeline Stages"
            value="4"
            subtitle="Tracked stages"
          />
        </div>

        <div className="dashboard-grid">
          <div className="panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">
                  PIPELINE
                </span>

                <h3>
                  Candidate progression
                </h3>
              </div>

              <button
                className="text-button"
                onClick={() =>
                  setActivePage("pipeline")
                }
              >
                View pipeline
                <ArrowRight size={15} />
              </button>
            </div>

            <PipelineMini />
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">
                  FAIRNESS
                </span>

                <h3>
                  Current signals
                </h3>
              </div>
            </div>

            <div className="signal-list">
              <div className="signal-item">
                <div className="signal-icon positive">
                  <CheckCircle2 size={18} />
                </div>

                <div>
                  <strong>
                    Technical stage
                  </strong>

                  <p>
                    Representation remains relatively
                    stable.
                  </p>
                </div>
              </div>

              <div className="signal-item">
                <div className="signal-icon warning">
                  <AlertTriangle size={18} />
                </div>

                <div>
                  <strong>
                    Interview stage
                  </strong>

                  <p>
                    Group progression requires review.
                  </p>
                </div>
              </div>

              <div className="signal-item">
                <div className="signal-icon positive">
                  <TrendingUp size={18} />
                </div>

                <div>
                  <strong>
                    Overall pipeline
                  </strong>

                  <p>
                    Monitor changes between stages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">
                PLATFORM
              </span>

              <h3>
                FairPath workflow
              </h3>
            </div>
          </div>

          <div className="workflow-grid">
            <WorkflowStep
              number="01"
              icon={Database}
              title="Generate"
              text="Create synthetic candidate profiles."
            />

            <WorkflowStep
              number="02"
              icon={Code2}
              title="Evaluate"
              text="Simulate technical and interview stages."
            />

            <WorkflowStep
              number="03"
              icon={BarChart3}
              title="Compare"
              text="Measure progression across groups."
            />

            <WorkflowStep
              number="04"
              icon={Sparkles}
              title="Improve"
              text="Test alternative hiring configurations."
            />
          </div>
        </div>
      </main>
    </>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon: Icon,
  title,
  value,
  subtitle,
}) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        <Icon size={20} />
      </div>

      <div>
        <div className="stat-title">
          {title}
        </div>

        <div className="stat-value">
          {value}
        </div>

        <div className="stat-subtitle">
          {subtitle}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PIPELINE MINI
========================================================= */

function PipelineMini() {
  const stages = [
    {
      name: "Applications",
      value: 1000,
      percent: 100,
    },
    {
      name: "Technical",
      value: 620,
      percent: 62,
    },
    {
      name: "Interview",
      value: 310,
      percent: 31,
    },
    {
      name: "Selected",
      value: 184,
      percent: 18.4,
    },
  ];

  return (
    <div className="pipeline-mini">
      {stages.map((stage) => (
        <div
          className="pipeline-row"
          key={stage.name}
        >
          <div className="pipeline-label">
            <span>{stage.name}</span>

            <strong>
              {stage.value}
            </strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${stage.percent}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   SIMULATION
========================================================= */

function Simulation({
  setActivePage,
  setResults,
  setLastConfig,
}) {
  const [jobRole, setJobRole] =
    useState("Software Engineer");

  const [candidateCount, setCandidateCount] =
    useState(1000);

  const [technicalWeight, setTechnicalWeight] =
    useState(50);

  const [collegeWeight, setCollegeWeight] =
    useState(25);

  const [experienceWeight, setExperienceWeight] =
    useState(25);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const totalWeight =
    Number(technicalWeight) +
    Number(collegeWeight) +
    Number(experienceWeight);

  const runSimulation = async () => {
    setError("");

    if (totalWeight !== 100) {
      setError(
        "Weights must total exactly 100%."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/simulate`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            job_role: jobRole,
            candidate_count:
              Number(candidateCount),
            technical_weight:
              Number(technicalWeight),
            college_weight:
              Number(collegeWeight),
            experience_weight:
              Number(experienceWeight),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Simulation failed."
        );
      }

      setResults(data);

      setLastConfig(
        data.configuration
      );

      setActivePage("fairness");
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Unable to connect to the FairPath backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopBar
        title="Hiring Simulation"
        subtitle="Configure a hiring scenario and evaluate progression."
      />

      <main className="page-content">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              WHAT-IF ANALYSIS
            </span>

            <h1>
              Configure your simulation
            </h1>

            <p>
              Adjust the evaluation weights and candidate
              population to explore different outcomes.
            </p>
          </div>
        </div>

        <div className="simulation-grid">
          <div className="panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">
                  CONFIGURATION
                </span>

                <h3>
                  Hiring scenario
                </h3>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-field full">
                <label>
                  Job Role
                </label>

                <input
                  value={jobRole}
                  onChange={(e) =>
                    setJobRole(
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="form-field full">
                <label>
                  Candidate Count
                </label>

                <input
                  type="number"
                  min="10"
                  max="10000"
                  value={candidateCount}
                  onChange={(e) =>
                    setCandidateCount(
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="form-field">
                <label>
                  Technical Weight
                </label>

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={technicalWeight}
                  onChange={(e) =>
                    setTechnicalWeight(
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="form-field">
                <label>
                  College Weight
                </label>

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={collegeWeight}
                  onChange={(e) =>
                    setCollegeWeight(
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="form-field">
                <label>
                  Experience Weight
                </label>

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={experienceWeight}
                  onChange={(e) =>
                    setExperienceWeight(
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div
              className={`weight-total ${
                totalWeight === 100
                  ? "valid"
                  : "invalid"
              }`}
            >
              <span>
                Total Weight
              </span>

              <strong>
                {totalWeight}%
              </strong>
            </div>

            {error && (
              <div className="error-box">
                <AlertTriangle size={18} />
                <span>{error}</span>
              </div>
            )}

            <button
              className="primary-btn"
              onClick={runSimulation}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Activity
                    size={17}
                    className="spin"
                  />
                  Running Simulation...
                </>
              ) : (
                <>
                  <Play size={17} />
                  Run Simulation
                </>
              )}
            </button>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">
                  SIMULATION LOGIC
                </span>

                <h3>
                  Evaluation model
                </h3>
              </div>
            </div>

            <div className="info-list">
              <InfoItem
                icon={Code2}
                title="Technical Score"
                text="Represents technical assessment performance."
              />

              <InfoItem
                icon={GraduationCap}
                title="College Factor"
                text="Represents the configured education weighting."
              />

              <InfoItem
                icon={BriefcaseBusiness}
                title="Experience"
                text="Represents prior experience in the simulation."
              />

              <InfoItem
                icon={SlidersHorizontal}
                title="What-if Testing"
                text="Change the weights to compare alternative scenarios."
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="info-item">
      <div className="info-icon">
        <Icon size={18} />
      </div>

      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}

/* =========================================================
   FAIRNESS ANALYSIS
========================================================= */

function FairnessAnalysis({
  results,
  setActivePage,
}) {
  const configuration =
    results?.configuration;

  const resultData =
    results?.results;

  return (
    <>
      <TopBar
        title="Fairness Analysis"
        subtitle="Compare progression and identify potential fairness signals."
      />

      <main className="page-content">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              ANALYSIS
            </span>

            <h1>
              Fairness signals
            </h1>

            <p>
              Review group-level outcomes from the latest
              simulation.
            </p>
          </div>

          <button
            className="secondary-btn"
            onClick={() =>
              setActivePage("simulation")
            }
          >
            <RotateCcw size={17} />
            New Simulation
          </button>
        </div>

        {configuration && (
          <div className="configuration-strip">
            <div>
              <span>ROLE</span>
              <strong>
                {results.job_role}
              </strong>
            </div>

            <div>
              <span>CANDIDATES</span>
              <strong>
                {configuration.candidate_count}
              </strong>
            </div>

            <div>
              <span>TECHNICAL</span>
              <strong>
                {configuration.technical_weight}%
              </strong>
            </div>

            <div>
              <span>COLLEGE</span>
              <strong>
                {configuration.college_weight}%
              </strong>
            </div>

            <div>
              <span>EXPERIENCE</span>
              <strong>
                {configuration.experience_weight}%
              </strong>
            </div>
          </div>
        )}

        <div className="analysis-grid">
          <div className="panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">
                  FAIRNESS INDEX
                </span>

                <h3>
                  Group comparison
                </h3>
              </div>
            </div>

            <div className="big-score">
              0.82
            </div>

            <div className="score-description">
              The simulation currently shows a measurable
              difference in progression between groups.
            </div>

            <div className="score-meter">
              <div
                className="score-meter-fill"
                style={{
                  width: "82%",
                }}
              />
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">
                  BOTTLENECK
                </span>

                <h3>
                  Stage requiring attention
                </h3>
              </div>
            </div>

            <div className="bottleneck">
              <div className="bottleneck-icon">
                <AlertTriangle size={25} />
              </div>

              <div>
                <strong>
                  Interview stage
                </strong>

                <p>
                  Compare group progression at this stage
                  before drawing conclusions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">
                RESULTS
              </span>

              <h3>
                Simulation output
              </h3>
            </div>
          </div>

          {resultData ? (
            <pre className="result-json">
              {JSON.stringify(
                resultData,
                null,
                2
              )}
            </pre>
          ) : (
            <div className="empty-state">
              <BarChart3 size={30} />

              <h3>
                No simulation results yet
              </h3>

              <p>
                Run a simulation to populate fairness
                analysis.
              </p>

              <button
                className="primary-btn"
                onClick={() =>
                  setActivePage("simulation")
                }
              >
                <Play size={17} />
                Start Simulation
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

/* =========================================================
   CANDIDATES
========================================================= */

function Candidates() {
  const candidates = [
    {
      id: "FP-001",
      name: "Candidate A",
      college: "Tier 1",
      location: "Metro",
      experience: "3 years",
      technical: 88,
      status: "Selected",
    },
    {
      id: "FP-002",
      name: "Candidate B",
      college: "Tier 2",
      location: "Tier 2 City",
      experience: "2 years",
      technical: 82,
      status: "Interview",
    },
    {
      id: "FP-003",
      name: "Candidate C",
      college: "Tier 3",
      location: "Rural",
      experience: "4 years",
      technical: 79,
      status: "Technical",
    },
    {
      id: "FP-004",
      name: "Candidate D",
      college: "Tier 1",
      location: "Metro",
      experience: "1 year",
      technical: 76,
      status: "Rejected",
    },
  ];

  return (
    <>
      <TopBar
        title="Candidates"
        subtitle="Review the synthetic candidate population used in FairPath simulations."
      />

      <main className="page-content">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              CANDIDATE DATA
            </span>

            <h1>
              Candidate population
            </h1>

            <p>
              Synthetic records used for fairness analysis
              and pipeline simulation.
            </p>
          </div>
        </div>

        <div className="panel table-panel">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Candidate</th>
                  <th>College</th>
                  <th>Location</th>
                  <th>Experience</th>
                  <th>Technical</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {candidates.map(
                  (candidate) => (
                    <tr key={candidate.id}>
                      <td>
                        {candidate.id}
                      </td>

                      <td>
                        <strong>
                          {candidate.name}
                        </strong>
                      </td>

                      <td>
                        {candidate.college}
                      </td>

                      <td>
                        {candidate.location}
                      </td>

                      <td>
                        {candidate.experience}
                      </td>

                      <td>
                        {candidate.technical}
                      </td>

                      <td>
                        <span
                          className={`status-badge ${
                            candidate.status
                              .toLowerCase()
                              .replace(
                                " ",
                                "-"
                              )
                          }`}
                        >
                          {candidate.status}
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

/* =========================================================
   HIRING PIPELINE
========================================================= */

function Pipeline() {
  return (
    <>
      <TopBar
        title="Hiring Pipeline"
        subtitle="Track candidate progression from application to selection."
      />

      <main className="page-content">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              PIPELINE MONITOR
            </span>

            <h1>
              Hiring journey
            </h1>

            <p>
              Understand where candidate progression changes
              between hiring stages.
            </p>
          </div>
        </div>

        <div className="pipeline-large">
          <MonitorItem
            number="01"
            icon={Users}
            title="Applications"
            value="1,000"
            percentage="100%"
            description="Initial candidate population."
          />

          <MonitorItem
            number="02"
            icon={Code2}
            title="Technical Assessment"
            value="620"
            percentage="62%"
            description="Candidates progressing after technical evaluation."
          />

          <MonitorItem
            number="03"
            icon={Clock3}
            title="Interview"
            value="310"
            percentage="31%"
            description="Candidates entering the interview stage."
          />

          <MonitorItem
            number="04"
            icon={CheckCircle2}
            title="Selected"
            value="184"
            percentage="18.4%"
            description="Candidates reaching the simulated selection stage."
          />
        </div>
      </main>
    </>
  );
}

/* =========================================================
   MONITOR ITEM
========================================================= */

function MonitorItem({
  number,
  icon: Icon,
  title,
  value,
  percentage,
  description,
}) {
  return (
    <div className="monitor-item">
      <div className="monitor-number">
        {number}
      </div>

      <div className="monitor-icon">
        <Icon size={22} />
      </div>

      <div className="monitor-content">
        <div className="monitor-top">
          <div>
            <span className="eyebrow">
              STAGE {number}
            </span>

            <h3>{title}</h3>
          </div>

          <div className="monitor-value">
            {value}
          </div>
        </div>

        <p>{description}</p>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: percentage,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   RETURN TO WORK
========================================================= */

function ReturnshipFairness() {
  const data = [
    {
      title: "Career Break",
      value: "2.4 years",
      icon: Clock3,
    },
    {
      title: "Returnship Pool",
      value: "184",
      icon: Users,
    },
    {
      title: "Interview Progression",
      value: "32%",
      icon: TrendingUp,
    },
  ];

  return (
    <>
      <TopBar
        title="Return-to-Work Fairness"
        subtitle="Explore fairness signals for candidates returning after career breaks."
      />

      <main className="page-content">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              RETURNSHIP ANALYSIS
            </span>

            <h1>
              Career break fairness
            </h1>

            <p>
              Monitor how career-break candidates progress
              through simulated hiring stages.
            </p>
          </div>
        </div>

        <div className="stats-grid">
          {data.map((item) => (
            <MiniStat
              key={item.title}
              icon={item.icon}
              title={item.title}
              value={item.value}
            />
          ))}
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">
                GUIDANCE
              </span>

              <h3>
                What FairPath monitors
              </h3>
            </div>
          </div>

          <div className="result-grid">
            <ResultBar
              label="Technical evaluation"
              value={76}
            />

            <ResultBar
              label="Interview progression"
              value={64}
            />

            <ResultBar
              label="Final selection"
              value={52}
            />
          </div>
        </div>
      </main>
    </>
  );
}

/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        <Icon size={20} />
      </div>

      <div>
        <div className="stat-title">
          {title}
        </div>

        <div className="stat-value">
          {value}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   RESULT BAR
========================================================= */

function ResultBar({
  label,
  value,
}) {
  return (
    <div className="result-bar">
      <div className="result-bar-header">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   REPORTS
========================================================= */

function Reports({
  results,
  lastConfig,
}) {
  const configuration =
    results?.configuration || lastConfig;

  const resultData =
    results?.results || null;

  const candidateCount =
    configuration?.candidate_count || 1000;

  const jobRole =
    results?.job_role ||
    "Software Engineer";

  /*
    Export the report as a text file.
  */

  const exportReport = () => {
    const report = `
FAIRPATH AI
HIRING FAIRNESS & TRANSPARENCY REPORT
========================================

JOB ROLE
${jobRole}

SIMULATION CONFIGURATION
----------------------------------------
Candidate Count : ${candidateCount}
Technical Weight : ${
      configuration?.technical_weight ?? 50
    }%
College Weight   : ${
      configuration?.college_weight ?? 25
    }%
Experience Weight: ${
      configuration?.experience_weight ?? 25
    }%

FAIRNESS SUMMARY
----------------------------------------
Fairness Index   : 0.82
Selection Rate   : 18.4%
Pipeline Stages  : 4
Bottleneck Stage : Interview

PIPELINE
----------------------------------------
Applications : 1,000
Technical    : 620
Interview    : 310
Selected     : 184

SIMULATION OUTPUT
----------------------------------------
${
  resultData
    ? JSON.stringify(resultData, null, 2)
    : "No backend simulation has been executed yet."
}

IMPORTANT
----------------------------------------
This FairPath report contains simulated hiring
outcomes for analysis and transparency.

The system is not intended to make automated
employment decisions.

Generated by FairPath AI.
`;

    const blob = new Blob(
      [report],
      {
        type: "text/plain;charset=utf-8",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `FairPath_Report_${new Date()
        .toISOString()
        .slice(0, 10)}.txt`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <TopBar
        title="Reports"
        subtitle="Review and export fairness simulation results."
      />

      <main className="page-content">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              REPORTING
            </span>

            <h1>
              Fairness reports
            </h1>

            <p>
              Review key signals from your latest hiring
              simulation and export the report.
            </p>
          </div>

          <button
            className="secondary-btn"
            onClick={exportReport}
          >
            <Download size={17} />
            Export Report
          </button>
        </div>

        {/* =================================================
            REPORT STATUS
        ================================================= */}

        <div className="configuration-strip">
          <div>
            <span>STATUS</span>

            <strong>
              {results
                ? "Simulation Complete"
                : "Prototype Report"}
            </strong>
          </div>

          <div>
            <span>ROLE</span>

            <strong>
              {jobRole}
            </strong>
          </div>

          <div>
            <span>CANDIDATES</span>

            <strong>
              {candidateCount}
            </strong>
          </div>

          <div>
            <span>STAGES</span>

            <strong>
              4
            </strong>
          </div>
        </div>

        {/* =================================================
            REPORT METRICS
        ================================================= */}

        <div className="report-grid">
          <ReportMetric
            title="Candidates"
            value={candidateCount}
            description="Synthetic candidate records"
          />

          <ReportMetric
            title="Selection Rate"
            value="18.4%"
            description="Overall simulated selection"
          />

          <ReportMetric
            title="Fairness Index"
            value="0.82"
            description="Group-level comparison"
          />

          <ReportMetric
            title="Bottleneck"
            value="Interview"
            description="Stage requiring review"
          />
        </div>

        {/* =================================================
            PIPELINE SUMMARY
        ================================================= */}

        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">
                PIPELINE SUMMARY
              </span>

              <h3>
                Candidate progression
              </h3>
            </div>
          </div>

          <div className="result-grid">
            <ResultBar
              label="Applications"
              value={100}
            />

            <ResultBar
              label="Technical Assessment"
              value={62}
            />

            <ResultBar
              label="Interview"
              value={31}
            />

            <ResultBar
              label="Selected"
              value={18.4}
            />
          </div>
        </div>

        {/* =================================================
            FAIRNESS SUMMARY
        ================================================= */}

        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">
                FAIRNESS SUMMARY
              </span>

              <h3>
                Key findings
              </h3>
            </div>
          </div>

          <div className="report-summary">
            <div className="summary-icon">
              <BarChart3 size={25} />
            </div>

            <div>
              <h3>
                Fairness index: 0.82
              </h3>

              <p>
                The current prototype simulation shows
                measurable differences in progression between
                groups. The interview stage is highlighted
                for additional review.
              </p>

              <div className="report-alert">
                <AlertTriangle size={18} />

                <span>
                  This signal is an analytical indicator,
                  not a determination of discrimination or
                  an automated hiring decision.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            SIMULATION CONFIGURATION
        ================================================= */}

        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">
                CONFIGURATION
              </span>

              <h3>
                Simulation parameters
              </h3>
            </div>
          </div>

          <div className="configuration-details">
            <div className="configuration-item">
              <span>
                Job Role
              </span>

              <strong>
                {jobRole}
              </strong>
            </div>

            <div className="configuration-item">
              <span>
                Candidate Count
              </span>

              <strong>
                {candidateCount}
              </strong>
            </div>

            <div className="configuration-item">
              <span>
                Technical Weight
              </span>

              <strong>
                {configuration?.technical_weight ?? 50}%
              </strong>
            </div>

            <div className="configuration-item">
              <span>
                College Weight
              </span>

              <strong>
                {configuration?.college_weight ?? 25}%
              </strong>
            </div>

            <div className="configuration-item">
              <span>
                Experience Weight
              </span>

              <strong>
                {configuration?.experience_weight ?? 25}%
              </strong>
            </div>
          </div>
        </div>

        {/* =================================================
            BACKEND RESULT
        ================================================= */}

        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">
                BACKEND OUTPUT
              </span>

              <h3>
                Simulation result data
              </h3>
            </div>
          </div>

          {resultData ? (
            <pre className="result-json">
              {JSON.stringify(
                resultData,
                null,
                2
              )}
            </pre>
          ) : (
            <div className="empty-state">
              <Database size={30} />

              <h3>
                No backend result yet
              </h3>

              <p>
                Run a simulation to replace the prototype
                report values with actual backend output.
              </p>
            </div>
          )}
        </div>

        {/* =================================================
            REPORT FOOTER
        ================================================= */}

        <div className="panel">
          <div className="report-summary">
            <div className="summary-icon">
              <ShieldCheck size={25} />
            </div>

            <div>
              <h3>
                FairPath transparency note
              </h3>

              <p>
                FairPath is designed to help teams inspect
                hiring progression and fairness signals.
                Results should be reviewed by qualified
                human decision-makers and should not be used
                as the sole basis for employment decisions.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

/* =========================================================
   REPORT METRIC
========================================================= */

function ReportMetric({
  title,
  value,
  description,
}) {
  return (
    <div className="report-metric">
      <span>{title}</span>

      <strong>{value}</strong>

      <p>{description}</p>
    </div>
  );
}

/* =========================================================
   WORKFLOW STEP
========================================================= */

function WorkflowStep({
  number,
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="workflow-step">
      <div className="workflow-number">
        {number}
      </div>

      <div className="workflow-icon">
        <Icon size={21} />
      </div>

      <h4>{title}</h4>

      <p>{text}</p>
    </div>
  );
}

/* =========================================================
   INTERVIEW VERIFICATION
========================================================= */

function InterviewVerification({
  onVerified,
}) {
  const videoRef = useRef(null);

  const streamRef = useRef(null);

  const verificationTimerRef =
    useRef(null);

  const [cameraOn, setCameraOn] =
    useState(false);

  const [checking, setChecking] =
    useState(false);

  const [verified, setVerified] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =======================================================
     FIXED CAMERA STREAM CONNECTION

     The important fix:

     We first turn cameraOn = true so the <video>
     element is rendered.

     Then this effect attaches the stream to
     the actual video element.
  ======================================================= */

  useEffect(() => {
    if (
      !cameraOn ||
      !videoRef.current ||
      !streamRef.current
    ) {
      return;
    }

    const video =
      videoRef.current;

    const stream =
      streamRef.current;

    video.srcObject = stream;

    video.muted = true;
    video.playsInline = true;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (err) {
        console.error(
          "Video playback error:",
          err
        );
      }
    };

    if (video.readyState >= 1) {
      playVideo();
    } else {
      video.onloadedmetadata =
        playVideo;
    }

    return () => {
      video.onloadedmetadata = null;
    };
  }, [cameraOn]);

  /* =======================================================
     START CAMERA
  ======================================================= */

  const startCamera = async () => {
    setError("");

    setVerified(false);

    setChecking(false);

    try {
      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        setError(
          "Camera access is not supported by this browser."
        );

        return;
      }

      /*
        If an old stream exists,
        stop it before starting another.
      */

      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) =>
            track.stop()
          );

        streamRef.current = null;
      }

      const stream =
        await navigator.mediaDevices.getUserMedia(
          {
            video: {
              width: {
                ideal: 1280,
              },

              height: {
                ideal: 720,
              },

              facingMode: "user",
            },

            audio: false,
          }
        );

      streamRef.current = stream;

      /*
        IMPORTANT:

        We set cameraOn AFTER getting the stream.

        This causes the <video> element to render.

        The useEffect above then attaches the stream
        to the newly rendered video element.
      */

      setCameraOn(true);

      setChecking(true);

      /*
        Prototype presence verification.

        This does NOT identify the person.
        This does NOT perform face matching.
      */

      verificationTimerRef.current =
        setTimeout(() => {
          setChecking(false);

          setVerified(true);

          /* =================================================
             VOICE CONFIRMATION
          ================================================= */

          if (
            "speechSynthesis" in window
          ) {
            const message =
              new SpeechSynthesisUtterance(
                "Verification completed successfully. You can proceed with the interview."
              );

            message.rate = 0.95;

            message.pitch = 1;

            message.volume = 1;

            window.speechSynthesis.cancel();

            window.speechSynthesis.speak(
              message
            );
          }

          if (onVerified) {
            onVerified();
          }
        }, 2000);
    } catch (err) {
      console.error(
        "Camera error:",
        err
      );

      setCameraOn(false);

      setChecking(false);

      if (
        err.name ===
        "NotAllowedError"
      ) {
        setError(
          "Camera permission was denied. Please allow camera access and try again."
        );
      } else if (
        err.name ===
        "NotFoundError"
      ) {
        setError(
          "No camera was detected on this device."
        );
      } else if (
        err.name ===
        "NotReadableError"
      ) {
        setError(
          "Your camera is already being used by another application."
        );
      } else {
        setError(
          "Unable to access the camera. Please check your camera permissions."
        );
      }
    }
  };

  /* =======================================================
     STOP CAMERA
  ======================================================= */

  const stopCamera = () => {
    if (
      verificationTimerRef.current
    ) {
      clearTimeout(
        verificationTimerRef.current
      );

      verificationTimerRef.current =
        null;
    }

    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) =>
          track.stop()
        );

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.pause();

      videoRef.current.srcObject =
        null;
    }

    if (
      "speechSynthesis" in window
    ) {
      window.speechSynthesis.cancel();
    }

    setCameraOn(false);

    setChecking(false);

    setVerified(false);
  };

  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      if (
        verificationTimerRef.current
      ) {
        clearTimeout(
          verificationTimerRef.current
        );
      }

      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) =>
            track.stop()
          );
      }

      if (
        "speechSynthesis" in window
      ) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="interview-card">
      <div className="interview-header">
        <div>
          <div className="interview-icon">
            <Camera size={24} />
          </div>

          <div>
            <span className="eyebrow">
              SECURE SESSION
            </span>

            <h3>
              Webcam Verification
            </h3>
          </div>
        </div>

        <div
          className={`verification-status ${
            verified
              ? "verified"
              : cameraOn
              ? "active"
              : ""
          }`}
        >
          {verified ? (
            <>
              <CheckCircle2 size={16} />
              Verified
            </>
          ) : cameraOn ? (
            <>
              <Activity size={16} />
              Camera Active
            </>
          ) : (
            <>
              <ShieldCheck size={16} />
              Not Verified
            </>
          )}
        </div>
      </div>

      <div className="camera-container">
        {cameraOn ? (
          <>
            <video
              ref={videoRef}
              className="camera-video"
              autoPlay
              playsInline
              muted
            />

            {/* Camera guide */}

            <div className="face-guide">
              <div className="face-guide-corner top-left"></div>
              <div className="face-guide-corner top-right"></div>
              <div className="face-guide-corner bottom-left"></div>
              <div className="face-guide-corner bottom-right"></div>
            </div>

            <div className="camera-label">
              <Camera size={15} />
              LIVE CAMERA
            </div>
          </>
        ) : (
          <div className="camera-placeholder">
            <div className="camera-placeholder-icon">
              <Camera size={42} />
            </div>

            <h3>
              Camera ready
            </h3>

            <p>
              Enable your webcam to begin interview
              session verification.
            </p>
          </div>
        )}

        {checking && (
          <div className="camera-overlay">
            <div className="verification-loader">
              <div className="loader-ring"></div>
            </div>

            <strong>
              Verifying interview presence...
            </strong>

            <span>
              Please remain visible to the camera.
            </span>
          </div>
        )}

        {verified && (
          <div className="camera-success">
            <div className="success-check">
              <CheckCircle2 size={28} />
            </div>

            <div>
              <strong>
                Verification completed
              </strong>

              <span>
                You can proceed with the interview.
              </span>
            </div>

            <Volume2 size={19} />
          </div>
        )}
      </div>

      {error && (
        <div className="error-box">
          <AlertTriangle size={18} />

          <span>{error}</span>
        </div>
      )}

      <div className="interview-actions">
        {!cameraOn ? (
          <button
            className="primary-btn"
            onClick={startCamera}
          >
            <Camera size={18} />
            Enable Camera
          </button>
        ) : (
          <button
            className="secondary-btn"
            onClick={stopCamera}
          >
            <RotateCcw size={18} />
            Stop Verification
          </button>
        )}
      </div>

      <div className="privacy-note">
        <ShieldCheck size={17} />

        <span>
          FairPath uses this prototype camera check only
          for interview-session presence. It does not
          identify the candidate or perform facial matching.
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   INTERVIEW PAGE
========================================================= */

function InterviewPage() {
  const handleVerified = () => {
    console.log(
      "Interview verification completed"
    );
  };

  return (
    <>
      <TopBar
        title="Interview Verification"
        subtitle="Secure interview-session presence verification."
      />

      <main className="page-content">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              INTERVIEW SESSION
            </span>

            <h1>
              Verify interview presence
            </h1>

            <p>
              Enable your webcam to verify that the interview
              session is active before proceeding.
            </p>
          </div>
        </div>

        <InterviewVerification
          onVerified={handleVerified}
        />
      </main>
    </>
  );
}

/* =========================================================
   LOGIN PAGE
========================================================= */

function LoginPage({ onLogin }) {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError(
        "Please enter your email and password."
      );

      return;
    }

    /*
      Prototype login.

      Any non-empty email and password
      will allow access.

      For production, connect this page
      to a real authentication system.
    */

    onLogin();
  };

  return (
    <div className="login-page">
      <div className="login-background"></div>

      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">
            <ShieldCheck size={30} />
          </div>

          <div>
            <div className="login-brand">
              FairPath<span>AI</span>
            </div>

            <div className="login-subtitle">
              Hiring Fairness Platform
            </div>
          </div>
        </div>

        <div className="login-heading">
          <span className="eyebrow">
            SECURE WORKSPACE
          </span>

          <h1>
            Welcome back
          </h1>

          <p>
            Sign in to access your FairPath fairness
            monitoring workspace.
          </p>
        </div>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >
          <div className="login-field">
            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />
          </div>

          <div className="login-field">
            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />
          </div>

          {error && (
            <div className="login-error">
              <AlertTriangle size={17} />

              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="primary-btn login-btn"
          >
            <LogIn size={18} />
            Sign In
          </button>
        </form>

        <div className="login-security">
          <ShieldCheck size={17} />

          <span>
            Secure FairPath workspace
          </span>
        </div>

        <div className="login-footer">
          FairPath AI • Hiring Fairness &
          Transparency
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN APP
========================================================= */

function App() {
  const [activePage, setActivePage] =
    useState("dashboard");

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [results, setResults] =
    useState(null);

  const [lastConfig, setLastConfig] =
    useState(null);

  /*
    LOGIN GATE
  */

  if (!isLoggedIn) {
    return (
      <LoginPage
        onLogin={() =>
          setIsLoggedIn(true)
        }
      />
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case "simulation":
        return (
          <Simulation
            setActivePage={
              setActivePage
            }
            setResults={setResults}
            setLastConfig={
              setLastConfig
            }
          />
        );

      case "fairness":
        return (
          <FairnessAnalysis
            results={results}
            setActivePage={
              setActivePage
            }
          />
        );

      case "candidates":
        return <Candidates />;

      case "pipeline":
        return <Pipeline />;

      case "returnship":
        return <ReturnshipFairness />;

      case "interview":
        return <InterviewPage />;

      case "reports":
        return (
          <Reports
            results={results}
            lastConfig={lastConfig}
          />
        );

      case "dashboard":
      default:
        return (
          <Dashboard
            setActivePage={
              setActivePage
            }
            results={results}
            lastConfig={
              lastConfig
            }
          />
        );
    }
  };

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        setActivePage={
          setActivePage
        }
      />

      <div className="main-area">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;