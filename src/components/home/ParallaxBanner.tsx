import { Fragment } from "react";

/* The floating caution-tape banner that straddles the hero→concrete seam.
   Strips translate on X with scroll (useScrollParallax reads data-factor). */

const HAZARD_ITEMS = ["Parc du Biez", "Mondeville", "12 Septembre 2026", "20H00", "15 €"];
const TAG_ITEMS = [
  "Tout est sous contrôle",
  "Jeu de rôle grandeur nature",
  "+3 heures",
  "100 participants",
];

function HazardTape() {
  return (
    <span className="ptape ptape--hazard">
      {HAZARD_ITEMS.map((t, i) => (
        <span key={i}>{t}</span>
      ))}
    </span>
  );
}

function TagTape() {
  return (
    <span className="ptape ptape--tag">
      {TAG_ITEMS.map((t, i) => (
        <Fragment key={i}>
          <span>{t}</span>
          {i < TAG_ITEMS.length - 1 && <span className="dot" />}
        </Fragment>
      ))}
    </span>
  );
}

export function ParallaxBanner() {
  return (
    <div className="joint">
      <div className="joint__band" />
      <div className="joint__fade" />

      <div className="pbanner" aria-hidden="true">
        {/* back plain stripe (darker) */}
        <div className="pbanner__strip pbanner__strip--back">
          <div className="pbanner__parallax" data-factor="0.06">
            <div className="pbanner__track">
              <div className="pstripe pstripe--dim" />
            </div>
          </div>
        </div>

        {/* solid yellow info tape (logistics) */}
        <div className="pbanner__strip pbanner__strip--front">
          <div className="pbanner__parallax" data-factor="0.16">
            <div className="pbanner__track">
              <HazardTape />
              <HazardTape />
              <HazardTape />
            </div>
          </div>
        </div>

        {/* black tape with yellow borders (the pitch) */}
        <div className="pbanner__strip pbanner__strip--tag">
          <div className="pbanner__parallax" data-factor="-0.13">
            <div className="pbanner__track">
              <TagTape />
              <TagTape />
              <TagTape />
            </div>
          </div>
        </div>

        {/* back plain stripe (darker) */}
        <div className="pbanner__strip pbanner__strip--back2">
          <div className="pbanner__parallax" data-factor="-0.08">
            <div className="pbanner__track">
              <div className="pstripe pstripe--dim" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
