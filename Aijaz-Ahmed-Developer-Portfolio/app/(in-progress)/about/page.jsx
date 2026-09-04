import { Contact, Navbar, Transition } from '@/layout';

export const metadata = { title: 'About', description: 'About Aijaz Ahmed, full-stack developer from Karachi.' };

const skills = ['React & TypeScript', 'ASP.NET Core & C#', 'SQL Server & EF Core', 'AI assistants & RAG', 'Docker & Kubernetes', 'Cloud architecture', 'REST APIs & security', 'UI engineering'];

export default function About() {
  return (
    <Transition>
      <Navbar />
      <main className='container pb-32 pt-40'>
        <p className='mb-6 uppercase tracking-[0.25em] text-muted-foreground'>About Aijaz</p>
        <h1 className='max-w-6xl text-[clamp(3.4rem,9vw,9rem)] leading-[0.96]'>Developer by craft. Builder by nature.</h1>
        <section className='my-28 grid gap-12 border-t pt-12 lg:grid-cols-2'>
          <h2 className='text-3xl'>The short version</h2>
          <div className='space-y-6 text-xl leading-relaxed text-muted-foreground'>
            <p>I’m a BS Computer Science student at Air University Karachi and a full-stack developer focused on software that solves real operational problems.</p>
            <p>My work spans enterprise inventory systems, AI-powered interfaces and an ambitious multi-region cloud platform. I care about polished experiences, clear architecture and code that teams can maintain.</p>
          </div>
        </section>
        <section className='grid gap-12 border-t pt-12 lg:grid-cols-2'>
          <h2 className='text-3xl'>Capabilities</h2>
          <div className='grid sm:grid-cols-2'>
            {skills.map((skill, index) => <div key={skill} className='border-b py-5 text-lg'><span className='mr-4 text-sm text-muted-foreground'>0{index + 1}</span>{skill}</div>)}
          </div>
        </section>
      </main>
      <Contact />
    </Transition>
  );
}
