import React from 'react';
import styled from 'styled-components';
import GitHubIcon from './../assets/github-mark.png';

const Container = styled.header`
  background-color: #24292e;
  padding: 0 10%;
  display: flex;
  height: 48px;

  justify-content: space-between;
  .title {
    color: white;
    line-height: 12px;
    font-weight: 600;
  }

  .github-link {
    line-height: 12px;
  }

  .icon {
    margin-top: 8px;
  }
`;

const HeaderComponent: React.FC<{}> = () => {
  return (
    <Container>
      <p className="title">Pull Request Viewer</p>
      <a
        href="https://github.com/hxrxchang/pr-list-viewer"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="icon" src={GitHubIcon} alt="GitHub Icon" />
      </a>
    </Container>
  );
};

export default HeaderComponent;
