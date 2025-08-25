import { motion } from "framer-motion";
import React from "react";
import { NavLink } from 'react-router-dom'
import styled from "styled-components";
import { Github, Work, Skills, About } from "../components/AllSvgs";
import { DarkTheme } from "../components/Themes";

const Icons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  bottom: 0;
  left: 2rem;

  z-index: 3;

  & > *:not(:last-child) {
    margin: 0.5rem 0;
  }
`;

const Line = styled(motion.span)`
  width: 2px;
  height: 8rem;
  background-color: ${(props) =>
    props.color === "dark" ? DarkTheme.text : DarkTheme.body};
`;

const Tooltip = styled.div`
  position: absolute;
  left: 2.5rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.5rem 1rem;
  background-color: ${(props) =>
    props.color === "dark" ? DarkTheme.text : DarkTheme.body};
  color: ${(props) =>
    props.color === "dark" ? DarkTheme.body : DarkTheme.text};
  font-size: 0.75rem;
  border-radius: 5px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;

  ${Icons} div:hover & {
    opacity: 1;
  }
`;
const IconWrapper = styled.div`
  position: relative; /* Ensures tooltip is positioned relative to the icon */
  display: flex;
  align-items: center;
`;

const SocialIcons = (props) => {
  return (
    <Icons>
      {/* Linkedin Link */}
      <IconWrapper>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 1.5, 1] }}
          transition={{ type: "spring", duration: 1, delay: 0.4 }}
        >
          <a
            style={{ color: "inherit" }}
            target="_blank"
            href={"https://www.linkedin.com/in/naveen-kumar-s-42a8b0314/"}
            rel="noreferrer noopener"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill={props.theme === "dark" ? DarkTheme.text : DarkTheme.body}
              viewBox="0 0 24 24"
            >
              <path d="M20.452 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.445-2.137 2.937v5.669H9.355V9h3.413v1.561h.049c.476-.899 1.637-1.848 3.368-1.848 3.599 0 4.266 2.368 4.266 5.455v6.284zM5.337 7.433a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM6.776 20.452H3.896V9h2.88v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          </a>
          <Tooltip color={props.theme}>LinkedIn</Tooltip>
        </motion.div>
      </IconWrapper>

      {/* Leetcode Link */}
      <IconWrapper>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 1.5, 1] }}
          transition={{ type: "spring", duration: 1, delay: 0.6 }}
        >
          <a
            style={{ color: "inherit" }}
            target="_blank"
            href={"https://leetcode.com/u/naveenkumar____/"}
            rel="noreferrer noopener"
          >
            <svg
              fill={props.theme === "dark" ? DarkTheme.text : DarkTheme.body}
              width={25}
              height={25}
              viewBox="0 0 24 24"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
            </svg>
          </a>
          <Tooltip color={props.theme}>LeetCode</Tooltip>
        </motion.div>
      </IconWrapper>

      <IconWrapper>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 1.5, 1] }}
          transition={{ type: "spring", duration: 1, delay: 0.8 }}
        >
          <a
            style={{ color: "inherit" }}
            target="_blank"
            href={"https://github.com/NaveenDeveloperR"}
            rel="noreferrer noopener"
          >
            <Github
              width={25}
              height={25}
              fill={props.theme === "dark" ? DarkTheme.text : DarkTheme.body}
            />
          </a>
          <Tooltip color={props.theme}>GitHub</Tooltip>
        </motion.div>
      </IconWrapper>
      {/* Work Page Link */}
      <IconWrapper>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 1.5, 1] }}
          transition={{ type: "spring", duration: 1, delay: 1 }}
        >
          <NavLink to="/work" style={{ color: "inherit" }}>
            <Work
              width={25}
              height={25}
              fill={props.theme === "dark" ? DarkTheme.text : DarkTheme.body}
            />
          </NavLink>
          <Tooltip color={props.theme}>Work</Tooltip>
        </motion.div>
      </IconWrapper>
      {/* Skills Page Link */}
      <IconWrapper>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 1.5, 1] }}
          transition={{ type: "spring", duration: 1, delay: 1.2 }}
        >
          <NavLink to="/skills" style={{ color: "inherit" }}>
            <Skills
              width={25}
              height={25}
              fill={props.theme === "dark" ? DarkTheme.text : DarkTheme.body}
            />
          </NavLink>
          <Tooltip color={props.theme}>Skills</Tooltip>
        </motion.div>
      </IconWrapper>
      {/* About Page Link */}
      <IconWrapper>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 1.5, 1] }}
          transition={{ type: "spring", duration: 1, delay: 1.4 }}
        >
          <NavLink to="/about" style={{ color: "inherit" }}>
            <About
              width={25}
              height={25}
              fill={props.theme === "dark" ? DarkTheme.text : DarkTheme.body}
            />
          </NavLink>
          <Tooltip color={props.theme}>About</Tooltip>
        </motion.div>
      </IconWrapper>

      <Line
        color={props.theme}
        initial={{
          height: 0,
        }}
        animate={{
          height: "8rem",
        }}
        transition={{
          type: "spring",
          duration: 1,
          delay: 0.7,
        }}
      />
    </Icons>
  );
};

export default SocialIcons;
