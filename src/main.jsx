import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown,
  ArrowUpRight,
  Bike,
  Check,
  Circle,
  Disc3,
  Info,
  MapPin,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import { services, extras, calculateQuote, formatPrice } from "./quote.js";
import "./styles.css";

const icons = {
  wrench: Wrench,
  bike: Bike,
  zap: Zap,
  circle: Circle,
  disc: Disc3,
};

function BikeArtwork() {
  return (
    <div className="bike-art" aria-hidden="true">
      <span className="art-orbit" />
      <span className="art-caption">BUILT FOR THE LONG WAY HOME.</span>
      <svg viewBox="0 0 560 300" fill="none">
        <circle cx="139" cy="198" r="77" />
        <circle cx="429" cy="198" r="77" />
        <g className="spokes">
          <path d="M139 121v154m-77-77h154m-132-55 110 110m-110 0 110-110M429 121v154m-77-77h154m-132-55 110 110m-110 0 110-110" />
        </g>
        <g className="bike-frame">
          <path d="m139 198 66-128 76 128H139l-4 0m70-128h161l-85 128m85-128 63 128M266 198h30M183 65h43m130 5-10-31h41q18 0 18 15" />
          <circle cx="281" cy="198" r="14" />
          <path d="m281 198 24 21h15" />
        </g>
      </svg>
      <span className="art-sticker">
        <Sparkles size={16} /> GOOD CARE.
        <br />
        GREAT RIDES.
      </span>
    </div>
  );
}

function ServiceCard({ service, selected, onChange }) {
  const Icon = icons[service.icon];
  return (
    <label className={`service-card ${selected ? "is-selected" : ""}`}>
      <input
        type="radio"
        name="service"
        value={service.id}
        checked={selected}
        onChange={onChange}
        required
        aria-describedby="service-help"
      />
      <span className="service-icon">
        <Icon size={23} strokeWidth={1.7} />
      </span>
      <span className="service-copy">
        <span className="card-tag">{service.tag}</span>
        <strong>{service.name}</strong>
        <small>{service.description}</small>
      </span>
      <span className="service-price">
        £{service.price}
        <span className="radio-mark">{selected && <Check size={13} />}</span>
      </span>
    </label>
  );
}

function Summary({ quote, summaryRef, confirmed, onReset }) {
  return (
    <aside
      className="summary"
      aria-labelledby="summary-title"
      ref={summaryRef}
      tabIndex={-1}
    >
      <div className="summary-heading">
        <span className="eyebrow">YOUR NEXT CHAPTER</span>
        <Bike size={26} />
      </div>
      <h2 id="summary-title">Good rides start here.</h2>
      <p className="summary-intro">
        Your service, your way. Here's the breakdown.
      </p>
      <div className="receipt" aria-live="polite" aria-atomic="true">
        <div className="receipt-label">
          <span>SERVICE DETAILS</span>
          <span>GBP</span>
        </div>
        <div className="receipt-items">
          {quote ? (
            quote.items.map((item) => (
              <div className="receipt-item" key={item.id}>
                <span>{item.name}</span>
                <strong>{formatPrice(item.price)}</strong>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <span className="empty-icon">
                <Wrench size={22} />
              </span>
              <p>
                Your bike's next adventure
                <br />
                starts with a service.
              </p>
              <small>Choose a main service to see your estimate.</small>
            </div>
          )}
        </div>
        <div className="total">
          <span>
            Estimated total<small>All prices in pounds sterling</small>
          </span>
          <strong key={quote?.total}>
            {quote ? formatPrice(quote.total) : "—"}
          </strong>
        </div>
        {confirmed && (
          <p className="confirmed">
            <Check size={14} /> Estimate ready. You're one step closer.
          </p>
        )}
      </div>
      <div className="estimate-note">
        <Info size={17} />
        <p>
          A little heads-up: this is an estimate. We'll confirm the final price
          with you after checking your bike.
        </p>
      </div>
      <div className="summary-footer">
        <ShieldCheck size={18} />
        <span>No surprises. Just honest bike care.</span>
      </div>
      {quote && (
        <button type="button" className="reset" onClick={onReset}>
          <RotateCcw size={13} /> Start a fresh estimate
        </button>
      )}
    </aside>
  );
}

function App() {
  const [serviceId, setServiceId] = useState("");
  const [extraIds, setExtraIds] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const summaryRef = useRef(null);
  const formRef = useRef(null);
  const quote = calculateQuote(serviceId, extraIds);
  const chooseService = (id) => {
    setServiceId(id);
    setConfirmed(false);
  };
  const toggleExtra = (id) => {
    setExtraIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
    setConfirmed(false);
  };
  function reset() {
    setServiceId("");
    setExtraIds([]);
    setConfirmed(false);
    formRef.current?.querySelector("input")?.focus();
  }
  function submit(event) {
    event.preventDefault();
    if (!quote) return;
    setConfirmed(true);
    summaryRef.current?.focus({ preventScroll: true });
    summaryRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "nearest",
    });
  }

  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <a
            className="brand"
            href="./"
            aria-label="Borough Cycle Repairs home"
          >
            <img
              className="brand-logo"
              src={`${import.meta.env.BASE_URL}brand/logo-primary.svg`}
              alt="Borough Cycle Repairs"
              width="240"
              height="62"
            />
          </a>
          <nav aria-label="Main navigation">
            <a href="#calculator">
              Service calculator <ArrowUpRight size={14} />
            </a>
            <span className="location">
              <MapPin size={13} /> London, UK
            </span>
          </nav>
        </div>
      </header>
      <main>
        <section className="hero wrap" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> A LITTLE CARE GOES A LONG WAY
            </p>
            <h1 id="page-title">
              Less guesswork.
              <br />
              More <span>good rides.</span>
            </h1>
            <p className="hero-description">
              From your daily commute to the scenic route.
              <br className="desktop-break" /> Give your bike the care it
              deserves, at a price that makes sense.
            </p>
            <a className="hero-link" href="#calculator">
              Find your service{" "}
              <span>
                <ArrowDown size={16} />
              </span>
            </a>
          </div>
          <BikeArtwork />
        </section>
        <div className="trust-strip">
          <div className="wrap trust-inner">
            <span>
              <Check size={15} /> Clear, upfront prices
            </span>
            <span>
              <ShieldCheck size={16} /> No commitment needed
            </span>
            <span>
              <Wrench size={15} /> Care for every kind of rider
            </span>
          </div>
        </div>
        <section
          className="wrap calculator-section"
          id="calculator"
          aria-labelledby="calculator-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">A BETTER RIDE, IN TWO SIMPLE STEPS</p>
              <h2 id="calculator-title">Let's get your wheels turning.</h2>
            </div>
            <span className="live-label">
              <span className="status-dot" /> Instant estimate
            </span>
          </div>
          <div className="calculator-layout">
            <form ref={formRef} onSubmit={submit}>
              <fieldset>
                <legend>
                  <span className="step">01</span> Pick your main service
                </legend>
                <p className="field-description" id="service-help">
                  A quick refresh or a little more love? Choose one to begin.
                </p>
                <div className="service-list">
                  {services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      selected={serviceId === service.id}
                      onChange={() => chooseService(service.id)}
                    />
                  ))}
                </div>
              </fieldset>
              <fieldset className="extras">
                <legend>
                  <span className="step">02</span> A little something extra{" "}
                  <span className="optional">OPTIONAL</span>
                </legend>
                <p className="field-description">
                  The finishing touches for a smoother journey.
                </p>
                <div className="extra-list">
                  {extras.map((extra) => {
                    const Icon = icons[extra.icon];
                    return (
                      <label
                        key={extra.id}
                        className={`extra-card ${extraIds.includes(extra.id) ? "is-selected" : ""}`}
                      >
                        <span className="extra-icon">
                          <Icon size={21} />
                        </span>
                        <span className="extra-copy">
                          <strong>{extra.name}</strong>
                          <small>{extra.description}</small>
                        </span>
                        <span className="extra-price">+ £{extra.price}</span>
                        <input
                          type="checkbox"
                          name="extra"
                          value={extra.id}
                          checked={extraIds.includes(extra.id)}
                          onChange={() => toggleExtra(extra.id)}
                        />
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <button className="calculate" type="submit">
                Calculate my estimate <ArrowUpRight size={20} />
              </button>
              <p className="form-note">
                Just an estimate. No booking or payment required.
              </p>
            </form>
            <Summary
              quote={quote}
              summaryRef={summaryRef}
              confirmed={confirmed}
              onReset={reset}
            />
          </div>
        </section>
        <section className="closing wrap" aria-labelledby="closing-title">
          <span className="closing-icon">
            <Bike size={30} />
          </span>
          <div>
            <h2 id="closing-title">Every bike has more miles in it.</h2>
            <p>
              We're here to help you find them. Your local London cycle
              workshop.
            </p>
          </div>
          <span className="closing-arrow" aria-hidden="true">
            ↗
          </span>
        </section>
      </main>
      <footer className="wrap">
        <span>© {new Date().getFullYear()} Borough Cycle Repairs</span>
        <span>Made for the everyday adventure.</span>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
