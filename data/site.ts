export const siteConfig = {
  name: "Akanksha Tomar",
  title: "REALTOR®",
  brokerage: "eXp Realty | Kumler Group",
  licenseNumber: "SA719827000",
  description:
    "Personal, patient real estate guidance for buyers and sellers throughout Greater Phoenix, Arizona.",
  url: "https://homeswithakanksha.com",
  phoneDisplay: "(217) 979-1262",
  phoneHref: "+12179791262",
  email: "Akanksha.azhomes@gmail.com",
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Buy", href: "/buy" },
  { label: "Sell", href: "/sell" },
  { label: "Communities", href: "/communities" },
  { label: "Search Homes", href: "/search" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;
