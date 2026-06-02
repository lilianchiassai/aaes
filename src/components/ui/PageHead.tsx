import type { ReactNode } from "react";
import { Container } from "./Section";
import { Lead } from "./Lead";

/* Generic dark page header: big display title + lead paragraph, with an
   optional decorative image bleeding off the right edge. */
export function PageHead({
  title,
  children,
  screenLabel,
  image,
  imageAlt = "",
}: {
  title: ReactNode;
  children: ReactNode;
  screenLabel?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section
      className="relative overflow-hidden py-[60px] bg-[#070707]"
      data-screen-label={screenLabel}
    >
      {image && (
        <img
          loading="lazy"
          decoding="async"
          src={image}
          alt={imageAlt}
          className="absolute right-[-2%] bottom-[-10%] w-[360px] max-w-[36vw] opacity-[0.16] pointer-events-none"
        />
      )}
      <Container className="relative">
        <h1 className="font-display text-[clamp(46px,8vw,104px)] uppercase text-white leading-[0.84] mt-[10px] mb-[14px]">
          {title}
        </h1>
        <Lead>{children}</Lead>
      </Container>
    </section>
  );
}
