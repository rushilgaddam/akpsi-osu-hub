export type Brother = {
  id: string;
  name: string;
  major: string;
  pcClass: string;
  role?: string;
  internship?: string;
  hometown: string;
  linkedin?: string;
  photo?: string;
};

// Headshots living in src/assets/members, keyed by brother id (e.g. "derek-bahl.jpg").
// Not every brother has a photo yet — cards fall back to initials when one is missing.
const photoModules = import.meta.glob<{ default: string }>("../assets/members/*.jpg", {
  eager: true,
});

function photoFor(id: string): string | undefined {
  return photoModules[`../assets/members/${id}.jpg`]?.default;
}

// Active chapter roster imported from the latest member list.
export const brothers: Brother[] = [
  { id: "derek-bahl", name: "Derek Bahl", major: "Finance", pcClass: "Alpha", hometown: "Rye, NY", linkedin: "https://www.linkedin.com/in/derek-bahl-3571a5326/" },
  { id: "connor-benke", name: "Connor Benke", major: "Finance", pcClass: "Alpha", role: "VP of Finance", hometown: "Tuckahoe, NY", linkedin: "https://www.linkedin.com/in/connorbenke06/" },
  { id: "anvi-bhavanam", name: "Anvi Bhavanam", major: "Finance", pcClass: "Alpha", role: "Director of Alumni Relations", hometown: "Dallas, Texas", linkedin: "https://www.linkedin.com/in/anvi-bhavanam-5481052ab/" },
  { id: "hayes-bubnick", name: "Hayes Bubnick", major: "Finance", pcClass: "Alpha", hometown: "Medina, OH", linkedin: "https://www.linkedin.com/in/hbubnick" },
  { id: "tristan-cayce", name: "Tristan Cayce", major: "Economics", pcClass: "Beta", role: "Director of DEI", hometown: "Lewis Center, OH", linkedin: "https://www.linkedin.com/in/tristan-cayce/" },
  { id: "lukas-cengic", name: "Lukas Cengic", major: "Accounting", pcClass: "Alpha", role: "Director of Rituals", hometown: "Cleveland, OH", linkedin: "https://www.linkedin.com/in/lukas-cengic/" },
  { id: "kai-cheung", name: "Kai Cheung", major: "Accounting", pcClass: "Gamma", hometown: "Dayton, OH", linkedin: "https://www.linkedin.com/in/kai-cheung-111b73323/" },
  { id: "peter-conser", name: "Peter Conser", major: "Economics", pcClass: "Alpha", hometown: "Chicago, IL", linkedin: "https://www.linkedin.com/in/peter-conser/" },
  { id: "george-di-iaconi", name: "George Di Iaconi", major: "Economics & Real Estate", pcClass: "Gamma", hometown: "Bethesda, MD", linkedin: "https://www.linkedin.com/in/georgediiaconi/" },
  { id: "mananya-ellendula", name: "Mananya Ellendula", major: "Pre-Law, Finance & PPE (Politics, Philosophy, Economics)", pcClass: "Alpha", role: "President", hometown: "Dublin, OH", linkedin: "https://www.linkedin.com/in/mananya-ellendula/" },
  { id: "madelyn-fedor", name: "Madelyn Fedor", major: "Marketing", pcClass: "Alpha", hometown: "Basking Ridge, NJ", linkedin: "https://www.linkedin.com/in/madelyn-fedor-3b801b245" },
  { id: "samantha-feldman", name: "Samantha Feldman", major: "Finance", pcClass: "Alpha", hometown: "Fort Lauderdale, FL", linkedin: "https://www.linkedin.com/in/samantha-feldman-a0b69622b/" },
  { id: "jonathan-felix", name: "Jonathan Felix Saucedo", major: "Hospitality Management", pcClass: "Gamma", hometown: "México City, México", linkedin: "https://www.linkedin.com/in/jonathanfelixsaucedo/" },
  { id: "liam-frazier", name: "Liam Frazier", major: "Finance", pcClass: "Beta", role: "Director of New Member Education", hometown: "Aliso Viejo, CA", linkedin: "https://www.linkedin.com/in/liam-frazier-429a763a5/" },
  { id: "rushil-gaddam", name: "Rushil Gaddam", major: "Computer Science & Engineering", pcClass: "Gamma", hometown: "Lewis Center, OH", linkedin: "https://www.linkedin.com/in/rushil-gaddam-72529029b/" },
  { id: "danny-genek", name: "Danny Genek", major: "Finance", pcClass: "Beta", role: "Director of Brotherhood", hometown: "East Windsor, NJ", linkedin: "https://www.linkedin.com/in/daniel-genek-062b732b7/" },
  { id: "sophie-goldstein", name: "Sophie Goldstein", major: "Undeclared", pcClass: "Gamma", hometown: "Columbus, OH", linkedin: "https://www.linkedin.com/in/sophiegoldstein-" },
  { id: "emma-groves", name: "Emma Groves", major: "Marketing", pcClass: "Alpha", role: "Director of Branding", hometown: "Columbus, OH", linkedin: "https://www.linkedin.com/in/emma-groves-5244a8147/" },
  { id: "lilly-gruber", name: "Lilly Gruber", major: "Finance", pcClass: "Alpha", hometown: "Avon Lake, OH", linkedin: "https://www.linkedin.com/in/lilly-gruber-175786292/" },
  { id: "ty-harter", name: "Ty Harter", major: "Undeclared", pcClass: "Alpha", hometown: "Columbus, OH", linkedin: "https://www.linkedin.com/in/ty-harter-301665257/" },
  { id: "madison-heathcote", name: "Madison Heathcote", major: "Industrial & Systems Engineering", pcClass: "Alpha", hometown: "Cleveland, Ohio", linkedin: "https://www.linkedin.com/in/madisonheathcote/" },
  { id: "ashlyn-hoffman", name: "Ashlyn Hoffman", major: "Finance", pcClass: "Gamma", hometown: "Cincinnati, OH", linkedin: "https://www.linkedin.com/in/ashlyn-hoffman-554a1b346" },
  { id: "sasha-homsy", name: "Sasha Homsy", major: "Operations Management", pcClass: "Gamma", hometown: "Dublin, OH", linkedin: "https://www.linkedin.com/in/sashahomsy/" },
  { id: "gabi-ivler", name: "Gabi Ivler", major: "Finance", pcClass: "Beta", hometown: "Northern Jersey", linkedin: "https://www.linkedin.com/in/gabrielleivler/" },
  { id: "sahana-karthik", name: "Sahana Karthik", major: "Marketing and Public Policy Analysis (Pre-Law)", pcClass: "Gamma", hometown: "Boston, MA", linkedin: "https://www.linkedin.com/in/sahanakarthik-/" },
  { id: "rishika-katakam", name: "Rishika Katakam", major: "Finance", pcClass: "Alpha", hometown: "Chicago, IL", linkedin: "https://www.linkedin.com/in/rishika-katakam/" },
  { id: "gautam-ketkar", name: "Gautam Ketkar", major: "Finance", pcClass: "Beta", role: "VP of Administration", hometown: "Norristown, PA", linkedin: "https://www.linkedin.com/in/gautam-ketkar" },
  { id: "josh-khodosh", name: "Josh Khodosh", major: "Finance", pcClass: "Beta", role: "Director of Recruitment", hometown: "Cliffside Park,NJ", linkedin: "https://www.linkedin.com/in/joshua-khodosh-1a71b1360" },
  { id: "kris-kimmel", name: "Kris Kimmel", major: "Accounting & Finance", pcClass: "Beta", role: "Director of Finance", hometown: "Cleveland, OH", linkedin: "https://www.linkedin.com/in/kris-kimmel-3a173795/" },
  { id: "sam-klosterman", name: "Sam Klosterman", major: "Undeclared", pcClass: "Alpha", hometown: "Columbus, OH", linkedin: "https://www.linkedin.com/in/sam-klosterman-6946b629b" },
  { id: "ayaan-kokate", name: "Ayaan Kokate", major: "Finance", pcClass: "Gamma", hometown: "Princeton, NJ", linkedin: "https://www.linkedin.com/in/ayaankokate/" },
  { id: "caden-kozak", name: "Caden Kozak", major: "Finance", pcClass: "Gamma", hometown: "Cleveland, OH", linkedin: "https://www.linkedin.com/in/caden-kozak-9a6414280/" },
  { id: "kirsten-krammer", name: "Kirsten Krammer", major: "Accounting", pcClass: "Alpha", hometown: "Palos Park, IL", linkedin: "https://www.linkedin.com/in/kirstenkrammer/" },
  { id: "victoria-krulig", name: "Victoria Krulig", major: "Strat. Comm.", pcClass: "Beta", role: "VP of Marketing", hometown: "Miami, FL", linkedin: "https://www.linkedin.com/in/victoria-krulig/" },
  { id: "jack-langhurst", name: "Jack Langhurst", major: "Accounting", pcClass: "Alpha", hometown: "Columbus, OH", linkedin: "https://www.linkedin.com/in/jack-langhurst-ba74b8349/" },
  { id: "riley-lavine", name: "Riley Lavine", major: "Strategic Communication", pcClass: "Alpha", hometown: "Cleveland, OH", linkedin: "https://www.linkedin.com/in/riley-lavine-5406b62a7/" },
  { id: "kevin-li", name: "Kevin Li", major: "Finance & Econ", pcClass: "Alpha", hometown: "Boston, MA", linkedin: "https://www.linkedin.com/in/kevinli14/" },
  { id: "george-limperis", name: "George Limperis", major: "Finance", pcClass: "Beta", hometown: "Chicago, IL", linkedin: "https://www.linkedin.com/in/george-limperis-gdl/" },
  { id: "blake-lloyd", name: "Blake Lloyd", major: "Finance", pcClass: "Beta", hometown: "Baltimore, MD", linkedin: "https://www.linkedin.com/in/blake-lloyd-358584325/" },
  { id: "nik-mahajan", name: "Nik Mahajan", major: "Finance", pcClass: "Alpha", role: "VP of Alumni Relations", hometown: "Cleveland, OH", linkedin: "https://www.linkedin.com/in/nikmahajan/" },
  { id: "michael-mani", name: "Michael Mani", major: "Finance", pcClass: "Gamma", hometown: "Glenview, IL", linkedin: "https://www.linkedin.com/in/michaelmani/" },
  { id: "nikki-maxon", name: "Nikki Maxon", major: "Finance and Real Estate", pcClass: "Alpha", hometown: "Rye Brook, NY", linkedin: "https://www.linkedin.com/in/nikki-b-maxon/" },
  { id: "trista-may", name: "Trista May", major: "Finance", pcClass: "Beta", hometown: "Berlin, CT", linkedin: "https://www.linkedin.com/in/trista-may-33090b32b/" },
  { id: "rishabh-mehta", name: "Rishabh Mehta", major: "Finance", pcClass: "Beta", role: "Director of Professional Development", hometown: "Cleveland, OH", linkedin: "https://www.linkedin.com/in/rishabh-mehta-ohio-state/" },
  { id: "isaac-merz", name: "Isaac Merz", major: "Operations Management", pcClass: "Beta", hometown: "Naperville, IL", linkedin: "https://www.linkedin.com/in/isaacmerz" },
  { id: "joey-mitsch", name: "Joey Mitsch", major: "Finance", pcClass: "Beta", role: "VP of Philanthropy", hometown: "Cincinnati, OH", linkedin: "https://www.linkedin.com/in/joeymitsch/" },
  { id: "max-moses", name: "Max Moses", major: "Health Sciences", pcClass: "Alpha", hometown: "Cleveland, OH", linkedin: "https://www.linkedin.com/in/max-moses-22836029b/" },
  { id: "chase-o-brien", name: "Chase O'Brien", major: "Undeclared", pcClass: "Alpha", hometown: "Columbus, OH", linkedin: "https://www.linkedin.com/in/chaseobrien86/" },
  { id: "kachi-onyia", name: "Kachi Onyia", major: "Marketing", pcClass: "Alpha", hometown: "Albuquerque, NM", linkedin: "https://www.linkedin.com/in/kachionyia/" },
  { id: "mateo-pattani", name: "Mateo Pattani", major: "Finance", pcClass: "Gamma", hometown: "Marin, CA", linkedin: "https://www.linkedin.com/in/mateo-pattani-922349379/" },
  { id: "aashish-prabakaran", name: "Aashish Prabakaran", major: "Finance / Economics", pcClass: "Alpha", role: "VP of Professional Development", hometown: "Columbus, OH", linkedin: "https://www.linkedin.com/in/aashish-prabakaran-858ba0216" },
  { id: "max-prunty", name: "Max Prunty", major: "Finance & Real Estate and Urban Analysis", pcClass: "Beta", role: "VP of Internal Events", hometown: "Tappan, NY", linkedin: "https://www.linkedin.com/in/max-prunty-279821351/" },
  { id: "jonathan-rawlings", name: "Jonathan Rawlings", major: "Finance", pcClass: "Gamma", hometown: "Columbus, OH", linkedin: "https://www.linkedin.com/in/jonathan-rawlings-424893339/" },
  { id: "ella-robinson", name: "Ella Robinson", major: "Industrial and Systems Engineering", pcClass: "Alpha", hometown: "Cleveland, OH", linkedin: "https://www.linkedin.com/in/ella-robinson-1a69b52b8/" },
  { id: "christine-rocco", name: "Christine Rocco", major: "Finance", pcClass: "Alpha", role: "VP of Membership", hometown: "Cleveland, OH", linkedin: "https://www.linkedin.com/in/christine-rocco" },
  { id: "jenna-ruether", name: "Jenna Ruether", major: "Accounting", pcClass: "Alpha", hometown: "Akron, OH", linkedin: "https://www.linkedin.com/in/jennaruether/" },
  { id: "joelle-sabbat", name: "Joelle Sabbat", major: "Marketing", pcClass: "Alpha", hometown: "Silver Spring, MD", linkedin: "https://www.linkedin.com/in/joelle-sabbat-30505824b/" },
  { id: "thomas-schwartz", name: "Thomas Schwartz", major: "Accounting", pcClass: "Beta", role: "Director of New Member Education", hometown: "Boston, MA", linkedin: "https://www.linkedin.com/in/thomas-schwartz-9550261b0/" },
  { id: "tanush-shankar", name: "Tanush Shankar", major: "Finance & Operations Management", pcClass: "Gamma", hometown: "Lewis Center, OH", linkedin: "https://www.linkedin.com/in/tanush-shankar/" },
  { id: "ryan-shelby", name: "Ryan Shelby", major: "Accounting", pcClass: "Alpha", hometown: "Park Ridge, IL", linkedin: "https://www.linkedin.com/in/ryan-shelby-8b2a16206/" },
  { id: "sana-shine", name: "Sana Shine", major: "Operations Management", pcClass: "Alpha", hometown: "Dallas, TX", linkedin: "https://www.linkedin.com/in/sana-shine/" },
  { id: "shreya-singh", name: "Shreya Singh", major: "Accounting", pcClass: "Beta", hometown: "Oklahoma City, OK", linkedin: "https://www.linkedin.com/in/shreyasingh0/" },
  { id: "charlie-slate", name: "Charlie Slate", major: "Marketing", pcClass: "Gamma", hometown: "Boston, MA", linkedin: "https://www.linkedin.com/in/charlesmslate/" },
  { id: "natalie-slezak", name: "Natalie Slezak", major: "Accounting", pcClass: "Beta", role: "Director of Fundraising", hometown: "North East, MD", linkedin: "https://www.linkedin.com/in/natalie-slezak-50a212396/" },
  { id: "connor-smith", name: "Connor Smith", major: "Finance", pcClass: "Gamma", hometown: "Cleveland, OH", linkedin: "https://www.linkedin.com/in/connor-smith-j/" },
  { id: "anna-snyder", name: "Anna Snyder", major: "Finance", pcClass: "Beta", hometown: "Pittsburgh, PA", linkedin: "https://www.linkedin.com/in/anna-snyder-300051354/" },
  { id: "colin-southworth", name: "Colin Southworth", major: "Finance & Accounting", pcClass: "Beta", role: "Director of Philanthropy", hometown: "Cleveland, OH", linkedin: "https://www.linkedin.com/in/colin-southworth/" },
  { id: "carter-spera", name: "Carter Spera", major: "Finance", pcClass: "Gamma", hometown: "Fairfax, VA", linkedin: "https://www.linkedin.com/in/carter-spera" },
  { id: "samara-stein", name: "Samara Stein", major: "Logistics & Operations", pcClass: "Alpha", hometown: "New Jersey", linkedin: "https://www.linkedin.com/in/samara-stein" },
  { id: "shagoon-subudhi", name: "Shagoon Subudhi", major: "Finance", pcClass: "Alpha", hometown: "Fremont, CA", linkedin: "https://www.linkedin.com/in/shagoon-subudhi/" },
  { id: "aleksandar-sudar", name: "Aleksandar Sudar", major: "Marketing", pcClass: "Gamma", hometown: "Tallmadge, OH", linkedin: "https://www.linkedin.com/in/aleksandarsudar/" },
  { id: "matthew-thompson", name: "Matthew Thompson", major: "Construction Systems Management", pcClass: "Gamma", hometown: "Brewster, NY", linkedin: "https://www.linkedin.com/in/matthew-thompson1/" },
  { id: "tisha-vasudeva", name: "Tisha Vasudeva", major: "Finance and Info Systems", pcClass: "Alpha", role: "Director of Corporate Sponsors", hometown: "Chicago, IL", linkedin: "https://www.linkedin.com/in/tishavasudeva/" },
  { id: "danny-vavas", name: "Danny Vavas", major: "Finance", pcClass: "Gamma", hometown: "Brooklyn, NY", linkedin: "https://www.linkedin.com/in/danielvavas/" },
  { id: "shritha-velaga", name: "Shritha Velaga", major: "Neuroscience and Economics", pcClass: "Gamma", hometown: "Princeton, NJ", linkedin: "https://www.linkedin.com/in/shrithavelaga" },
  { id: "alyssa-wickes", name: "Alyssa Wickes", major: "Marketing", pcClass: "Beta", role: "Director of Digital Marketing", hometown: "Columbus, OH", linkedin: "https://www.linkedin.com/in/alyssa-wickes/" },
  { id: "jino-yoon", name: "Jino Yoon", major: "Finance (Pre-Law)", pcClass: "Gamma", hometown: "Anaheim, CA", linkedin: "https://www.linkedin.com/in/jino-yoon/" },
  { id: "austyn-yunger", name: "Austyn Yunger", major: "Finance", pcClass: "Alpha", role: "Director of Recruitment", hometown: "Dayton, OH", linkedin: "https://www.linkedin.com/in/austynyunger/" },
];

for (const brother of brothers) {
  brother.photo = photoFor(brother.id);
}

// Several brothers list a combined major (e.g. "Accounting & Finance"). This maps each
// raw major string to the individual majors it should match against in filters, so
// selecting "Finance" also surfaces someone whose major field reads "Accounting & Finance".
// Formal compound program names (e.g. "Industrial & Systems Engineering") are left intact
// rather than split, since they're a single degree, not two majors joined together.
const MAJOR_TAGS: Record<string, string[]> = {
  "Accounting": ["Accounting"],
  "Accounting & Finance": ["Accounting", "Finance"],
  "Computer Science & Engineering": ["Computer Science & Engineering"],
  "Construction Systems Management": ["Construction Systems Management"],
  "Economics": ["Economics"],
  "Economics & Real Estate": ["Economics", "Real Estate"],
  "Finance": ["Finance"],
  "Finance & Accounting": ["Finance", "Accounting"],
  "Finance & Econ": ["Finance", "Economics"],
  "Finance & Operations Management": ["Finance", "Operations Management"],
  "Finance & Real Estate and Urban Analysis": ["Finance", "Real Estate"],
  "Finance (Pre-Law)": ["Finance", "Pre-Law"],
  "Finance / Economics": ["Finance", "Economics"],
  "Finance and Info Systems": ["Finance", "Information Systems"],
  "Health Sciences": ["Health Sciences"],
  "Hospitality Management": ["Hospitality Management"],
  "Industrial & Systems Engineering": ["Industrial & Systems Engineering"],
  "Industrial and Systems Engineering": ["Industrial & Systems Engineering"],
  "Logistics & Operations": ["Logistics & Operations"],
  "Marketing": ["Marketing"],
  "Marketing and Public Policy Analysis (Pre-Law)": ["Marketing", "Public Policy Analysis", "Pre-Law"],
  "Neuroscience and Economics": ["Neuroscience", "Economics"],
  "Operations Management": ["Operations Management"],
  "Pre-Law, Finance & PPE (Politics, Philosophy, Economics)": ["Pre-Law", "Finance", "PPE (Politics, Philosophy, Economics)"],
  "Strat. Comm.": ["Strategic Communication"],
  "Undeclared": ["Undeclared"],
};

export function majorTags(major: string): string[] {
  return MAJOR_TAGS[major] ?? [major];
}

export type RoleTier = "president" | "vp" | "director";

export function roleTier(role?: string): RoleTier | undefined {
  if (!role) return undefined;
  if (role === "President") return "president";
  if (role.startsWith("VP of")) return "vp";
  if (role.startsWith("Director")) return "director";
  return undefined;
}

export const FILTERS = {
  pcClasses: [...new Set(brothers.map((b) => b.pcClass))].sort(),
  majors: [...new Set(brothers.flatMap((b) => majorTags(b.major)))].sort(),
  roles: [
    "President", "VP of Administration", "VP of Finance", "VP of Membership",
    "VP of Professional Development", "VP of Alumni Relations",
    "VP of Internal Events", "VP of Philanthropy", "VP of Marketing",
  ] as const,
};
