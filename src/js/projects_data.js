const projects = [
  {
    title: "STACKS",
    photoUrl: "project-showcase/stacks.png",
    // photos: [
    //   "https://user-images.githubusercontent.com/75579372/169952017-4c000e87-d55e-47d6-8e66-781a7c1cbd05.png",
    //   "https://user-images.githubusercontent.com/75579372/169952244-3508a488-5337-46ad-93eb-2671c7be74b8.png",
    //   "https://user-images.githubusercontent.com/75579372/169952191-2ca36cda-2d38-49a3-a67d-dbe1f544bb3c.png",
    // ],

    tools: ["react-three-fiber", "zustand", "threejs", "useCannon", "react"],
    githubUrl: "https://github.com/Theonlyhamstertoh/stacks",
    description:
      "Recreation of the hit mobile game, Stack, utilizing threejs and useCannon to bring 3D and collision physics into the web. This app uses Zustand for state managment and customed hooks to bring a immersive player experience",
    liveDemoUrl: "https://stacks-iota.vercel.app/",
  },
  {
    title: "Planet Cards",
    photoUrl: "project-showcase/planet-cards.png",

    // photos: [
    //   "https://user-images.githubusercontent.com/75579372/169951619-5b2e6dc6-def3-4468-9423-287c0c289693.png",
    //   "https://user-images.githubusercontent.com/75579372/169951713-e2c79566-644e-422b-9bab-931cdf92bc0d.png",
    //   "https://user-images.githubusercontent.com/75579372/169951915-85e73838-fae0-43b6-93c6-97fc5b0ba3cf.png",
    //   "https://user-images.githubusercontent.com/75579372/169951953-06d60ebc-1cbb-4e7a-af41-509b6f1c85ec.png",
    // ],
    tools: [
      "firebase",
      "react",
      "nextjs",
      "figma",
      "styled-components",
      "sass",
    ],
    githubUrl: "https://github.com/Theonlyhamstertoh/planet-cards",
    description:
      "A memory card app created for young children to build their attention and concentration skills while also exciting their curiosity early on for the wonders of planets and outer space. Integrated Google Firebase as backend database for real-time leaderboard and leverage NextJS React framework for static site generation",
    liveDemoUrl: "https://planet-cards.vercel.app/",
  },
  {
    title: "Weather App",
    photoUrl: "project-showcase/weather-app.png",
    // photos: [
    //   "https://user-images.githubusercontent.com/75579372/169952396-8e3a70f3-94c4-4c9b-bd4b-daea286604f4.png",
    //   "https://user-images.githubusercontent.com/75579372/169952444-0b6a7850-1152-4301-9103-d81bd60506d8.png",
    //   "https://user-images.githubusercontent.com/75579372/169952471-ee47c4c0-f4b3-41cc-a912-9db013f80cf1.png",
    // ],
    tools: ["adobe-xd", "webpack", "javascript", "sass", "open-weather-map"],
    githubUrl: "https://github.com/Theonlyhamstertoh/weatherapp",
    description:
      "A fully packed weather forecast that feature hour by hour weather reports in addition to any city and location by using OpenWeatherMap API with async/await and fetch",
    liveDemoUrl: "https://theonlyhamstertoh.github.io/weatherapp/",
  },
  {
    title: "3D Maze Runner ",
    photoUrl: "project-showcase/maze-runner.png",
    tools: [
      "threejs",
      "react-three-fiber",
      "react",
      "vite",
      "zustand",
      "useCannon",
    ],
    githubUrl: "https://github.com/Theonlyhamstertoh/maze-runner",
    description:
      "A 3D infinite maze runner where the player must move through the maze to find a flag that then generates a new maze. It is implemented with recursive backtrackin galgorithm, utilizing cannonJS and threeJS for physical collision and 3D.",
    liveDemoUrl: "https://maze-runner-theta.vercel.app/",
  },
];

export default projects;
