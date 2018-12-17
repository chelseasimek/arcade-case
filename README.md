# X-Arcade
a collection of simple html5 games created for lab-week Oct 2018

## Dependencies
`node` https://nodejs.org/en/download/

## Development
- `npm install`
- `npm run start` will open up `localhost:9000`

## Deployment
- `cf login -a https://api.g1.app.cloud.comcast.net`
- Org: `T+P UX`
- Space: `Labweek`
- `cf push x-arcade -b https://github.com/cloudfoundry/staticfile-buildpack`

