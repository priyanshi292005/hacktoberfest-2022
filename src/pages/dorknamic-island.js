import styled, { keyframes } from 'styled-components';
import { useEffect } from 'react';

const loadAnimation = () => keyframes`
  from {
    transform: translateY(-200px);
  }
  to {
    transform: translateY(0);
  }
`;

const flickerAnimation = () => keyframes`
  0% {
    opacity: 1;
  }
  18% {
    opacity: 1;
  }
  19% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  96% {
    opacity: 1;
  }
  97% {
    opacity: 0;
  }
  98% {
    opacity: 1;
  }
`;

const textAnimation = () => keyframes`
  25% {
    content: "";
  }
  50% {
    content: ".";
  }
  75% {
    content: "..";
  }
  100% {
    content: "...";
  }
`;

const StyledDiv = styled.div`
  --bez: cubic-bezier(0.5, 0, 0.5, 1.5);
  --bez2: cubic-bezier(0.9, -0.5, 0.2, 1.5);
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 120px;
  z-index: 10;
  padding: 0 64px;
  pointer-events: none;
  transition: all 0.5s var(--bez);
  transform: translateY(-200px);
  animation: ${loadAnimation} 1.25s 0.2s var(--bez2) forwards;

  @media (max-width: 600px) {
    padding: 0 24px;
  }

  .island {
    background: #0e0318;
    width: 200px;
    border-radius: 100px;
    box-shadow: ${(props) => props.theme.glowLite};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 4px 4px 12px;
    pointer-events: all;
    transition: all 0.2s ease;

    .hex {
      animation: ${flickerAnimation} 3s infinite;
      filter: ${(props) => props.theme.glowLiteDS};
    }

    .init {
      width: 68px;
      user-select: none;

      &:after {
        content: '...';
        animation: ${textAnimation} 2s linear infinite;
      }
    }

    #nav {
      display: none;
      visibility: none;
      width: 100%;
      height: 0;
      gap: 24px;
      flex-flow: row wrap;
      opacity: 0;
      transition: all 0.2s ease;
      transition-property: opacity, visibility;

      a {
        transition: opacity 0.2s ease;

        &:hover {
          text-shadow: ${(props) => props.theme.glowLite};
        }
      }
    }

    .shutter {
      width: 40px;
      height: 40px;
      background: black;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      @media (max-width: 600px) {
        align-self: flex-start;
      }

      .lens {
        width: 24px;
        height: 24px;
        border-radius: inherit;
        background: #0e0318;
        position: relative;
        overflow: hidden;

        &:before {
          content: '';
          background: #5ef5ff;
          width: 12px;
          height: 8px;
          border-radius: inherit;
          position: absolute;
          top: -5px;
          left: 4px;
          opacity: 0.8;
          filter: blur(3px);
        }

        &:after {
          content: '';
          background: #ffab5e;
          width: 16px;
          height: 12px;
          border-radius: inherit;
          position: absolute;
          bottom: -5px;
          left: 4px;
          opacity: 0.5;
          filter: blur(3px);
        }
      }
    }
  }
`;

const DorknamicIsland = (props) => {
  useEffect(() => {
    const scrollTrigger = () => {
      const island = document.querySelector('.island');
      const init = document.querySelector('.init');
      const hex = document.querySelector('.hex');
      const wrapper = document.getElementById('wrapper');
      const nav = document.getElementById('nav');

      if (window.scrollY > 100 && window.innerWidth > 600) {
        island.style.borderRadius = '16px';
        wrapper.style.top = '40px';
        wrapper.style.bottom = 'auto';
        island.style.width = '1312px';
        island.style.padding = '16px 24px';
        hex.style.display = 'none';
        init.style.display = 'none';
        nav.style.display = 'flex';
        nav.style.display = 'flex';
        setTimeout(() => {
          nav.style.opacity = '1';
          nav.style.height = 'max-content';
          nav.style.visibility = 'visible';
        }, '200');
      } else if (window.scrollY < 100 && window.innerWidth > 600) {
        island.style.borderRadius = '100px';
        wrapper.style.top = '120px';
        wrapper.style.bottom = 'auto';
        island.style.width = '200px';
        island.style.padding = '4px 4px 4px 12px';
        hex.style.display = 'block';
        init.style.display = 'block';
        nav.style.opacity = '0';
        nav.style.visibility = 'hidden';
        nav.style.display = 'none';
        nav.style.height = '0';
      } else {
        wrapper.style.top = 'auto';
        wrapper.style.bottom = '40px';
      }
    };
    scrollTrigger();

    window.addEventListener('scroll', scrollTrigger);
    window.addEventListener('resize', scrollTrigger);

    return () => window.removeEventListener('scroll', scrollTrigger);
  }, []);

  return (
    <StyledDiv id="wrapper">
      <div className="island">
        <svg
          width="24"
          height="22"
          viewBox="0 0 24 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hex"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.83961 20.0323C6.9791 20.1043 7.13588 20.1437 7.29827 20.1437L16.7017 20.1437C17.059 20.1437 17.3891 19.9531 17.5677 19.6437L22.2694 11.5001C22.4481 11.1907 22.4481 10.8095 22.2694 10.5001L17.5677 2.35644C17.4706 2.18814 17.3286 2.05499 17.1617 1.96855L6.83961 20.0323ZM5.56622 1.85645C5.92349 1.23764 6.58374 0.856445 7.29827 0.856445H16.7017C17.4162 0.856445 18.0765 1.23764 18.4338 1.85644L23.1355 10.0001C23.4927 10.6189 23.4927 11.3812 23.1355 12.0001L18.4338 20.1437C18.0765 20.7625 17.4162 21.1437 16.7017 21.1437H7.29827C6.58374 21.1437 5.92349 20.7625 5.56622 20.1437L0.864507 12.0001C0.507241 11.3812 0.507241 10.6189 0.864507 10.0001L5.56622 1.85645Z"
            fill="currentColor"
          />
        </svg>
        <p className="init">Init</p>
        <nav id="nav">{props.children}</nav>
        <div className="shutter">
          <div className="lens" />
        </div>
      </div>
    </StyledDiv>
  );
};

export default DorknamicIsland;
