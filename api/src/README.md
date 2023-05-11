# Setting up tooling

Install [node version manager](https://github.com/nvm-sh/nvm) then set the default version of node to the latest lts

```
nvm install --lts
nvm use --lts
```

Finally install the depenancies with `npm install`

# Building The Project

```
npm install
npm run build
```

# Running Project

```
npm run start
```

# Local development

Since the `build` script lints, formats and builds the project it's often easiest to just run the project and skip all of that.

To do this we used `ts-node` which can be done by simply running

```
npm run local
```
