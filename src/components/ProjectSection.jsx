import { a, config, useTransition } from "@react-spring/web";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import projects from "../js/projects_data";
import SkillTag from "./SkillTag";
import * as THREE from "three";
import { Image } from "@react-three/drei";
export default function ProjectSection({ children }) {
  return (
    <section className="scrollContainer">
      <div className="flex">
        <h1>FEATURED PROJECTS</h1>
        <img className="line" src="/icons/long line.svg" />
      </div>
      {/* Map through every project and display them */}
      {projects.map((project, i) => (
        <div key={`${project.title}-${i}`} className="projectSection">
          {/* Project images */}
          <ProjectImage project={project} />
          {/* Container for project information */}
          <ProjectInfoContainer project={project} i={i} />
        </div>
      ))}
    </section>
  );
}

function ProjectImage({ project }) {
  return (
    <img
      src={project.photoUrl}
      className="projectImage"
      // onPointerOver={over}
      // onPointerOut={out}
    />
  );
}

function ProjectInfoContainer({ project, i }) {
  return (
    <div className={`projectInfo ${i % 2 !== 0 ? "switchSide" : ""}`}>
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
