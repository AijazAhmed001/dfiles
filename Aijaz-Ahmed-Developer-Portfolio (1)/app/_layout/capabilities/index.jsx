const capabilities = [
  ['Frontend engineering', 'React, TypeScript, component architecture, responsive interfaces, accessibility and performance.'],
  ['Backend engineering', 'ASP.NET Core, REST APIs, authentication, authorization, EF Core and background services.'],
  ['AI systems', 'RAG pipelines, model integration, structured outputs, retrieval safety and streaming experiences.'],
  ['Cloud & platform', 'Docker, Kubernetes, distributed architecture, messaging, observability and deployment workflows.'],
];

export function Capabilities() {
  return <section className='container py-24 md:py-36'><div className='grid gap-10 border-t pt-7 lg:grid-cols-[1fr_2fr]'><p className='text-xs uppercase tracking-[0.22em] text-muted-foreground'>03 / Capabilities</p><div>{capabilities.map(([title, body], index) => <article key={title} className='grid gap-5 border-b py-8 md:grid-cols-[60px_1fr_1fr] md:items-start'><span className='text-sm text-muted-foreground'>0{index + 1}</span><h3 className='text-2xl'>{title}</h3><p className='leading-relaxed text-muted-foreground'>{body}</p></article>)}</div></div></section>;
}
