export const site = {
  name: "Federico Torrielli",
  role: "AI Safety researcher",
  org: "University of Southern Denmark",
  orgShort: "SDU",
  description:
    "Federico Torrielli is an AI Safety researcher at the University of Southern Denmark. He works on mechanistic interpretability, in particular on activation verbalizers.",
  /** Kept in two parts so the full address never appears in the HTML. */
  email: { user: "torrielli", domain: "imada.sdu.dk", shown: "torrielli [at] imada.sdu.dk" },
  blog: "https://federicotorrielli.me/blog/",
};

export const nav = [
  { label: "Papers", href: "/papers/" },
  { label: "Projects", href: "/projects/" },
  { label: "Courses", href: "/courses/" },
  { label: "About", href: "/about/" },
  { label: "Blog", href: site.blog, external: true },
];

export const socials = [
  { label: "Email", href: "/location/", icon: "mail", email: true },
  { label: "Google Scholar", href: "https://scholar.google.com/citations?user=mzx5EIYAAAAJ", icon: "scholar" },
  { label: "GitHub", href: "https://github.com/federicotorrielli", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/federico-torrielli/", icon: "linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/federicotorrielli/", icon: "instagram" },
  { label: "Location", href: "/location/", icon: "pin" },
] as const;
