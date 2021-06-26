# Ticketing app

Bulding microservices Ticketing app with express.js, TypeScript, MongoDB, Redis, Next.js, Docker, Kubernetes, NATS, and Scafford.

# Folder Detail

| Folder       | Detail                                                                        |
| ------------ | ----------------------------------------------------------------------------- |
| auth         | Service to handle signup/signin/signout                                       |
| client       | The client app (Next.js)                                                      |
| common       | The commmon service that used in every service and it's uploaded to npmjs.com |
| infra        | Kubernetes infrastucture for this application                                 |
| nats-test    | Testing to NATS Streaming Server                                              |
| tickets      | Ticket service                                                                |
| skaffold.yml | Skaffold configuration for this project                                       |

# Development with Google Cloud

1. Install Google Cloud SDK
2. Run `gcloud auth login`
3. Dont't forget to run `gcloud init `
4. Then run this code
   ```zsh
    gcloud container clusters get-credentials ticketing-dev
   ```
5. Install ingress nginx
6. `gcloud auth application-default login`
7. `skaffold dev`

# Creating a secret environment

```zsh
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
```

# Running skaffold

```zsh
skaffold dev --trigger polling
```
