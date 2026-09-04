const timeline = [
  { period: '2026 — Present', place: 'EFU General Insurance', role: 'Software Engineering Intern', detail: 'Designing and developing an enterprise IT inventory platform and its AI-assisted workflows.' },
  { period: '2025 — Present', place: 'Air University Karachi', role: 'BS Computer Science', detail: 'Building a strong foundation in software engineering, systems, algorithms and collaborative leadership.' },
];

export function Experience() {
  return <section className='bg-[#eef0f4] py-24 md:py-36'><div className='container'><div className='grid gap-10 border-t border-black/20 pt-7 lg:grid-cols-[1fr_2fr]'><p className='text-xs uppercase tracking-[0.22em] text-muted-foreground'>04 / Experience</p><div><h2 className='mb-16 text-[clamp(3rem,6vw,6rem)] leading-none tracking-[-0.04em]'>Learning by building.</h2>{timeline.map(item => <article key={item.place} className='grid gap-4 border-t border-black/15 py-8 md:grid-cols-[1fr_1.2fr_2fr]'><p className='text-sm text-muted-foreground'>{item.period}</p><div><h3 className='text-xl'>{item.place}</h3><p className='mt-1 text-sm text-muted-foreground'>{item.role}</p></div><p className='leading-relaxed text-muted-foreground'>{item.detail}</p></article>)}</div></div></div></section>;
}
