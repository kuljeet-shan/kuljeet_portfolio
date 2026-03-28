import fs from "fs";
import path from "path";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

const projectRoot = path.resolve(process.cwd());
const pdfPath = path.join(projectRoot, "src", "assets", "CV_Kuljeet.pdf");
const outDir = path.join(projectRoot, "src", "content");

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const normalize = (s) => s.replace(/\r/g, "").replace(/\t/g, " ").trim();

const headingPatterns = [
  /^(education)\b/i,
  /^(experience|professional\s+experience|work\s+experience)\b/i,
  /^(research\s+interests|research\s+areas)\b/i,
  /^(publications|journal|conference|book\s+chapters)\b/i,
  /^(patents)\b/i,
  /^(awards|honors|achievements)\b/i,
  /^(talks|keynotes|invited\s+talks)\b/i,
  /^(teaching|courses)\b/i,
  /^(skills|technical\s+skills|professional\s+skills|domain\s+expertise)\b/i,
  /^(certifications)\b/i,
  /^(contact|contact\s+information|address)\b/i,
];

const detectHeading = (line) => headingPatterns.find((re) => re.test(line));

const parseSections = (text) => {
  const lines = normalize(text).split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const sections = {};
  let current = "misc";
  sections[current] = [];

  for (const line of lines) {
    const isHeading = detectHeading(line);
    if (isHeading) {
      const key = isHeading.exec(line)[1].toLowerCase().replace(/\s+/g, "_");
      current = key;
      if (!sections[current]) sections[current] = [];
      continue;
    }
    sections[current].push(line);
  }

  return sections;
};

const toStructured = (sections) => {
  const pickList = (key) => (sections[key] || []).map((s) => ({ text: s }));
  return {
    education: pickList("education"),
    experience: pickList("experience"),
    research_interests: pickList("research_interests") || pickList("research_areas"),
    publications: pickList("publications"),
    journals: pickList("journal"),
    conferences: pickList("conference"),
    book_chapters: pickList("book_chapters"),
    patents: pickList("patents"),
    awards: pickList("awards") || pickList("honors") || pickList("achievements"),
    talks: pickList("talks") || pickList("keynotes") || pickList("invited_talks"),
    teaching: pickList("teaching") || pickList("courses"),
    skills: pickList("skills") || pickList("technical_skills"),
    professional_skills: pickList("professional_skills"),
    domain_expertise: pickList("domain_expertise"),
    certifications: pickList("certifications"),
    contact: pickList("contact") || pickList("contact_information") || pickList("address"),
    misc: (sections["misc"] || []).map((s) => ({ text: s })),
  };
};

async function main() {
  if (!fs.existsSync(pdfPath)) {
    console.error("PDF not found:", pdfPath);
    process.exit(1);
  }
  ensureDir(outDir);
  const dataBuffer = fs.readFileSync(pdfPath);
  const uint8 = new Uint8Array(dataBuffer);
  const loadingTask = pdfjs.getDocument({ data: uint8, verbosity: pdfjs.VerbosityLevel.ERRORS });
  const doc = await loadingTask.promise;
  let combined = "";
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const textContent = await page.getTextContent({ includeMarkedContent: false, disableNormalization: false });
    const buf = [];
    let lastY;
    let lastX;
    for (const item of textContent.items) {
      if (!("str" in item)) continue;
      const tm = item.transform || item.transform;
      const x = tm[4];
      const y = tm[5];
      if (lastY !== undefined && Math.abs(lastY - y) > 12) buf.push("\n");
      if (lastX !== undefined && Math.abs(lastX - x) > 20) buf.push(" ");
      buf.push(item.str);
      if (item.hasEOL) buf.push("\n");
      lastX = x;
      lastY = y;
    }
    combined += buf.join("") + "\n\n";
    page.cleanup();
  }
  const fullText = normalize(combined);
  fs.writeFileSync(path.join(outDir, "cv_raw.txt"), fullText, "utf8");
  const sections = parseSections(fullText);
  const structured = toStructured(sections);
  fs.writeFileSync(
    path.join(outDir, "cv.json"),
    JSON.stringify({ fullText, sections: structured }, null, 2),
    "utf8",
  );
  console.log("Extracted to:", path.join(outDir, "cv.json"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
