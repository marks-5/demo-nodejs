# Sampleapp

Simple nodejs app, however this could be anything which can be built in a Docker container.

This folder is where the `Dockerfile` lives, and is referred to as the _Build Context_ during the Docker build process.

## `Dockerfile`

This is a text file that contains all the commands a user could call on the command line to assemble the application into a Docker Image.  The format of this file is a list of:

```Dockerfile
# comment
INSTRUCTION arguments
```

A full list of the available commands can be found [here](https://docs.docker.com/engine/reference/builder/), but a few of the most commonly used ones are listed below:

* `FROM`: This sets the Base Image for the build.  All subsequent commands are run on top of this image.  When choosing a base image, it is advisable to pick one from the list of Docker verified ones, available on the [Docker Store](https://store.docker.com/search?category=base&source=verified).
* `RUN`:  This runs the proceeding instruction in a shell.
* `COPY`:  This is used to add resources from the Docker Context folder (the one where the Dockerfile is located) into the container.
* `ENV`:  Used to set environment variables in the image.  Any variables set here will also be set when you run the container.
* `CMD`:  This the command to run when the container is started.  In essence it is the executable to use when running the container.  There can only be one of these instructions in the Dockerfile.

## `.dockerignore`

Much like a `.gitignore` file, this tells Docker to ignore any files reference in the list.  It makes sense to reference anything in your app folder that doesn't need to be in the resulting image in this file.

## Endpoints

The sampleapp exposes the following endpoints:

|   Query    |                       Description                        |
| ---------- | -------------------------------------------------------- |
| `/`        | sample message                                           |
| `/env`     | `APP_` environment variables. Useful to test deployments |
| `/foo/*`   | test endpoint                                            |
| `/bar`     | test endpoint                                            |
| `/metrics` | exposes metrics information                              |

## Metrics

All the requests below will be reflected on Grafana:
* `/ [200]`
* `/foo/hello [200]`
* `/bad/123 [error]`
