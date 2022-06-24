## `git` Large File Storage (`lfs`) ##

### Setup ###

```bash
git rev-parse --show-toplevel || git init .

git lfs install
git lfs track "*.pdf"
git add --force .gitattributes
```
