import Section from "./Section";

export default function ContactSection() {
  return (
    <Section title="" className="scrollContainer addMedMargin">
      <div className="flex-center flexCol addMedMargin yellow">
        <p>Reach out to me through email or social media</p>
        <h1 className="email">weibozhang50@gmail.com</h1>
        <div className="flex-center">
          <a target="_blank" href="https://github.com/Theonlyhamstertoh">
            <img src="/icons/github.svg" />
          </a>
          <a
            target="_blank"
            href="https://linkedin.com/in/weibozhang
  "
          >
            <img src="/icons/linkedin.svg" />
          </a>
        </div>
      </div>
    </Section>
  );
}
