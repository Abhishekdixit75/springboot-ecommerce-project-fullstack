# Variables
DOCKER_USERNAME=abhishekdixit75
IMAGE_NAME=sb-ecom-app
VERSION=latest

.PHONY: help build docker-build docker-up docker-down push clean

help:
	@echo "E-commerce Project Automation"
	@echo "----------------------------"
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  build         - Clean and package the Spring Boot JAR (skips tests for speed)"
	@echo "  test          - Run all backend tests"
	@echo "  docker-build  - Build the local Docker image"
	@echo "  docker-up     - Start the full stack with Docker Compose"
	@echo "  docker-down   - Stop and remove Docker containers"
	@echo "  push          - Build JAR, build image, tag, and push to Docker Hub"
	@echo "  clean         - Remove target folder and local Docker images"

build:
	mvnw clean package -DskipTests

test:
	mvnw test

docker-build:
	docker compose build

docker-up:
	docker compose up -d

docker-down:
	docker compose down

push: build
	docker build -t $(IMAGE_NAME) .
	docker tag $(IMAGE_NAME) $(DOCKER_USERNAME)/$(IMAGE_NAME):$(VERSION)
	docker push $(DOCKER_USERNAME)/$(IMAGE_NAME):$(VERSION)

clean:
	mvnw clean
	docker rmi $(IMAGE_NAME) || true
