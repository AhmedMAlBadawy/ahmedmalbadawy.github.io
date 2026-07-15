import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, "..");

const SITE = "https://solutionsxe.org";

const FONT_LINK =
  '  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet" />';

const metaByFile = {
  "index.html": {
    desc: "Solutions-XE — AI products and digital transformation for Egypt, the GCC, and Europe. Intelligence, engineered in every direction.",
    ogTitle: "Solutions-XE | Intelligence, engineered in every direction",
  },
  "services.html": {
    desc: "Enterprise services for digital transformation, product engineering, cloud, data & AI, and team augmentation.",
    ogTitle: "Solutions-XE | Services",
  },
  "products.html": {
    desc: "Explore Solutions-XE products: CuraX Medical AI Assistant and the Smart Medical Tourism Platform.",
    ogTitle: "Solutions-XE | Products",
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

function navFor(active) {
  const link = (href, label, key) => {
    if (key === "contact") {
      const cls = active === "contact" ? "btn primary active" : "btn primary";
      return `        <a class="${cls}" href="contact.html">Talk to us</a>`;
    }
    const cls = active === key ? ' class="active"' : "";
    return `        <a${cls} href="${href}">${label}</a>`;
  };

  return `      <nav class="nav" aria-label="primary">
        <button class="menu-close" type="button" aria-label="Close menu">×</button>
${link("index.html", "Home", "home")}
${link("services.html", "Services", "services")}
${link("products.html", "Products", "products")}
${link("case-studies.html", "Case Studies", "case-studies")}
${link("insights.html", "Insights", "insights")}
${link("about.html", "About", "about")}
${link("contact.html", "Talk to us", "contact")}
      </nav>`;
}

const navByFile = {
  "index.html": navFor("home"),
  "services.html": navFor("services"),
  "products.html": navFor("products"),
  "case-studies.html": navFor("case-studies"),
  "insights.html": navFor("insights"),
  "about.html": navFor("about"),
  "contact.html": navFor("contact"),
  "medical-tourism-platform.html": navFor("products"),
  "curax.html": navFor("products"),
};

function headExtras(file) {
  const m = metaByFile[file];
  if (!m) throw new Error("no meta for " + file);
  const url = `${SITE}/${file}`;
  return `${FONT_LINK}
  <link rel="stylesheet" href="assets/css/site.css?v=5" />
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

  html = html.replace(
    /<nav class="nav" aria-label="primary">[\s\S]*?<\/nav>/,
    navByFile[file]
  );

  if (!html.includes("assets/js/site.js")) {
    html = html.replace(
      /<\/body>/,
      '  <script src="assets/js/site.js" defer></script>\n</body>'
    );
  }

  fs.writeFileSync(fp, html, "utf8");
  console.log("updated", file);
}

const files = Object.keys(navByFile);
for (const f of files) {
  processFile(f);
}
