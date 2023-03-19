import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { FaGithub } from 'react-icons/fa';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 650px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin: 20px 0 0;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Rais Ilham Nustara</h2>;
  const three = <h2 className="medium-heading">I build things for the android and web</h2>;
  const four = (
    <>
      <p>
        I am a third-year Information Systems student from Airlangga University, with interests in
        Machine Learning, Android development, and Web development. Currently, I am serving as a
        Full Stack Developer Intern at PT PLN (Persero)
      </p>
    </>
  );
  const five = (
    <a className="email-link" href="/resume.pdf" target="_blank" rel="noreferrer">
      Check out my Resume
    </a>
  );
  const six = (
    <a
      className="email-link"
      style={{ marginRight: '5px' }}
      href="https://github.com/raisilhamn"
      target="_blank"
      rel="noreferrer"
    >
      <FaGithub />
      Check out my GitHub
    </a>
  );

  const items = [one, two, three, four, five, six];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {items.slice(0, 4).map((item, i) => (
                  <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                    <div style={{ transitionDelay: `${i + 1}00ms`, marginRight: '1rem' }}>
                      {item}
                    </div>
                  </CSSTransition>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {items.slice(4, 6).map((item, i) => (
                  <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                    <div style={{ transitionDelay: `${i + 1}00ms`, marginLeft: '1rem' }}>
                      {item}
                    </div>
                  </CSSTransition>
                ))}
              </div>
            </div>
          )}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
