# Multi Task Manager API

This application is a multitask manager API. It allows you to create, update, delete and list projects and tasks. 
It also allows you to register and authenticate. It's also a part of the Bolttech Developer Challenge.

## Getting Started
You must have installed on your machine:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/downloads)

### Installing
Clone the repository:
```bash
git clone https://github.com/ikarolaborda/multi-task-manager.git
```

Enter the project folder:
```bash
cd multi-task-manager
```

Run the Makefile:
```bash
make build
```

Run the Sequelize migrations:
```bash
make migrate
```

### Documentation
The documentation is available at [http://localhost:3050/api-docs](http://localhost:3000/api-docs), after the application is running, just access it from your preferred Internet browser.