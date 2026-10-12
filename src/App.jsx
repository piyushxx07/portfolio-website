import { useEffect, useId, useRef, useState } from 'react';
import githubLogo from './assets/github.png';
import gmailLogo from './assets/gmail.png';
import linkedinLogo from './assets/linkedin.png';
import './styles.scss';

const applePath =
  'M19.2 20.1c-.8 1.2-1.7 2.4-3.1 2.4-1.2 0-1.6-.8-3.3-.8s-2.2.8-3.3.8c-1.4 0-2.3-1.1-3.1-2.3C2.9 15.8 3 9.1 7.8 7.3c1.7-.7 3.2-.3 4.5.3.4.2.8.2 1.2 0 1.4-.6 3.1-1 4.8-.2.9.4 1.7 1 2.3 1.8-3.5 2.3-2.9 7.2.8 8.8-.5.9-1.2 1.9-2.2 2.1ZM12.1 6.6c-.1-2.5 1.8-4.5 4.3-4.7.3 2.7-2.2 4.9-4.3 4.7Z';

const projects = [
  { name: 'AnyDrop', id: 'anydrop' },
  { name: 'Coinheight Dashboard', id: 'coinheight' },
  { name: 'Prog Safari', id: 'prog-safari' },
];

const suggestions = [
  'Tell me about yourself',
  'What projects have you made?',
  'What is your tech stack?',
  'Why should I hire you?',
];

function ProjectFolder({ project }) {
  const gradientId = `folder-gradient-${project.id}-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <article className="project">
      <span className="project__icon" aria-hidden="true">
        <svg className="project__folder-svg" viewBox="0 0 100 84">
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#138fc8" />
              <stop offset="0.58" stopColor="#087eb8" />
              <stop offset="1" stopColor="#0872a8" />
            </linearGradient>
            <linearGradient id={`${gradientId}-front`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#83d5fb" />
              <stop offset="0.72" stopColor="#69c9f4" />
              <stop offset="1" stopColor="#59bce9" />
            </linearGradient>
          </defs>
          <path
            d="M1 23V17C1 8 8 2 19 2h15c7 0 11 2 17 7l9 7c5 4 10 6 18 6h11c7 0 10 4 10 11v34c0 10-6 15-16 15H18C7 82 1 76 1 65V23Z"
            fill={`url(#${gradientId})`}
            stroke="#0878ad"
            strokeWidth="1"
          />
          <path
            d="M1 32c0-9 7-14 18-14h63c11 0 17 5 17 16v31c0 11-6 17-17 17H18C7 82 1 76 1 65V32Z"
            fill={`url(#${gradientId}-front)`}
            stroke="#55b9e8"
            strokeWidth="1.2"
          />
          <path
            d="M5 29c2-6 7-9 14-9h64c7 0 11 2 14 7"
            fill="none"
            stroke="rgba(218,247,255,.65)"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path d="M3 72c21 3 73 3 94 0M6 76c22 3 66 3 88 0" fill="none" stroke="rgba(30,142,196,.17)" strokeWidth="1.4" />
        </svg>
      </span>
      <span className="project__name">{project.name}</span>
    </article>
  );
}

function AskMeIcon() {
  const gradientId = `assistant-gradient-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#8ee7ff" />
          <stop offset="1" stopColor="#9b83ff" />
        </linearGradient>
      </defs>
      <path d="M24 4 28.7 18.3 44 24l-15.3 5.7L24 44l-5.7-14.3L4 24l14.3-5.7L24 4Z" fill={`url(#${gradientId})`} />
      <circle cx="37" cy="10" r="3" fill="#fff" />
      <circle cx="11" cy="37" r="2" fill="#d9d0ff" />
    </svg>
  );
}

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={applePath} fill="currentColor" />
    </svg>
  );
}

function DesktopIsland({ isOpen }) {
  return (
    <div className={`desktop-island${isOpen ? ' is-open' : ''}`} aria-hidden="true">
      <span className="desktop-island__glow" />
    </div>
  );
}

function DesktopDock({ onOpenAssistant, isOpen, shouldNudge }) {
  return (
    <nav className="dock" aria-label="Dock">
      <a className="dock__app dock__app--mail" href="mailto:iyushkumaryadav2027@gmail.com" aria-label="Mail">
        <img src={gmailLogo} alt="" />
      </a>
      <a className="dock__app dock__app--github" href="https://github.com/piyushxx07" target="_blank" rel="noreferrer" aria-label="GitHub">
        <img src={githubLogo} alt="" />
      </a>
      <span className="dock__app dock__app--terminal" aria-hidden="true">
        <span aria-hidden="true">›_</span>
      </span>
      <a className="dock__app dock__app--linkedin" href="https://www.linkedin.com/in/piyush-kumar-xx07/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <img src={linkedinLogo} alt="" />
      </a>
      <span className="dock__divider" aria-hidden="true" />
      <button
        className={`dock__app dock__app--assistant${isOpen ? ' is-open' : ''}${shouldNudge ? ' is-nudging' : ''}`}
        type="button"
        aria-label="Open Ask Me assistant"
        aria-expanded={isOpen}
        onClick={onOpenAssistant}
      >
        <AskMeIcon />
        <span>Ask Me</span>
      </button>
    </nav>
  );
}

function MobileShortcut({ label, icon, className }) {
  return (
    <div className="mobile-shortcut">
      <span className={`mobile-shortcut__icon ${className}`} aria-hidden="true">{icon}</span>
      <span className="mobile-shortcut__label">{label}</span>
    </div>
  );
}

function MobileLinkShortcut({ label, logo, className, href, external = false }) {
  return (
    <a
      className="mobile-shortcut mobile-shortcut--link"
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <span className={`mobile-shortcut__icon ${className}`} aria-hidden="true">
        <img src={logo} alt="" />
      </span>
      <span className="mobile-shortcut__label">{label}</span>
    </a>
  );
}

function MobileAssistantApp({ onOpenAssistant, shouldNudge }) {
  return (
    <button
      className={`mobile-shortcut mobile-shortcut--assistant-app${shouldNudge ? ' is-nudging' : ''}`}
      type="button"
      aria-label="Open Ask Me assistant"
      onClick={onOpenAssistant}
    >
      <AskMeIcon />
      <span className="mobile-shortcut__label">Ask Me</span>
    </button>
  );
}

function MobileDock({ onOpenAssistant, shouldNudge }) {
  return (
    <nav className="mobile-dock" aria-label="Mobile dock">
      <MobileLinkShortcut label="Mail" logo={gmailLogo} className="mobile-shortcut__icon--mail" href="mailto:iyushkumaryadav2027@gmail.com" />
      <MobileLinkShortcut label="GitHub" logo={githubLogo} className="mobile-shortcut__icon--github" href="https://github.com/piyushxx07" external />
      <MobileAssistantApp onOpenAssistant={onOpenAssistant} shouldNudge={shouldNudge} />
      <MobileLinkShortcut label="LinkedIn" logo={linkedinLogo} className="mobile-shortcut__icon--linkedin" href="https://www.linkedin.com/in/piyush-kumar-xx07/" external />
    </nav>
  );
}

function MobileHome({ dateTime, time, now, onOpenAssistant, isOpen, shouldNudge }) {
  const seconds = now.getSeconds();
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  return (
    <section className="mobile-home" aria-label="Mobile portfolio home screen">
      <div className="mobile-status">
        <time>{time}</time>
        <div className="mobile-status__icons" aria-label="Wi-Fi connected, battery charged">
          <span aria-hidden="true">●●●</span>
          <span className="mobile-status__wifi" aria-hidden="true">⌁</span>
          <span className="mobile-status__battery" aria-hidden="true"><i /></span>
        </div>
      </div>

      <div className={`dynamic-island${isOpen ? ' is-open' : ''}`} aria-hidden="true">
        <span className="dynamic-island__glow" aria-hidden="true" />
      </div>

      <div className="mobile-widgets">
        <article className="mobile-widget mobile-widget--welcome">
          <p>Hi, I’m Piyush.<br />Welcome to my portfolio.</p>
        </article>
        <article className="mobile-widget mobile-widget--clock" aria-label={`Current local time ${time}`}>
          <span className="mobile-widget__date">{dateTime}</span>
          <div className="clock-face" aria-hidden="true">
            <span className="clock-face__tick clock-face__tick--top" />
            <span className="clock-face__tick clock-face__tick--right" />
            <span className="clock-face__tick clock-face__tick--bottom" />
            <span className="clock-face__tick clock-face__tick--left" />
            <i className="clock-face__hand clock-face__hand--hour" style={{ transform: `rotate(${hours * 30}deg)` }} />
            <i className="clock-face__hand clock-face__hand--minute" style={{ transform: `rotate(${minutes * 6}deg)` }} />
            <i className="clock-face__hand clock-face__hand--second" style={{ transform: `rotate(${seconds * 6}deg)` }} />
            <span className="clock-face__pin" />
          </div>
          <strong>{time}</strong>
        </article>
      </div>

      <section className="mobile-apps" aria-label="Portfolio project folders">
        <div className="mobile-apps__projects">
          {projects.map((project) => (
            <ProjectFolder key={project.id} project={project} />
          ))}
        </div>
      </section>

      <MobileDock onOpenAssistant={onOpenAssistant} shouldNudge={shouldNudge} />
    </section>
  );
}

function AssistantWindow({ onClose, onAnimationEnd, isClosing }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const conversation = useRef(null);

  useEffect(() => {
    const element = conversation.current;
    element?.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  function handleSubmit(event) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;

    setHasStarted(true);
    setMessages((current) => [
      ...current,
      { role: 'user', text },
      {
        role: 'assistant',
        text: "Thanks for asking! The assistant is a frontend demo for now. Project and experience details will be added soon.",
      },
    ]);
    setInput('');
  }

  function askSuggestion(suggestion) {
    setInput(suggestion);
  }

  return (
    <section
      className={`assistant${isClosing ? ' is-closing' : ''}`}
      role="dialog"
      aria-modal="false"
      aria-labelledby="assistant-title"
      onAnimationEnd={onAnimationEnd}
    >
      <header className="assistant__titlebar">
        <div className="window-controls" aria-label="Window controls">
          <button className="window-controls__button window-controls__button--close" type="button" aria-label="Close assistant" onClick={onClose} />
          <span className="window-controls__button window-controls__button--minimize" />
          <span className="window-controls__button window-controls__button--maximize" />
        </div>
        <h1 className="assistant__title" id="assistant-title"><AskMeIcon /> Ask Me</h1>
        <span className="assistant__titlebar-spacer" />
      </header>

      <div className="assistant__conversation" aria-live="polite" ref={conversation}>
        {!hasStarted ? (
          <div className="assistant__welcome">
            <p className="assistant__eyebrow"><span aria-hidden="true">✦</span> Ask me anything!</p>
            <div className="suggestions" aria-label="Suggested questions">
              {suggestions.map((suggestion) => (
                <button
                  className="suggestion"
                  key={suggestion}
                  onClick={() => askSuggestion(suggestion)}
                  type="button"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="messages">
            {messages.map((message, index) => (
              <p className={`message message--${message.role}`} key={`${message.role}-${index}`}>
                {message.text}
              </p>
            ))}
          </div>
        )}
      </div>

      <form className="composer" onSubmit={handleSubmit}>
        <input
          aria-label="Message for Ask Me"
          autoComplete="off"
          onChange={(event) => setInput(event.target.value)}
          placeholder="Type a message..."
          value={input}
        />
        <button className="composer__send" type="submit" aria-label="Send message" disabled={!input.trim()}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m4 12 16-8-5.5 16-3.1-6.4L4 12Z" />
            <path d="m11.4 13.6 4.2-4.2" />
          </svg>
        </button>
      </form>
    </section>
  );
}

function App() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantClosing, setAssistantClosing] = useState(false);
  const [assistantInteracted, setAssistantInteracted] = useState(false);
  const [now, setNow] = useState(() => new Date());

  function handleAskMeClick() {
    setAssistantInteracted(true);
    if (assistantOpen) {
      setAssistantOpen(false);
      setAssistantClosing(true);
      return;
    }
    setAssistantClosing(false);
    setAssistantOpen(true);
  }

  function closeAssistant() {
    if (!assistantOpen) return;
    setAssistantOpen(false);
    setAssistantClosing(true);
  }

  function handleAssistantAnimationEnd(event) {
    if (
      event.target === event.currentTarget
      && assistantClosing
      && ['assistant-to-island', 'assistant-close', 'assistant-to-desktop-island'].includes(event.animationName)
    ) {
      setAssistantClosing(false);
    }
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') closeAssistant();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [assistantOpen]);

  useEffect(() => {
    const clock = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(clock);
  }, []);

  const dateTime = new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(now);
  const time = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(now);

  return (
    <main className="desktop">
      <div className="wallpaper" aria-hidden="true" />
      <header className="menubar">
        <div className="menubar__left">
          <span className="apple-mark" aria-label="Apple"><AppleMark /></span>
          <span className="menubar__app-name">Finder</span>
          <span className="menubar__item">File</span>
          <span className="menubar__item">Edit</span>
          <span className="menubar__item">View</span>
        </div>
        <div className="menubar__right">
          <span className="status-wifi" aria-label="Wi-Fi connected">⌁</span>
          <span className="status-battery" aria-label="Battery">▰</span>
          <time dateTime={now.toISOString()}>{dateTime}&nbsp; {time}</time>
        </div>
        <DesktopIsland isOpen={assistantOpen} />
      </header>

      <MobileHome
        dateTime={dateTime}
        time={time}
        now={now}
        onOpenAssistant={handleAskMeClick}
        isOpen={assistantOpen}
        shouldNudge={!assistantInteracted && !assistantOpen}
      />

      <section className="welcome" aria-label="Welcome">
        <p className="welcome__eyebrow">Hey, I’m Piyush! <span>Welcome to my</span></p>
        <h1 className="welcome__title">Portfolio</h1>
        <span className="welcome__sparkle" aria-hidden="true">✦</span>
      </section>

      <section className="desktop__projects" aria-label="Portfolio projects">
        {projects.map((project) => <ProjectFolder key={project.name} project={project} />)}
      </section>

      {(assistantOpen || assistantClosing) && (
        <AssistantWindow
          isClosing={assistantClosing}
          onAnimationEnd={handleAssistantAnimationEnd}
          onClose={closeAssistant}
        />
      )}

      <DesktopDock
        isOpen={assistantOpen}
        shouldNudge={!assistantInteracted && !assistantOpen}
        onOpenAssistant={handleAskMeClick}
      />
    </main>
  );
}

export default App;