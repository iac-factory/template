```bash
git push --set-upstream https://github.com/iac-factory/$(git rev-parse --show-toplevel | xargs basename).git $(git rev-parse --abbrev-ref HEAD)
```
