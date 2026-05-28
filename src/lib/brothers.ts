export type Brother = {
  id: string;
  name: string;
  major: string;
  year: "Freshman" | "Sophomore" | "Junior" | "Senior";
  industry: string;
  role?: string;
  internship?: string;
  hometown: string;
  bio: string;
  funFact: string;
  linkedin?: string;
};

// Realistic placeholder roster — replace with real chapter data later.
export const brothers: Brother[] = [
  { id: "1", name: "Ethan Caldwell", major: "Finance", year: "Senior", industry: "Investment Banking", role: "President", internship: "Goldman Sachs", hometown: "Cleveland, OH", bio: "Leads chapter strategy and external partnerships. Treasurer of Fisher Investment Banking Society.", funFact: "Ran the Columbus Marathon sub-3.", linkedin: "https://linkedin.com" },
  { id: "2", name: "Maya Patel", major: "Accounting", year: "Senior", industry: "Consulting", role: "VP of Operations", internship: "Deloitte", hometown: "Cincinnati, OH", bio: "Oversees internal operations and member development.", funFact: "Speaks four languages." },
  { id: "3", name: "Jordan Kim", major: "Marketing", year: "Junior", industry: "Marketing", role: "VP of Membership", internship: "Procter & Gamble", hometown: "Dublin, OH", bio: "Runs recruitment and pledge education.", funFact: "Former DJ at WOSU radio." },
  { id: "4", name: "Aaliyah Brooks", major: "Information Systems", year: "Junior", industry: "Technology", internship: "Microsoft", hometown: "Atlanta, GA", bio: "Software intern with focus on cloud infrastructure.", funFact: "Builds custom mechanical keyboards." },
  { id: "5", name: "Noah Sullivan", major: "Finance", year: "Senior", industry: "Private Equity", role: "VP of Finance", internship: "JP Morgan", hometown: "Pittsburgh, PA", bio: "Manages chapter budget and treasury.", funFact: "Owns 12 pairs of identical white sneakers." },
  { id: "6", name: "Priya Sharma", major: "Economics", year: "Sophomore", industry: "Consulting", internship: "Bain & Company", hometown: "Columbus, OH", bio: "Case team intern on healthcare practice.", funFact: "Classically trained violinist." },
  { id: "7", name: "Marcus Johnson", major: "Real Estate", year: "Senior", industry: "Real Estate", role: "VP of Brotherhood", internship: "CBRE", hometown: "Toledo, OH", bio: "Plans brotherhood retreats and socials.", funFact: "Cooks the best brisket in Columbus." },
  { id: "8", name: "Sofia Martinez", major: "Logistics Management", year: "Junior", industry: "Operations", internship: "Amazon", hometown: "Chicago, IL", bio: "Operations rotational intern.", funFact: "Climbed Mt. Kilimanjaro at 17." },
  { id: "9", name: "Liam O'Connor", major: "Finance", year: "Sophomore", industry: "Investment Banking", internship: "Morgan Stanley", hometown: "Boston, MA", bio: "Summer analyst in TMT coverage.", funFact: "Plays club rugby for OSU." },
  { id: "10", name: "Zoe Nakamura", major: "Business Analytics", year: "Senior", industry: "Technology", role: "VP of Professional Dev", internship: "Google", hometown: "San Jose, CA", bio: "Runs the professional speaker series and case competitions.", funFact: "Has visited 31 countries." },
  { id: "11", name: "Devon Williams", major: "Marketing", year: "Junior", industry: "Brand Management", internship: "Nike", hometown: "Portland, OR", bio: "Brand marketing intern on Jordan brand.", funFact: "Sneaker collection valued over $20K." },
  { id: "12", name: "Hannah Reilly", major: "Finance", year: "Sophomore", industry: "Wealth Management", internship: "Fifth Third", hometown: "Columbus, OH", bio: "Private wealth analyst intern.", funFact: "Competitive figure skater for 12 years." },
  { id: "13", name: "Tyler Chen", major: "Accounting", year: "Senior", industry: "Audit", role: "Secretary", internship: "EY", hometown: "New Albany, OH", bio: "Audit intern on tech and life sciences clients.", funFact: "Built a chess engine in Rust." },
  { id: "14", name: "Olivia Park", major: "International Business", year: "Junior", industry: "Consulting", internship: "McKinsey & Company", hometown: "Seoul, South Korea", bio: "Strategy summer associate.", funFact: "Was an extra in a K-drama." },
  { id: "15", name: "Andre Foster", major: "Supply Chain", year: "Senior", industry: "Operations", role: "VP of Service", internship: "Honda", hometown: "Marysville, OH", bio: "Leads philanthropy and community service initiatives.", funFact: "Restored a 1968 Mustang from scratch." },
  { id: "16", name: "Isabella Romano", major: "Finance", year: "Junior", industry: "Investment Banking", internship: "Citi", hometown: "New York, NY", bio: "Healthcare IB summer analyst.", funFact: "Makes pasta from her nonna's recipe every Sunday." },
];

export const FILTERS = {
  years: ["Freshman", "Sophomore", "Junior", "Senior"] as const,
  industries: [
    "Investment Banking", "Consulting", "Technology", "Marketing",
    "Private Equity", "Audit", "Brand Management", "Wealth Management",
    "Operations", "Real Estate",
  ],
  roles: [
    "President", "VP of Operations", "VP of Membership", "VP of Finance",
    "VP of Brotherhood", "VP of Professional Dev", "VP of Service", "Secretary",
  ],
};
