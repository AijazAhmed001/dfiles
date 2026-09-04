type Props = { number: string; title: string }

export default function SectionHeader({ number, title }: Props) {
  return (
    <div className="section-header">
      <span>{number}</span>
      <h2>{title}</h2>
    </div>
  )
}
