const { default: styled } = require('styled-components');

export const Wrapper = styled.div`
    height: 100vh;
    overflow: hidden;
    display: flex;
`;

export const MainContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export const PageContainer = styled.div`
    flex: 1;
    padding-left: 6px;
    padding-top: 4px;
    overflow: hidden;
    display: flex;
    background-color: rgb(226 232 240);
`;
