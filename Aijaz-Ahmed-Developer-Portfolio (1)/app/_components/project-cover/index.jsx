const palettes = {
  emerald: 'from-[#19c78b] via-[#087b67] to-[#062b2b]',
  violet: 'from-[#8b5cf6] via-[#5130a6] to-[#20194f]',
  cyan: 'from-[#18bbed] via-[#0875a0] to-[#062a46]',
};

export function ProjectCover({ project, className = '' }) {
  return (
    <div className={`relative isolate overflow-hidden bg-gradient-to-br ${palettes[project.accent]} ${className}`}>
      <div className='absolute -right-16 -top-16 h-72 w-72 rounded-full border border-white/20' />
      <div className='absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/10' />
      <div className='absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:48px_48px]' />
      <div className='relative flex h-full flex-col justify-between p-6 text-white md:p-10'>
        <div className='flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/70'>
          <span>{project.type}</span><span>{project.year}</span>
        </div>
        <div>
          <p className='mb-3 text-sm text-white/65'>{project.status}</p>
          <h3 className='max-w-xl text-[clamp(2.2rem,4.5vw,5rem)] leading-[0.95]'>{project.title}</h3>
        </div>
      </div>
    </div>
  );
}
