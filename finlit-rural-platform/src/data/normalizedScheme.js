import rawSchemes from "./govt_schemes.json";

export const normalizedSchemes = rawSchemes.map((s, index) => ({
  id: `${s.slug || "scheme"}-${index}`,   // guaranteed unique
  name: s.scheme_name,
  description: s.details,
  benefits: s.benefits,
  eligibility: s.eligibility,
  documents: s.documents,
  application: s.application,
  category: getCategory(s.schemeCategory),
  level: s.level
}));

function getCategory(text = "") {
  const t = text.toLowerCase();
  if (t.includes("agriculture") || t.includes("farmer")) return "farmer";
  if (t.includes("women")) return "women";
  if (t.includes("student") || t.includes("education")) return "student";
  if (t.includes("senior")) return "senior";
  if (t.includes("business") || t.includes("entrepreneur")) return "business";
  return "general";
}