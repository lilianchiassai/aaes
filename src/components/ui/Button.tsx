import { Link } from "react-router-dom";
import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentProps, ReactNode } from "react";

const button = tv({
  base: [
    "inline-block font-impact uppercase tracking-[0.02em] text-xl leading-none",
    "px-[30px] py-[14px] border-2 border-black cursor-pointer no-underline rounded-none",
    "transition-[transform,box-shadow,background,color] duration-100 ease-out",
  ],
  variants: {
    variant: {
      primary:
        "bg-hazard text-black shadow-[6px_6px_0_#000] hover:bg-black hover:text-hazard hover:border-hazard hover:shadow-[6px_6px_0_var(--color-hazard)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none",
      ghost:
        "bg-transparent text-hazard border-hazard shadow-none hover:bg-hazard hover:text-black",
      cyan: "bg-cyan text-black border-black shadow-[6px_6px_0_#000] hover:bg-black hover:text-cyan hover:border-cyan hover:shadow-[6px_6px_0_var(--color-cyan)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none",
    },
    block: { true: "block w-full text-center" },
    disabled: { true: "opacity-40 pointer-events-none grayscale-[0.5]" },
  },
  defaultVariants: { variant: "primary" },
});

type ButtonVariants = VariantProps<typeof button>;

type CommonProps = ButtonVariants & {
  className?: string;
  children: ReactNode;
};

/** Internal route link */
type LinkProps = CommonProps & { to: string } & Omit<ComponentProps<typeof Link>, "to" | "className">;
/** External / anchor link */
type AnchorProps = CommonProps & { href: string } & Omit<ComponentProps<"a">, "href" | "className">;
/** Real button */
type NativeProps = CommonProps & Omit<ComponentProps<"button">, "className">;

export type ButtonProps = LinkProps | AnchorProps | NativeProps;

export function Button(props: ButtonProps) {
  const { variant, block, disabled, className, children, ...rest } = props as CommonProps & {
    to?: string;
    href?: string;
  } & Record<string, unknown>;
  const cls = button({ variant, block, disabled, className });

  if ("to" in props && props.to != null) {
    const { to, ...linkRest } = rest as { to: string };
    return (
      <Link to={to} className={cls} {...linkRest}>
        {children}
      </Link>
    );
  }
  if ("href" in props && props.href != null) {
    return (
      <a className={cls} {...(rest as ComponentProps<"a">)}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} disabled={!!disabled} {...(rest as ComponentProps<"button">)}>
      {children}
    </button>
  );
}
