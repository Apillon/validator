set -e
npm run build
npm run generate
cd dist
echo 'validator.authtrail.com' > CNAME
git init
git add -A
git commit -m "Deploy validator"
git push -f git@github.com:AuthTrail/Validator master:gh-pages
cd -
echo 'Deployment complete to: https://validator.authtrail.com'