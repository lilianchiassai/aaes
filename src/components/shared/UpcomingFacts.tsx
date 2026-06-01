import { FactsStrip, Fact } from "../ui/Fact";
import { UPCOMING } from "../../data/site";

/** Facts strip for the upcoming edition — values sourced from UPCOMING. */
export function UpcomingFacts({ className }: { className?: string }) {
  return (
    <FactsStrip className={className}>
      <Fact k="Date" v={UPCOMING.dateShort} />
      <Fact k="Heure" v={UPCOMING.time} />
      <Fact k="Durée" v={UPCOMING.durationLabel} />
      <Fact k="Âge" v={UPCOMING.ageLabel} />
      <Fact k="Tarif" v={UPCOMING.priceLabel} tone="hazard" />
    </FactsStrip>
  );
}
