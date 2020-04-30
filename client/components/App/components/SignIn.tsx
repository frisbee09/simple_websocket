import * as React from "react";
import styled from "styled-components";

const SignInWrapper = styled.div`
  grid-column-start: span 2;
  grid-row-start: span 2;

  display: flex;
  flex-flow: column;

  justify-content: center;
  align-items: center;

  form {
    display: inherit;
    flex-flow: inherit;
    > * {
      margin: 5px;
    }
  }
`;

const SignIn: React.FC<{ register: (name: string) => void }> = ({
  register,
}) => {
  const [username, setUsername] = React.useState("");

  return (
    <SignInWrapper>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Enter Name:
          <input
            onKeyDown={(e) => {
              e.stopPropagation();
              e.key === "Enter" && register(username);
            }}
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            type="text"
          />
        </label>

        <button type="button" onClick={(e) => register(username)}>
          Submit
        </button>
      </form>
    </SignInWrapper>
  );
};

export default SignIn;
