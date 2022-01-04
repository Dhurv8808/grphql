import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!, $userName: String!, $password: String!) {
    createUser (name:$name, email:$email, userName:$userName, password:$password) {
      id,
      name,
      email
    }
  }
`;
