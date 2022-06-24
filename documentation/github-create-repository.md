```bash
git rev-parse --show-toplevel || git init .

git add --all

git lfs install
git lfs track "*.pdf"
git add --force .gitattributes

git commit --message "Initialization"

git push --set-upstream "https://github.com/iac-factory/$(git rev-parse --show-toplevel | xargs basename).git" "$(git rev-parse --abbrev-ref HEAD)"
```
