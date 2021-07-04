# Authenticating with Doctl

```zsh
doctl auth init
```

# Get connetiong info for our new cluster

```zsh
doctl kubernetes cluster kubeconfig save <cluster_name>
```

# List all contexts

```zsh
kubectl config view
```

# Use a different context

```zsh
kubectl config use-context <context_name>
```
