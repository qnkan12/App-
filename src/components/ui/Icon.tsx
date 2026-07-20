import type { SVGProps } from "react";
import {
  Rocket, Gauge, ShieldCheck, Sparkles, Server, Smartphone, Cloud, Brain,
  Database, Code2, Palette, Search, Home, User, Layers, FolderGit2, Briefcase,
  Mail, LayoutGrid, Cpu, Boxes, Zap, Globe, GitBranch, Terminal, Workflow,
  Wrench, Send, ArrowUpRight, ArrowRight, Star, Quote, MapPin, Check, Menu, X,
  CornerDownLeft, Command, type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  rocket: Rocket,
  gauge: Gauge,
  shield: ShieldCheck,
  sparkles: Sparkles,
  server: Server,
  smartphone: Smartphone,
  cloud: Cloud,
  brain: Brain,
  database: Database,
  code: Code2,
  palette: Palette,
  search: Search,
  home: Home,
  user: User,
  layers: Layers,
  folder: FolderGit2,
  briefcase: Briefcase,
  mail: Mail,
  layout: LayoutGrid,
  cpu: Cpu,
  boxes: Boxes,
  zap: Zap,
  globe: Globe,
  gitbranch: GitBranch,
  terminal: Terminal,
  workflow: Workflow,
  wrench: Wrench,
  send: Send,
  arrowupright: ArrowUpRight,
  arrowright: ArrowRight,
  star: Star,
  quote: Quote,
  map: MapPin,
  check: Check,
  menu: Menu,
  x: X,
  corner: CornerDownLeft,
  command: Command,
};

export function Icon({ name, ...props }: { name: string } & SVGProps<SVGSVGElement>) {
  const Cmp = ICON_MAP[name] ?? Sparkles;
  return <Cmp {...props} />;
}

/* ---- Brand icons (custom SVGs, lucide removed brand icons) ---- */

export function BrandIcon({ name, ...props }: { name: string } & SVGProps<SVGSVGElement>) {
  const common = { viewBox: "0 0 24 24", fill: "currentColor", ...props };
  switch (name) {
    case "github":
      return (
        <svg {...common}>
          <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
      );
    case "dribbble":
      return (
        <svg {...common}>
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm7.932 5.495c1.4 1.69 2.252 3.858 2.273 6.222-.328-.07-3.612-.734-6.924-.302-.07-.164-.135-.332-.202-.502-.207-.492-.437-.99-.68-1.48 3.66-1.492 5.32-3.642 5.533-3.938zM12 1.57c2.337 0 4.482.786 6.198 2.103-.18.256-1.682 2.276-5.224 3.595-1.636-3.005-3.45-5.47-3.73-5.85.55-.056 1.106-.085 1.756-.143zM8.4 2.45c.272.37 2.05 2.84 3.704 5.78-4.667 1.24-8.78 1.22-9.218 1.214.646-3.078 2.792-5.61 5.514-6.994zM1.51 12.025v-.314c.43.008 5.26.07 10.243-1.42.287.56.557 1.13.805 1.7-.13.036-.262.076-.39.112-5.14 1.66-7.87 6.198-8.1 6.585C2.66 17.84 1.51 15.06 1.51 12.025zM12 22.49c-2.675 0-5.13-.872-7.108-2.345.18-.37 2.107-4.082 7.714-6.04l.064-.02c1.39 3.606 1.96 6.63 2.108 7.498-1.36.515-2.834.867-4.778.867zm6.26-1.74c-.103-.61-.628-3.51-1.917-7.06 3.124-.5 5.86.318 6.2.43-.43 2.737-2 5.1-4.283 6.63z" />
        </svg>
      );
    default:
      return null;
  }
}
