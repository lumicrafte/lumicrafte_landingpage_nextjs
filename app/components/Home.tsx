import Link from 'next/link';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import CtaButton from './CtaButton';
import Reveal from './Reveal';
import { contactEmail, social } from '../../lib/site';

const KICKER = 'font-mono text-[10.5px] tracking-[0.2em] text-ink/66';
const H2 = 'font-bold text-[clamp(30px,4vw,50px)] leading-[1.04] tracking-[-0.04em] m-0';
const SECTION = 'border-b border-ink/10';
const SHELL = 'mx-auto max-w-[1280px] px-[26px] py-[84px]';

const services = [
  { n: 'S.01', swatch: '#4EC3F7', title: 'Product Design', body: 'Thoughtful UI/UX designed around real users, clear workflows, meaningful interactions, and visual refinement.' },
  { n: 'S.02', swatch: 'var(--accent)', title: 'Mobile Apps', body: 'Modern iOS and Android applications built for performance, reliability, and excellent user experiences.' },
  { n: 'S.03', swatch: '#C95AE8', title: 'Web Applications', body: 'Fast, responsive web applications designed with the polish and usability expected from modern digital products.' },
  { n: 'S.04', swatch: '#FF7A3D', title: 'Custom Software', body: 'Purpose-built software designed around specific business workflows, operational requirements, and real-world problems.' },
  { n: 'S.05', swatch: '#FFC233', title: 'Product Engineering', body: 'Strong technical foundations, architecture, APIs, integrations, and engineering practices designed for long-term evolution.' },
  { n: 'S.06', swatch: 'var(--ink)', title: 'Product Refinement', body: 'Improve an existing product through better UX, visual design, performance, architecture, and overall polish.' },
];

const stages = [
  { n: '01', bar: '#4EC3F7', title: 'Understand', body: 'Understand the problem, users, business objectives, and constraints.' },
  { n: '02', bar: 'var(--accent)', title: 'Shape', body: 'Turn ideas into clear product flows, interfaces, and technical direction.' },
  { n: '03', bar: '#C95AE8', title: 'Craft', body: 'Build the product with attention to detail, performance, maintainability, and reliability.' },
  { n: '04', bar: '#FFC233', title: 'Refine', body: 'Test, improve, polish, and continuously evolve the experience.' },
];

const work = [
  { slot: 'CASE STUDY 01 — PREVIEW', kicker: 'IN WRITE-UP', title: 'First case study', body: 'A full account of a shipped project: the problem, the product decisions, the technical approach, and the outcome.' },
  { slot: 'CASE STUDY 02 — PREVIEW', kicker: 'IN WRITE-UP', title: 'Second case study', body: 'Structured the same way, so each project can be read quickly or in depth. Added as work is cleared for publication.' },
];

const principles = [
  { title: 'Design matters', body: 'Every interaction should feel intentional.' },
  { title: 'Engineering matters', body: 'Beautiful software needs a strong foundation.' },
  { title: 'Usefulness matters', body: 'We build software to solve real problems, not simply fill screens.' },
  { title: 'Details matter', body: 'Small decisions compound into exceptional experiences.' },
  { title: 'Long-term thinking', body: 'Products should be built to evolve, not simply launch.' },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      {/* Hero */}
      <section id="top" className={`${SECTION} lc-grid-bg relative`}>
        <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-center gap-14 px-[26px] pt-[88px] pb-[76px]">
          <div>
            <div className="inline-flex items-center gap-[9px] rounded-full border border-ink/14 bg-paper px-[13px] py-[6px]">
              <span className="lc-spectrum h-2 w-2 rounded-full" />
              <span className="font-mono text-[10.5px] tracking-[0.2em]">
                SOFTWARE • DESIGN • CRAFT
              </span>
            </div>
            <h1 className="mt-6 mb-0 max-w-[14ch] text-[clamp(40px,6.6vw,82px)] leading-[0.98] font-bold tracking-[-0.045em] text-balance">
              Software crafted with precision.
            </h1>
            <p className="mt-[22px] max-w-[50ch] text-[17px] leading-[1.6] text-ink/68">
              Lumicrafte builds modern software products and custom digital solutions where
              thoughtful design, precise engineering, and exceptional user experience come
              together.
            </p>
            <div className="mt-8 flex flex-wrap gap-[11px]">
              <CtaButton className="rounded-[7px] bg-ink px-6 py-[14px] text-[14.5px] font-medium text-paper transition-[transform,background-color] duration-200 hover:-translate-y-[2px] hover:bg-accent hover:text-white" />
              <Link
                href="#products"
                className="rounded-[7px] border border-ink/18 bg-paper px-6 py-[14px] text-[14.5px] font-medium transition-colors duration-200 hover:border-ink"
              >
                Explore Our Products
              </Link>
            </div>
          </div>

          {/* Spec card */}
          <div className="relative border border-ink/14 bg-raised p-[22px]">
            <div className="absolute -top-px -left-px h-[9px] w-[9px] border-t border-l border-ink" />
            <div className="absolute -top-px -right-px h-[9px] w-[9px] border-t border-r border-ink" />
            <div className="absolute -bottom-px -left-px h-[9px] w-[9px] border-b border-l border-ink" />
            <div className="absolute -right-px -bottom-px h-[9px] w-[9px] border-r border-b border-ink" />
            <div className="flex justify-between font-mono text-[10px] tracking-[0.16em] text-ink/66">
              <span>FIG. 01 — LUMI × CRAFTE</span>
              <span>SPEC / 2026</span>
            </div>
            <div className="lc-rule relative mt-[18px] grid aspect-[4/3] place-items-center overflow-hidden border border-ink/10">
              <div className="aspect-square w-[44%] rounded-full bg-[radial-gradient(circle_at_34%_28%,#FFE08A,#FF9A2B_55%,#FF5A1F)]" />
              <div className="absolute inset-x-0 bottom-0 h-[34%] bg-[linear-gradient(96deg,#4EC3F7,#7C5CF0_44%,#C95AE8_74%,#FFC233)] opacity-90" />
            </div>
            <div className="mt-[18px] grid grid-cols-2 gap-[14px]">
              <div>
                <div className="font-mono text-[10px] tracking-[0.18em] text-ink/66">LUMI</div>
                <div className="mt-[5px] text-[14px] text-ink/80">Light, clarity, direction</div>
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-[0.18em] text-ink/66">CRAFTE</div>
                <div className="mt-[5px] text-[14px] text-ink/80">Precision, detail, care</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 01 — Brand */}
      <section id="story" className={SECTION}>
        <Reveal className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-14 px-[26px] py-[84px]">
          <div>
            <div className={KICKER}>01 / BRAND</div>
            <h2 className={`${H2} mt-4 max-w-[16ch]`}>Where clarity meets craftsmanship.</h2>
          </div>
          <p className="m-0 max-w-[58ch] text-[16.5px] leading-[1.7] text-ink/70">
            “Lumi” represents light — clarity, direction, and ideas brought into focus.
            “Crafte” represents the care behind the making — precision, detail, and thoughtful
            execution. Together, Lumicrafte represents our approach to software: bringing
            clarity to complex ideas and crafting them into experiences people enjoy using.
          </p>
        </Reveal>
      </section>

      {/* 02 — What we do */}
      <section className={`${SECTION} bg-raised`}>
        <Reveal className={SHELL}>
          <div className={KICKER}>02 / WHAT WE DO</div>
          <h2 className={`${H2} mt-4`}>From idea to experience.</h2>
          <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[22px]">
            <div className="rounded-[10px] border border-ink/14 bg-paper px-[26px] py-[30px]">
              <div className={KICKER}>OUR OWN</div>
              <h3 className="mt-3 mb-[10px] text-[25px] font-semibold tracking-[-0.03em]">
                Software Products
              </h3>
              <p className="m-0 text-[15px] leading-[1.65] text-ink/70">
                We create and operate our own software products designed to solve real problems
                and deliver genuinely useful experiences.
              </p>
            </div>
            <div className="rounded-[10px] border border-ink/14 bg-paper px-[26px] py-[30px]">
              <div className={KICKER}>FOR CLIENTS</div>
              <h3 className="mt-3 mb-[10px] text-[25px] font-semibold tracking-[-0.03em]">
                Software Services
              </h3>
              <p className="m-0 text-[15px] leading-[1.65] text-ink/70">
                We work with businesses, startups, and teams to design and build custom software
                tailored to their needs.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 03 — Services */}
      <section id="services" className={SECTION}>
        <Reveal className={SHELL}>
          <div className={KICKER}>03 / SERVICES</div>
          <h2 className={`${H2} mt-4 max-w-[18ch]`}>Software built around your needs.</h2>
          <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,290px),1fr))] gap-px overflow-hidden rounded-[10px] border border-ink/13 bg-ink/13">
            {services.map((service) => (
              <div
                key={service.n}
                className="bg-paper px-6 pt-7 pb-8 transition-colors duration-200 hover:bg-raised"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="h-[11px] w-[11px] rounded-[3px]"
                    style={{ background: service.swatch }}
                  />
                  <span className="font-mono text-[10px] tracking-[0.16em] text-ink/66">
                    {service.n}
                  </span>
                </div>
                <h3 className="mt-5 mb-[9px] text-[20px] font-semibold tracking-[-0.025em]">
                  {service.title}
                </h3>
                <p className="m-0 text-[14.5px] leading-[1.62] text-ink/66">{service.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 04 — Products */}
      <section id="products" className={`${SECTION} bg-raised`}>
        <Reveal className={SHELL}>
          <div className={KICKER}>04 / PRODUCTS</div>
          <h2 className={`${H2} mt-4`}>Products we’re crafting.</h2>
          <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] overflow-hidden rounded-[10px] border border-ink/14">
            <div className="px-[30px] py-[34px]">
              <p className="m-0 max-w-[44ch] text-[16.5px] leading-[1.68] text-ink/70">
                Our first product is in development. When it ships it will live here — with its
                category, platforms, and a real walkthrough. No placeholders in the meantime.
              </p>
              <CtaButton className="mt-6 inline-block border-b border-[rgba(109,75,224,0.5)] pb-[3px] font-mono text-[12px] tracking-[0.14em] hover:border-accent">
                GET NOTIFIED →
              </CtaButton>
            </div>
            <div className="lc-hatch grid min-h-[220px] place-items-center border-l border-ink/12 p-[22px]">
              <span className="text-center font-mono text-[10.5px] tracking-[0.18em] text-ink/66">
                PRODUCT ONE — IN DEVELOPMENT
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 05 — Approach */}
      <section id="approach" className={SECTION}>
        <Reveal className={SHELL}>
          <div className={KICKER}>05 / APPROACH</div>
          <h2 className={`${H2} mt-4 max-w-[20ch]`}>Thoughtful by design. Precise by nature.</h2>
          <ol className="mt-10 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-6 p-0">
            {stages.map((stage) => (
              <li key={stage.n}>
                <div className="h-[2px] rounded-[2px]" style={{ background: stage.bar }} />
                <div className="mt-[14px] font-mono text-[11px] tracking-[0.16em] text-ink/66">
                  {stage.n}
                </div>
                <h3 className="mt-[9px] mb-2 text-[21px] font-semibold tracking-[-0.025em]">
                  {stage.title}
                </h3>
                <p className="m-0 text-[14.5px] leading-[1.6] text-ink/65">{stage.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* 06 — Work */}
      <section id="work" className={`${SECTION} bg-raised`}>
        <Reveal className={SHELL}>
          <div className={KICKER}>06 / WORK</div>
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-6">
            <h2 className={H2}>Built with intention.</h2>
            <p className="m-0 max-w-[44ch] text-[14.5px] leading-[1.6] text-ink/60">
              Selected work, documented in full: the problem, the decisions, and what shipped.
              First case studies are being written up.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-[22px]">
            {work.map((item) => (
              <article
                key={item.slot}
                className="overflow-hidden rounded-xl border border-ink/14 bg-paper transition-[transform,box-shadow] duration-[220ms] hover:-translate-y-[3px] hover:shadow-[0_18px_40px_rgba(var(--ink-rgb),0.09)]"
              >
                <div className="lc-hatch grid aspect-[16/10] place-items-center border-b border-ink/12 p-5">
                  <span className="text-center font-mono text-[10.5px] tracking-[0.18em] text-ink/66">
                    {item.slot}
                  </span>
                </div>
                <div className="px-[22px] pt-6 pb-[26px]">
                  <div className="font-mono text-[10px] tracking-[0.18em] text-ink/66">
                    {item.kicker}
                  </div>
                  <h3 className="mt-3 mb-2 text-[21px] font-semibold tracking-[-0.03em]">
                    {item.title}
                  </h3>
                  <p className="m-0 text-[14.5px] leading-[1.62] text-ink/66">{item.body}</p>
                  <div className="mt-[18px] flex flex-wrap gap-2 font-mono text-[10px] tracking-[0.14em] text-ink/66">
                    {['PROBLEM', 'SOLUTION', 'OUTCOME'].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-ink/14 px-[10px] py-[5px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 07 — Why */}
      <section id="why" className={SECTION}>
        <Reveal className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-14 px-[26px] py-[84px]">
          <div>
            <div className={KICKER}>07 / WHY LUMICRAFTE</div>
            <h2 className={`${H2} mt-4 max-w-[14ch]`}>The details are the difference.</h2>
          </div>
          <dl className="m-0 flex flex-col border-t border-ink/13">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-[14px] border-b border-ink/13 px-[2px] py-5"
              >
                <dt className="m-0 text-[17px] font-semibold tracking-[-0.02em]">
                  {principle.title}
                </dt>
                <dd className="m-0 text-[15px] leading-[1.6] text-ink/66">{principle.body}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-invert-bg text-invert-ink">
        <Reveal className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-center gap-12 px-[26px] py-24">
          <div>
            <h2 className="m-0 max-w-[15ch] text-[clamp(32px,4.8vw,60px)] leading-[1.02] font-bold tracking-[-0.04em]">
              Have something worth building?
            </h2>
            <p className="mt-5 mb-0 max-w-[42ch] text-[16.5px] leading-[1.6] text-invert-ink/72">
              Tell us what you’re working on. We’ll take a look and get back to you.
            </p>
          </div>
          <div className="flex flex-col items-start gap-[14px]">
            <CtaButton className="rounded-[7px] bg-invert-ink px-7 py-[15px] text-[15px] font-medium text-invert-bg transition-transform duration-200 hover:-translate-y-[2px]">
              Start Your Project
            </CtaButton>
            <a
              href={`mailto:${contactEmail}`}
              className="border-b border-invert-ink/30 pb-[2px] font-mono text-[13px] tracking-[0.06em] text-invert-ink/80 hover:text-white"
            >
              {contactEmail}
            </a>
            <div className="mt-1 flex gap-[18px] text-[14px]">
              <a href={social.github} className="text-invert-ink/65 hover:text-white">
                GitHub
              </a>
              <a href={social.linkedin} className="text-invert-ink/65 hover:text-white">
                LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </>
  );
}
