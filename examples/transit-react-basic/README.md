# transit-react-basic

This is an example of running a `transfer` transaction via Transit wallet providers (currently works via `AlgoSigner Chrome plugin` only).

### AlgoSigner-Config

The demo is configured to connect to the Algo Test network. 

In order to interact with the demo, you'll need to:    
A. Have AlgoSigner installed    
B. Add the Algorand sample account xxx added to AlgoSigner.   

#### A. Have Scatter Desktop installed   

Can be downloaded here:  https://github.com/PureStake/algosigner/

#### B. Add the sample account xxx to AlgoSigner.   

1. ...

That it you should be ready to test http://demo.eostransit.io

## Developer Quick start

### Prerequisites

Make sure you have [`yarn`](https://yarnpkg.com) installed.

### Setup

1.  Install the dependencies.
   
    **Note** that before `eos-transit-stub-provider` and other plug-ins are published, they are managed by `lerna` along with packages themselves. That means, before running the examples, `lerna` should wire up all the dependencies and instead of running `yarn install` manually from this folder, the following commands should be run from the project root:

        $ yarn bootstrap
        $ yarn build-packages

    This will make `lerna` install all the necessary dependencies.

2.  Start the development server with (from this example folder root this time):

        $ yarn start

3.  Access the server at [`localhost:3300`](http://localhost:3300) (or whatever `PORT` you configured to run the development server for `create-react-app`).
