import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthLayout from "./components/auth/AuthLayout";
import Button from "./components/auth/Button";
import Input from "./components/auth/Input";
import FormBox from "./components/auth/FormBox";
import BottomBox from "./components/auth/BottonBox";
import routes from "../routes";
import styled from "styled-components";
import { FatLink } from "./components/shared";
import PageTitle from "./components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 15px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $name: String
    $email: String!
    $location: String
    $githubUsername: String
    $password: String!
  ) {
    createAccount(
      username: $username
      name: $name
      email: $email
      location: $location
      githubUsername: $githubUsername
      password: $password
    ) {
      ok
      error
    }
  }
`;

function SignUp() {
  const history = useHistory();
  const onCompleted = (data) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return;
    }
    history.push(routes.Home, {
      message: "Account created, please log in",
      username,
      password,
    });
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, errors, formState, getValues } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see Photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: "Username is required.",
            })}
            name="username"
            type="text"
            placeholder="Username"
          />
          <Input ref={register} name="name" type="text" placeholder="Name" />
          <Input
            ref={register({
              required: "Email is required.",
            })}
            name="email"
            type="text"
            placeholder="Email"
          />
          <Input
            ref={register}
            name="location"
            type="text"
            placeholder="Location"
          />
          <Input
            ref={register}
            name="githubUsername"
            type="text"
            placeholder="Github Username"
          />
          <Input
            ref={register({
              required: "Password is required.",
            })}
            name="password"
            type="password"
            placeholder="Password"
          />
          <Button
            type="submit"
            value={loading ? "Loading" : "Sign up"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox
        cta={"Have an account?"}
        link={routes.Home}
        linkText={"Log in"}
      />
    </AuthLayout>
  );
}

export default SignUp;
