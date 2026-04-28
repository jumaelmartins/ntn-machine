import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';

const root = process.cwd();
const app = readFileSync(join(root, 'src/app/App.tsx'), 'utf8');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const robots = readFileSync(join(root, 'public/robots.txt'), 'utf8');
const sitemap = readFileSync(join(root, 'public/sitemap.xml'), 'utf8');

assert.match(html, /<html lang="pt-BR">/, 'HTML language should be Brazilian Portuguese');
assert.match(html, /<title>NTN MACHINE \| Automação, IA e sistemas sob medida<\/title>/, 'HTML title should be specific and branded');
assert.match(html, /name="description"/, 'HTML should include a meta description');
assert.match(html, /name="theme-color"/, 'HTML should include theme-color for mobile browsers');
assert.match(html, /property="og:title"/, 'HTML should include Open Graph metadata');
assert.match(html, /name="twitter:card"/, 'HTML should include Twitter card metadata');
assert.match(robots, /Sitemap: https:\/\/ntnmachine\.com\/sitemap\.xml/, 'Robots file should point search engines to the sitemap');
assert.match(sitemap, /https:\/\/ntnmachine\.com\/solucoes\/chatbots-ia/, 'Sitemap should include solution pages');

assert.match(app, /const whatsappNumber = '5571996575727'/, 'WhatsApp number should be normalized with Brazil country code');
assert.match(app, /const whatsappHref = `https:\/\/wa\.me\/\$\{whatsappNumber\}\?text=\$\{encodeURIComponent\(whatsappMessage\)\}`/, 'WhatsApp link should be generated with an encoded message');
assert.match(app, /const emailHref = `mailto:\$\{contactEmail\}/, 'Email should remain available as a secondary contact channel');
assert.match(app, /function buildWhatsAppHref\(message = whatsappMessage\)/, 'WhatsApp links should support contextual messages');
assert.match(app, /function trackConversionEvent\(/, 'Conversion actions should be tracked through a shared helper');
assert.match(app, /function updateDocumentMetadata\(/, 'SPA routes should update page metadata dynamically');
assert.match(app, /application\/ld\+json/, 'Site should expose structured data for search engines');
assert.doesNotMatch(app, /href="#"/, 'The page should not ship dead placeholder links');
assert.match(app, /href="#processo"/, 'Secondary hero CTA should point to the process section');
assert.doesNotMatch(app, /href=\{contactHref\}/, 'Primary CTAs should no longer use the old email contact link');
assert.ok((app.match(/href=\{(?:whatsappHref|buildWhatsAppHref\()/g) || []).length >= 7, 'Primary CTAs should use WhatsApp across landing, solution pages, footer, and floating button');
assert.ok((app.match(/buildWhatsAppHref/g) || []).length >= 8, 'Primary CTAs should use contextual WhatsApp messages');
assert.ok((app.match(/trackConversionEvent/g) || []).length >= 6, 'Key CTAs should emit conversion events');
assert.match(app, /Diagnóstico rápido pelo WhatsApp/, 'Landing should include a WhatsApp conversion section');
assert.match(app, /Mapeamos gargalos/, 'WhatsApp section should explain the first conversion step');
assert.match(app, /Estimamos impacto/, 'WhatsApp section should explain impact estimation');
assert.match(app, /Definimos o primeiro passo/, 'WhatsApp section should explain next-step planning');
assert.match(app, /function FloatingWhatsAppButton\(\)/, 'Site should include a reusable floating WhatsApp button');
assert.match(app, /aria-label="Falar com a NTN MACHINE pelo WhatsApp"/, 'Floating WhatsApp button should have an accessible label');
assert.match(app, /function DiagnosticGuidedSection\(\)/, 'Landing should include a guided diagnostic section');
assert.match(app, /Diagnóstico guiado de gargalos/, 'Diagnostic section should replace the calculator');
assert.match(app, /Qual é o principal gargalo da sua operação\?/, 'Diagnostic should ask the user to identify the bottleneck');
assert.match(app, /Solução recomendada/, 'Diagnostic should show a recommended solution');
assert.match(app, /Seu próximo passo/, 'Diagnostic should show an actionable next step');
assert.match(app, /diagnosticWhatsAppMessage/, 'Diagnostic CTA should build a contextual WhatsApp message');
assert.doesNotMatch(app, /function GargaloCalculator\(\)/, 'Old calculator should be removed');
assert.match(app, /diagnosticWhatsAppMessage =/, 'Diagnostic WhatsApp CTA should build message text from the selected bottleneck');
assert.match(app, /function SocialProofSection\(\)/, 'Landing should include proof and authority content');
assert.match(app, /Problemas que j/, 'Proof section should explain solved business problems');
assert.match(app, /function ProductizedOffersSection\(\)/, 'Landing should package services into clear offers');
assert.match(app, /Sprint de Automa/, 'Offers should include a fast automation sprint');
assert.match(app, /function FAQSection\(\)/, 'Landing should answer common objections before the final CTA');
assert.match(app, /Preciso trocar meus sistemas atuais/, 'FAQ should handle integration concerns');
assert.match(app, /const currentPath = window\.location\.pathname/, 'App should route solution URLs by pathname');
assert.match(app, /const selectedService = services\.find\(\(service\) => service\.href === currentPath\)/, 'Each solution URL should resolve to service data');
assert.match(app, /selectedService \? <SolutionPage service=\{selectedService\} \/> : <LandingPage \/>/, 'App should render either the solution page or the landing page');

assert.match(app, /text-4xl sm:text-5xl md:text-7xl/, 'Hero heading should scale down on mobile');
assert.match(app, /hidden lg:block/, 'Desktop service diagram should be hidden on smaller screens');
assert.match(app, /lg:hidden/, 'Mobile service cards should have a non-absolute fallback');

assert.match(app, /title: 'Chatbots & IA'[\s\S]*?lineEnd: \{ x: '50%', y: '11%' \}/, 'Chatbots line should end near the card center');
assert.match(app, /title: 'Agendamentos inteligentes'[\s\S]*?lineEnd: \{ x: '50%', y: '89%' \}/, 'Agendamentos line should end near the card center');
for (const slug of [
  'chatbots-ia',
  'sistemas-sob-medida',
  'controle-de-estoque',
  'agendamentos-inteligentes',
  'dashboards-relatorios',
  'automacoes-integracoes',
]) {
  assert.match(app, new RegExp(`href: '/solucoes/${slug}'`), `Service should expose /solucoes/${slug}`);
}
assert.match(app, /href=\{service\.href\}/, 'Service cards should link to their detail pages');
assert.match(app, /function SolutionPage\(\{ service \}: \{ service: Service \}\)/, 'Solution pages should share a reusable template');
assert.match(app, /Como funciona/, 'Solution pages should explain how the solution works');
assert.match(app, /O que entregamos/, 'Solution pages should list concrete deliverables');
assert.match(app, /Resultados que buscamos/, 'Solution pages should frame expected outcomes');
assert.match(app, /Oferta recomendada/, 'Solution pages should show a recommended offer');
assert.match(app, /service\.whatsappMessage/, 'Solution CTAs should use service-specific WhatsApp messages');
assert.match(app, /className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6"/, 'Solution header back link and badge should have clear spacing');
assert.match(app, /stroke=\{isVertical \? 'rgba\(59, 130, 246, 0\.82\)' : 'url\(#lineGradientDiagonal\)'\}/, 'Vertical logo lines should avoid a degenerate SVG gradient');
assert.match(app, /initial=\{\{ pathLength: 0, opacity: 0 \}\}/, 'Logo lines should animate from the logo instead of rendering fully drawn');
assert.match(app, /whileInView=\{\{ pathLength: 1, opacity: 1 \}\}/, 'Logo lines should finish drawing when the section enters the viewport');

assert.doesNotMatch(app, /rounded-full blur-\[/, 'Background should avoid decorative blurred orbs');

console.log('Site verification passed');
