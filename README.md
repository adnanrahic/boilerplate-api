# Lightweight Node.js Boilerplate API

This is a lightweight Node.js boilerplate API with Docker support, test coverage and circle.ci support.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Clone to your local machine:
```
git clone https://github.com/adnanrahic/boilerplate-api.git
```

Change into the cloned dir:
```
cd boilerplate-api
```

Install required modules:
```
npm install
```

#### Natively
Run dev environment:
```
npm run dev
```

Run tests:
```
npm test
```

Run Istanbul/NYC test coverage report:
```
npm run integration
```

#### Docker
```
docker-compose up
```

### Prerequisites

To get up and running you can either install Docker and run the app in a container, or just run it natively. For Docker you need to install Docker and docker-compose.

To run natively, you need to install MongoDB and Node.js.

### Installing

#### Running natively

1. Install Node.js
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

sudo apt-get install -y nodejs
```

2. Install MongoDB
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6

echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list

sudo apt-get update

sudo apt-get install -y mongodb-org
```

3. Run MongoDB
```
sudo service mongod start
```
*If needed, stop MongoDB with*: `sudo service mongod stop`


#### Running with Docker

1. Install Docker
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

sudo apt-get update

sudo apt-get install -y docker-ce
```

2. Check if Docker is installed:
```
sudo systemctl status docker
```
Should be similar to:

##### Output
```
● docker.service - Docker Application Container Engine
   Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
   Active: active (running) since Sun 2016-05-01 06:53:52 CDT; 1 weeks 3 days ago
     Docs: https://docs.docker.com
 Main PID: 749 (docker)
```

3. Install Docker Compose

Choose the appropriate installation for your OS [here](https://docs.docker.com/compose/install/#install-compose).

#### For Linux
```
sudo curl -L https://github.com/docker/compose/releases/download/1.16.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

docker-compose --version
```

If you get the version returned back the installation was successful.



## Running the tests

Running the tests is simple. Just run:
```
npm test
```
This will start nodemon and run the tests every time you save a file.
This includes all the e2e tests and API tests which interact with the DB.

### Integration tests

These tests run against a test db which will be cleared before and after the tests are run.
For running the integration tests on every push we run:
```
npm run integration
```

This command is run by CircleCi.

## Deployment

On a VM:
- See Installation with [Docker](#running-with-docker).

On Heroku:
- Fork the repo and add it to your Heroku account. The Procfile is set up to run `npm start`.

## Built With

* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [Node.js](https://nodejs.org/en/) - JavaScript on the Server
* [MongoDB](https://www.mongodb.com/) - Building on the Best of Relational with the Innovations of NoSQL

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Integration testing

We use [CircleCi](https://circleci.com/) for integration testing. For the versions available, see the [their GitHub repo](https://github.com/circleci). 

## Authors

* [**Adnan Rahić**](https://github.com/adnanrahic) - *Initial work*
* [**Luka Pejović**](https://github.com/luka454) - *Initial work*

<!-- See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project. -->

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Mad props to [Luka Pejović](https://github.com/luka454) for helping me understand testing!