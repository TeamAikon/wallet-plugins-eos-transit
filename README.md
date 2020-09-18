# Wallet plug-ins for oreid-js based on Eos Transit interface

This repo includes plug-ins for wallets to be used by oreid-js. The interface it uses conforms to the one developed for the eos-transit library. More information on building a package for Eos Transit here - **[`eos-transit` package docs](packages/eos-transit)**

A reference to building an eos-transit plugin is here: [Transit PLUGIN Developer Kit](/eosnewyork/eos-transit/tree/master/plugin-dev/transit-dev-simple) is a good place to start. 



## Packages

This is a monorepo that is managed with [`lerna`](https://github.com/lerna/lerna).  


| Package                                                                         | Version | Description                       |
|---------------------------------------------------------------------------------|---------|-----------------------------------|
| [`eos-transit-algosigner-provider`](packages/eos-transit-algosigner-provider)         | [![npm version](https://badge.fury.io/js/eos-transit-algosigner-provider.svg)](https://badge.fury.io/js/eos-transit-algosigner-provider)   | Wallet provider for [AlgorandSigner](https://github.com/PureStake/algosigner/) |


### Package development

1.  Make sure you have [`yarn`](https://yarnpkg.com) installed.

2.  Install the dependencies with

        $ yarn install
   
    **Note** that before `eos-transit-algosigner-provider` and `eos-transit-stub-provider` are published, they are managed by `lerna` along with packages themselves. That means, before running the examples, `lerna` should wire up all the dependencies and instead of running `yarn install` manually from this folder, the following commands should be run from the project root:

3.  Bootstrap the dependencies with

        $ yarn bootstrap

    This will make `lerna` install all the necessary dependencies for managed packages.

4.  Proceed with the development of a certain package (each package has its own set of commands to assist the development and build process).


### Builds

To build all packages simultaneously, run the following command from the project root:

        $ yarn build-packages

This will perform both TypeScript compilation into `lib` folder and a minified production-ready UMD build into `umd` folder for each managed package.


### Publishing

1. Make sure the current state of package folders is consistent and that packages which are about to be published are actually built (with `yarn build-packages`, see previous section). To make sure, you can run `yarn pack` command to create a `tgz` tarball of the package and inspect its contents (but make sure that doesn't leak to a published package, so cleanup that before publishing).

2. Make sure you're logged into `npm` registry by running [`yarn login`](https://yarnpkg.com/lang/en/docs/cli/login/). Please note that this won't ask you for a password (it will be asked upon publishing, since `yarn` doesn't maintain authenticated sessions with `npm` registry):

3. Since this monorepo is managed with `lerna`, the latter is responsible for publishing too, so run:

        $ lerna publish

    possibly proividing [additional options](https://github.com/lerna/lerna/tree/master/commands/publish) if needed.

    Normally, this should guide you through version bumping process as well as creating and pushing new `git` version tags for each package that had been published.
