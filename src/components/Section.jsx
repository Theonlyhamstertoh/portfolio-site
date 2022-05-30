export default function Section({ children, title, className }) {
  return (
    <section className={className}>
      <div className="flex-center">
        <h1 className="yellow">{title}</h1>
        <img className="line" src="/icons/long line.svg" />
      </div>
      {children}
    </section>
  );
}
