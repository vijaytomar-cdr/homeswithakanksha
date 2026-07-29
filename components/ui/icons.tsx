import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return <IconBase {...props}><path d="M7 17 17 7M8 7h9v9" /></IconBase>;
}
export function ArrowRight(props: IconProps) {
  return <IconBase {...props}><path d="M5 12h14m-5-5 5 5-5 5" /></IconBase>;
}
export function Phone(props: IconProps) {
  return <IconBase {...props}><path d="M7.5 3.5 10 8 8.3 9.7a14 14 0 0 0 6 6L16 14l4.5 2.5-.7 3.1c-.2.9-1 1.5-2 1.4A17 17 0 0 1 3 6.2c-.1-.9.5-1.8 1.4-2l3.1-.7Z" /></IconBase>;
}
export function Message(props: IconProps) {
  return <IconBase {...props}><path d="M20 15a3 3 0 0 1-3 3H9l-5 3v-6a3 3 0 0 1-1-2.2V7a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v8Z" /></IconBase>;
}
export function Search(props: IconProps) {
  return <IconBase {...props}><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></IconBase>;
}
export function Home(props: IconProps) {
  return <IconBase {...props}><path d="m3 11 9-8 9 8v9h-6v-6H9v6H3v-9Z" /></IconBase>;
}
export function Menu(props: IconProps) {
  return <IconBase {...props}><path d="M4 7h16M4 12h16M4 17h16" /></IconBase>;
}
export function Close(props: IconProps) {
  return <IconBase {...props}><path d="m6 6 12 12M18 6 6 18" /></IconBase>;
}
export function MapPin(props: IconProps) {
  return <IconBase {...props}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></IconBase>;
}
export function Play(props: IconProps) {
  return <IconBase {...props}><path d="m9 7 8 5-8 5V7Z" /></IconBase>;
}

