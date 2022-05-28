import { useState } from "react";

export default function SkillTag({ skillName }) {
  const [image, setImage] = useState(true);

  async function set(path) {}
  return (
    <span className="skillTag">
      {image && (
        <img
          className="skillIcon"
          src={`/icons/${skillName}.svg`}
          onError={() => setImage(false)}
          alt={skillName}
        />
      )}
      <span>{skillName}</span>
    </span>
  );
}
