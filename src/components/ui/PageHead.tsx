import type { ReactNode } from "react";
import { Container } from "./Section";
import { Lead } from "./Lead";
import { HeaderHands } from "./HeaderHands";

/* Generic dark page header: big display title + lead paragraph, with an
   optional zombie-hand cluster anchored bottom-right. */
export function PageHead({
  title,
  children,
  screenLabel,
  hands,
}: {
  title: ReactNode;
  children: ReactNode;
  screenLabel?: string;
  hands?: "left" | "right";
}) {
  return (
    <section
      className="relative overflow-hidden py-[60px] bg-[#070707]"
      data-screen-label={screenLabel}
    >
      {hands && <HeaderHands variant={hands} />}
      <Container className="relative">
        <h1 className="font-display text-[clamp(46px,8vw,104px)] uppercase text-white leading-[0.84] mt-[10px] mb-[14px]">
          {title}
        </h1>
        <Lead>{children}</Lead>
      </Container>
    </section>
  );
}
