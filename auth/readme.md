# Auth Routes

| Route                  | Method | Body                                | Purpose                         |
| ---------------------- | ------ | ----------------------------------- | ------------------------------- | --- |
| /api/users/signup      | POST   | { email: string, password: string } | Sign up for an account          |     |
| /api/users/signin      | POST   | { email: string, password: string } | Sign in for an existing account |     |
| /api/users/signout     | POST   | {}                                  | Sign out                        |     |
| /api/users/currentuser | GET    | -                                   | Return info about the user      |     |
