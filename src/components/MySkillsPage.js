import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { lightTheme } from './Themes';
import { Ai, Develope } from './AllSvgs';
import { motion } from 'framer-motion';

import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/SocialIcons';
import PowerButton from '../subComponents/PowerButton';
import ParticleComponent from '../subComponents/ParticleComponent';
import BigTitle from '../subComponents/BigTitlte'

const Box = styled(motion.div)`
background-color: ${props => props.theme.body};
width: 100vw;
height:100vh;
position: relative;
display: flex;
justify-content: space-evenly;
align-items: center;


`

const Main = styled.div`
border: 2px solid ${props => props.theme.text};
color: ${props => props.theme.text};
background-color: ${props => props.theme.body};
padding: 2rem;
width: 30vw;
height: 60vh;
z-index:3;
line-height: 1.5;
cursor: pointer;

font-family: 'Ubuntu Mono',monospace;
display: flex;
flex-direction: column;
justify-content: space-between;

&:hover{
    color: ${props => props.theme.body};
    background-color: ${props => props.theme.text};
}
`

const Title = styled.h2`
display: flex;
justify-content: center;
align-items: center;
font-size: calc(1em + 1vw);

${Main}:hover &{
    &>*{
        fill:${props => props.theme.body};
    }
}

&>*:first-child{
margin-right: 1rem;
}
`

const Description = styled.div`
color: ${props => props.theme.text};
font-size: calc(0.6em + 1vw);
padding: 0.5rem 0;


${Main}:hover &{
   
        color:${props => props.theme.body};
    
}

strong{
    margin-bottom: 1rem;
    text-transform: uppercase;
}
ul,p{
    margin-left: 2rem;
}
`

const MySkillsPage = () => {
    return (
        <ThemeProvider theme={lightTheme}>
            <Box
                initial={{ opacity: 0, y: 50 }} // Start with faded and below view
                animate={{ opacity: 1, y: 0 }} // Fade in and move to normal position
                transition={{ duration: 1 }} // Smooth transition timing
                exit={{
                    opacity: 0, transition: { duration: 0.5 }
                  }}
            >

                <LogoComponent theme='light' />
                <SocialIcons theme='light' />
                <PowerButton />
                <ParticleComponent theme='light' />
                <Main>
                    <Title>
                        <Ai width={40} height={40} /> AI/ML Enthusiast
                    </Title>
                    <Description>
                        I love to build smart systems that learn and improve over time.
                    </Description>
                    <Description>
                        <strong>I like to work with</strong>
                        <ul>
                            <li>
                                Machine Learning Models
                            </li>
                            <li>
                                AI Applications
                            </li>
                        </ul>
                    </Description>
                    <Description>
                        <strong>Tools</strong>
                        <ul>
                            <li>
                                TensorFlow
                            </li>
                            <li>Scikit-learn</li>
                            <li>Vertex AI (GOOGLE)</li>

                        </ul>
                    </Description>

                </Main>
                <Main>
                    <Title>
                        <Develope width={40} height={40} /> Full Stack Developer
                    </Title>
                    <Description>
                       I value personal and professional growth; therefore, I seek out projects that challenge me while allowing me to engage with new technologies.
                    </Description>
                    <Description>
                        <strong>Skills</strong>
                        <p>
                            Html, Css, Js, React, Express.js, Flutter,Flask etc.
                        </p>
                    </Description>
                    <Description>
                        <strong>Tools</strong>
                        <p>
                            VScode, Github, Firebase etc.
                        </p>
                    </Description>

                </Main>

                <BigTitle text="SKILLS" top="80%" right="30%" />

            </Box>

        </ThemeProvider>

    )
}

export default MySkillsPage
