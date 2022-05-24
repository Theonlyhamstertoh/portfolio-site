export default function SkillTag({ skillName }) {
  return (
    <div>
      <img src={`/icons/${skillName}.svg`} alt={skillName} />
      <span>{skillName}</span>
    </div>
  );
}
