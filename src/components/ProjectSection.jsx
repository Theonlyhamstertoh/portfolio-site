import React from "react";
import projects from "../js/projects_data";
import SkillTag from "./SkillTag";
export default function ProjectSection({ children }) {
  return (
    <section>
      <div className="flex">
        <h1>FEATURED PROJECTS</h1>
        <img className="line" src="/icons/long line.svg" />
      </div>
      {projects.map((project, i) => (
        <div className="projectSection">
          <img className="projectImage" src={project.photos[0]} />
          <img className="projectImage" src={project.photos[1]} />

          <div className="projectInfo" key={`${project.title}-${i}`}>
            <h2>{project.title}</h2>
            <div>
              {project.tools.map((tool, i) => (
                <SkillTag
                  skillName={tool}
                  key={`${project.title}-${tool}-${i}`}
                />
              ))}
            </div>
            <div>{project.description}</div>
          </div>
        </div>
      ))}
    </section>
  );
}
