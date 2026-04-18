import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';
import Row from './ui/Row';

// USING STYLED COMPONENTS
const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="vertical">
          <Row type="horizontal">
            <Heading as="h1">Hello World</Heading>

            <div>
              <Heading as="h2">Check in & Out</Heading>
              <Button onClick={() => alert('Check in')}>Check in</Button>
              <Button variation="secondary" onClick={() => alert('Check out')}>
                Check out
              </Button>
            </div>
          </Row>

          <Row type="vertical">
            <div>
              <Heading as="h3">Form</Heading>
              <Input type="number" placeholder="Number of guests"></Input>
            </div>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
