import type { ComponentProps } from "react";

/**
 * Grayscale, lazily-loaded photo — the brand treatment applied to every
 * past-event image (grayscale + contrast, native lazy-loading). Extra
 * classes (object-fit, hover transitions) are layered via className.
 */
export function LazyImage({
  className = "",
  alt = "",
  ...rest
}: ComponentProps<"img">) {
  return (
    <img
      loading="lazy"
      decoding="async"
      alt={alt}
      className={"grayscale contrast-[1.15] " + className}
      {...rest}
    />
  );
}
