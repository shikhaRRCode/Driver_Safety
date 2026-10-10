import React, { useState } from 'react';

function Icon({ name, size = 24, strokeWidth = 2.2, ...props }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    ...props,
  };
  const paths = {
    vehicle: <><rect x="3" y="9" width="18" height="9" rx="2"/><path d="m5 9 2-4h10l2 4M6 18v2m12-2v2M6.5 13h.01M17.5 13h.01"/><path d="M3 12H1m22 0h-2"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    alert: <><path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/></>,
    list: <><path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></>,
    home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v12h14V9M9 21v-7h6v7"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    back: <path d="m15 18-6-6 6-6"/>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/><path d="M8 14h3m-3 3h5"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    close: <path d="m18 6-12 12M6 6l12 12"/>,
  };
  return <svg {...common}>{paths[name] || paths.alert}</svg>;
}

function StatusBar() {
  return (
    <div className="status-bar" aria-hidden="true">
      <span className="status-time">9:41</span>
      <span className="status-symbol status-chat">●</span>
      <span className="status-symbol">◉</span>
      <span className="status-symbol">✿</span>
      <div className="status-spacer" />
      <span className="status-connect">▴ ▾</span>
      <span className="status-5g">5G</span>
      <span className="signal-bars"><i /><i /><i /></span>
      <span className="battery"><i /></span>
    </div>
  );
}

function HomeScreen({ onStartReport, onNotice }) {
  return (
    <div className="screen-body home-body">
      <header className="brand-header">
        <span className="brand-symbol"><Icon name="vehicle" size={32} strokeWidth={2.4} /></span>
        <div className="brand-copy">Driver Incident<br />&amp; Safety Assistant</div>
        <button className="avatar-button" type="button" aria-label="Profile (preview only)" onClick={onNotice}><Icon name="user" size={22} /></button>
      </header>

      <main className="home-content">
        <button className="hero-action" type="button" onClick={onStartReport}>
          <span className="hero-icon"><Icon name="alert" size={43} strokeWidth={2.6} /></span>
          <span className="action-copy">
            <strong>Report Incident</strong>
            <span>Accident, Breakdown,<br />Cargo Damage, Hazard</span>
          </span>
        </button>

        <button className="home-action-card" type="button" onClick={onNotice}>
          <span className="home-action-icon"><Icon name="list" size={31} strokeWidth={2.7} /></span>
          <span className="home-action-copy"><strong>My Incidents</strong><span>View your reported incidents</span></span>
        </button>

        <button className="home-action-card" type="button" onClick={onNotice}>
          <span className="home-action-icon shield-icon"><Icon name="shield" size={30} strokeWidth={2.3} /></span>
          <span className="home-action-copy"><strong>Safety Guidelines</strong><span>Important information</span></span>
        </button>
      </main>

      <BottomNav onNotice={onNotice} />
    </div>
  );
}

const initialForm = {
  driver: 'Rahul Sharma',
  vehicle: 'VH001 - Tata Truck',
  route: 'Bhopal - Indore',
  incidentType: 'Accident',
  location: 'Bhopal-Indore Highway',
  date: '25-09-2026',
  time: '10:30 AM',
  vehicleCondition: 'Damaged',
  cargoStatus: 'Normal',
};

function SelectField({ id, label, value, options, onChange, highlight = false }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}<span className="required-mark">*</span></label>
      <div className={`control-shell ${highlight ? 'control-attention' : ''}`}>
        <select id={id} value={value} onChange={e => onChange(id, e.target.value)}>
          {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
        <span className="select-chevron"><Icon name="chevron" size={15} strokeWidth={2.5} /></span>
      </div>
    </div>
  );
}

function ReportScreen({ onBack, onNext }) {
  const [form, setForm] = useState(initialForm);
  const update = (key, value) => setForm(current => ({ ...current, [key]: value }));

  return (
    <div className="screen-body form-screen-body">
      <header className="form-header">
        <button type="button" className="form-back" aria-label="Back to home" onClick={onBack}><Icon name="back" size={24} /></button>
        <h1>Report Incident</h1>
        <span className="header-spacer" />
      </header>

      <form className="simple-report-form" onSubmit={e => { e.preventDefault(); onNext(form); }}>
        <SelectField id="driver" label="Driver" value={form.driver} options={['Rahul Sharma', 'Tanishk', 'Krishna', 'Priyansh', 'Harsh']} onChange={update} />
        <SelectField id="vehicle" label="Vehicle" value={form.vehicle} options={['VH001 - Tata Truck', 'VH002 - Delivery Van', 'VH003 - Freight Truck']} onChange={update} />
        <SelectField id="route" label="Route" value={form.route} options={['Bhopal - Indore', 'Indore - Ujjain', 'Bhopal - Gwalior', 'Dewas - Indore']} onChange={update} />
        <SelectField id="incidentType" label="Incident Type" value={form.incidentType} options={['Accident', 'Breakdown', 'Cargo Damage', 'Hazard', 'Other']} onChange={update} highlight />

        <div className="form-field">
          <label htmlFor="location">Location<span className="required-mark">*</span></label>
          <div className="location-control">
            <input id="location" type="text" value={form.location} onChange={e => update('location', e.target.value)} />
            <Icon name="pin" size={19} strokeWidth={2.3} />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="incidentDate">Date &amp; Time<span className="required-mark">*</span></label>
          <div className="datetime-control">
            <input id="incidentDate" type="text" aria-label="Incident date" value={form.date} onChange={e => update('date', e.target.value)} />
            <input type="text" aria-label="Incident time" value={form.time} onChange={e => update('time', e.target.value)} />
            <button type="button" aria-label="Use current date and time" onClick={() => { const now = new Date(); update('date', now.toLocaleDateString('en-GB')); update('time', now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })); }}><Icon name="calendar" size={19} /></button>
          </div>
        </div>

        <SelectField id="vehicleCondition" label="Vehicle Condition" value={form.vehicleCondition} options={['Good', 'Minor damage', 'Damaged', 'Not roadworthy']} onChange={update} />
        <SelectField id="cargoStatus" label="Cargo Status" value={form.cargoStatus} options={['Normal', 'Damaged', 'Partially damaged', 'Missing']} onChange={update} />

        <button className="next-button" type="submit">Next <Icon name="arrow" size={18} strokeWidth={2.7} /></button>
      </form>
    </div>
  );
}

function BottomNav({ onNotice }) {
  const items = [
    { label: 'Home', icon: 'home', active: true },
    { label: 'Incidents', icon: 'alert' },
    { label: 'Profile', icon: 'user' },
  ];
  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {items.map(item => (
        <button key={item.label} type="button" className={`nav-item ${item.active ? 'active' : ''}`} onClick={item.active ? undefined : onNotice} aria-current={item.active ? 'page' : undefined}>
          <span className="nav-icon-wrap"><Icon name={item.icon} size={22} strokeWidth={2.4} /></span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function App() {
  const [screen, setScreen] = useState('home');
  const [notice, setNotice] = useState('');

  const showNotice = () => setNotice('This prototype includes only Home and Report Incident screens.');
  const goHome = () => { setScreen('home'); setNotice(''); };
  const goToForm = () => { setScreen('form'); setNotice(''); };
  const nextPreview = () => setNotice('UI preview only — no incident was submitted to ServiceNow.');

  return (
    <div className="app-stage">
      <div className={`app-device ${screen === 'form' ? 'form-device' : ''}`}>
        <StatusBar />
        <div className="app-screen">
          {screen === 'home'
            ? <HomeScreen onStartReport={goToForm} onNotice={showNotice} />
            : <ReportScreen onBack={goHome} onNext={nextPreview} />}
        </div>
        <div className="system-nav" aria-hidden="true"><span className="system-back"/><span className="system-home"/><span className="system-recents"/></div>
      </div>
      {notice && <div className="toast" role="status"><Icon name="check" size={17} /><span>{notice}</span><button type="button" onClick={() => setNotice('')} aria-label="Dismiss"><Icon name="close" size={16} /></button></div>}
      <div className="prototype-label">FRONTEND UI · SAMPLE VALUES ONLY · NO BACKEND</div>
    </div>
  );
}

export default App;
