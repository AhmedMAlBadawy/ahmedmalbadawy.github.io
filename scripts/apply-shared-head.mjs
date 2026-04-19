import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, "..");

const SITE = "https://solutionsxe.org";

const metaByFile = {
  "index.html": {
    desc: "Solutions-XE — intelligent software products, enterprise delivery, and AI-ready platforms for healthcare, retail, and more.",
    ogTitle: "Solutions-XE | Intelligent Software Products",
  },
  "services.html": {
    desc: "Enterprise services for digital transformation, product engineering, cloud, data & AI, and team augmentation.",
    ogTitle: "Solutions-XE | Services",
  },
  "case-studies.html": {
    desc: "Case studies and delivery highlights: modernization, analytics, healthcare, and logistics outcomes.",
    ogTitle: "Solutions-XE | Case Studies",
  },
  "insights.html": {
    desc: "Insights on enterprise modernization, AI-ready products, and delivery governance at scale.",
    ogTitle: "Solutions-XE | Insights",
  },
  "about.html": {
    desc: "About Solutions-XE — mission, vision, and how we partner with enterprises and growth-stage teams.",
    ogTitle: "Solutions-XE | About",
  },
  "contact.html": {
    desc: "Contact Solutions-XE to discuss your next product, transformation program, or engagement model.",
    ogTitle: "Solutions-XE | Contact",
  },
  "medical-tourism-platform.html": {
    desc: "Smart Medical Tourism Platform — AI-first operating backbone for international medical travel and care journeys.",
    ogTitle: "Solutions-XE | Smart Medical Tourism Platform",
  },
  "curax.html": {
    desc: "CuraX — Medical AI Assistant and secure workspace for healthcare operations with an embedded assistant.",
    ogTitle: "Solutions-XE | CuraX Medical AI Assistant",
  },
};

const navByFile = {
  "index.html": `      <nav class="nav" aria-label="primary">
        <button class="menu-close" type="button" aria-label="close menu">×</button>
        <a class="active" href="index.html">Home</a>
        <a href="services.html">Services</a>
        <a href="products.html">Products</a>
        <a href="case-studies.html">Case Studies</a>
        <a href="insights.html">Insights</a>
        <a href="about.html">About</a>
        <a class="cta" href="contact.html">Contact</a>
      </nav>`,
  "services.html": `      <nav class="nav" aria-label="primary">
        <button class="menu-close" type="button" aria-label="close menu">×</button>
        <a href="index.html">Home</a>
        <a class="active" href="services.html">Services</a>
        <a href="products.html">Products</a>
        <a href="case-studies.html">Case Studies</a>
        <a href="insights.html">Insights</a>
        <a href="about.html">About</a>
        <a class="cta" href="contact.html">Contact</a>
      </nav>`,
  "case-studies.html": `      <nav class="nav" aria-label="primary">
        <button class="menu-close" type="button" aria-label="close menu">×</button>
        <a href="index.html">Home</a>
        <a href="services.html">Services</a>
        <a href="products.html">Products</a>
        <a class="active" href="case-studies.html">Case Studies</a>
        <a href="insights.html">Insights</a>
        <a href="about.html">About</a>
        <a class="cta" href="contact.html">Contact</a>
      </nav>`,
  "insights.html": `      <nav class="nav" aria-label="primary">
        <button class="menu-close" type="button" aria-label="close menu">×</button>
        <a href="index.html">Home</a>
        <a href="services.html">Services</a>
        <a href="products.html">Products</a>
        <a href="case-studies.html">Case Studies</a>
        <a class="active" href="insights.html">Insights</a>
        <a href="about.html">About</a>
        <a class="cta" href="contact.html">Contact</a>
      </nav>`,
  "about.html": `      <nav class="nav" aria-label="primary">
        <button class="menu-close" type="button" aria-label="close menu">×</button>
        <a href="index.html">Home</a>
        <a href="services.html">Services</a>
        <a href="products.html">Products</a>
        <a href="case-studies.html">Case Studies</a>
        <a href="insights.html">Insights</a>
        <a class="active" href="about.html">About</a>
        <a class="cta" href="contact.html">Contact</a>
      </nav>`,
  "contact.html": `      <nav class="nav" aria-label="primary">
        <button class="menu-close" type="button" aria-label="close menu">×</button>
        <a href="index.html">Home</a>
        <a href="services.html">Services</a>
        <a href="products.html">Products</a>
        <a href="case-studies.html">Case Studies</a>
        <a href="insights.html">Insights</a>
        <a href="about.html">About</a>
        <a class="cta active" href="contact.html">Contact</a>
      </nav>`,
  "medical-tourism-platform.html": `      <nav class="nav" aria-label="primary">
        <button class="menu-close" type="button" aria-label="close menu">×</button>
        <a href="index.html">Home</a>
        <a href="services.html">Services</a>
        <a class="active" href="products.html">Products</a>
        <a href="case-studies.html">Case Studies</a>
        <a href="insights.html">Insights</a>
        <a href="about.html">About</a>
        <a class="cta" href="contact.html">Contact</a>
      </nav>`,
  "curax.html": `      <nav class="nav" aria-label="primary">
        <button class="menu-close" type="button" aria-label="close menu">×</button>
        <a href="index.html">Home</a>
        <a href="services.html">Services</a>
        <a class="active" href="products.html">Products</a>
        <a href="case-studies.html">Case Studies</a>
        <a href="insights.html">Insights</a>
        <a href="about.html">About</a>
        <a class="cta" href="contact.html">Contact</a>
      </nav>`,
};

function headExtras(file) {
  const m = metaByFile[file];
  if (!m) throw new Error("no meta for " + file);
  const url = `${SITE}/${file}`;
  return `  <link rel="stylesheet" href="assets/css/site.css?v=3" />
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml" />
  <meta name="theme-color" content="#1f2b47" />
  <meta name="description" content="${m.desc.replace(/"/g, "&quot;")}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${m.ogTitle.replace(/"/g, "&quot;")}" />
  <meta property="og:description" content="${m.desc.replace(/"/g, "&quot;")}" />
  <meta property="og:url" content="${url}" />
`;
}

function processFile(file) {
  const fp = path.join(base, file);
  if (!fs.existsSync(fp)) {
    console.warn("skip missing", file);
    return;
  }
  let html = fs.readFileSync(fp, "utf8");
  if (!navByFile[file]) return;
  if (html.includes("assets/css/site.css")) {
    html = html.replace(
      /<nav class="nav" aria-label="primary">[\s\S]*?<\/nav>/,
      navByFile[file]
    );
  } else {
    html = html.replace(/<style>[\s\S]*?<\/style>\s*/, "");
    html = html.replace(/^\s*<link rel="stylesheet" href="assets\/css\/site\.css"[\s\S]*?<meta property="og:url"[^>]*\/>\s*/m, "");
    html = html.replace(
      /(<link href="https:\/\/fonts\.googleapis\.com\/css2[^>]+\/>)\s*/,
      `$1\n${headExtras(file)}`
    );
    html = html.replace(
      /<nav class="nav" aria-label="primary">[\s\S]*?<\/nav>/,
      navByFile[file]
    );
  }
  fs.writeFileSync(fp, html, "utf8");
  console.log("updated", file);
}

const files = Object.keys(navByFile);
for (const f of files) {
  processFile(f);
}
