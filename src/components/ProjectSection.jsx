import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import projects from "../js/projects_data";
import SkillTag from "./SkillTag";
import Section from "./Section";
export default function ProjectSection({ children }) {
  return (
    <Section className="scrollContainer" title="FEATURED PROJECTS">
      {/* Map through every project and display them */}
      {projects.map((project, i, array) => (
        <div key={`${project.title}-${i}`}>
          <div className="projectSection">
            {/* Project images */}
            <img src={project.photoUrl} className="projectImage" />
            {/* Container for project information */}
            <ProjectInfoContainer project={project} i={i} />
          </div>
          {i !== projects.length - 1 && (
            <div style={{ textAlign: "center" }}>
              <img className="line" src="/icons/long line.svg" />
            </div>
          )}
        </div>
      ))}
    </Section>
  );
}

function ProjectInfoContainer({ project, i }) {
  const size = useThree((state) => state.size);

  return (
    <div
      className={`projectInfo ${
        size.width > 1000 && i % 2 !== 0 ? "switchSide" : ""
      }`}
    >
      <h2>{project.title}</h2>
      {/* Display skills/tools used in tags */}
      <div className="skillTagContainer">
        {project.tools.map((tool, i) => (
          <SkillTag skillName={tool} key={`${project.title}-${tool}-${i}`} />
        ))}
      </div>

      {/* Project description */}
      <div className="projectDescription">{project.description}</div>
      <ProjectCodeAndLiveButtons
        githubUrl={project.githubUrl}
        liveDemoUrl={project.liveDemoUrl}
      />
    </div>
  );
}

function ProjectCodeAndLiveButtons({ githubUrl, liveDemoUrl }) {
  return (
    <div className="flex-center buttonContainer ">
      <a href={githubUrl} target="_blank" className="secondaryButton">
        REVIEW CODE
      </a>
      <a href={liveDemoUrl} target="_blank" className="primaryButton">
        SEE IT LIVE
      </a>
    </div>
  );
}
