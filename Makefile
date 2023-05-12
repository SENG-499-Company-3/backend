#!make

# ------------------------------------------------------------------------------
# Makefile -- Seng 499
# ------------------------------------------------------------------------------


api: | close build-api build-db run-api

##Build
build-api: ## Builds all backend+api containers
	@echo "==============================================="
	@echo "Make: build-api - building api images"
	@echo "==============================================="
	@docker-compose -f docker-compose.yml build api

build-db: ## Builds all db containers
	@echo "==============================================="
	@echo "Make: build-db - building db images"
	@echo "==============================================="
	@docker-compose -f docker-compose.yml build mongo_db

#Run
run-api: ## Runs all backend+api containers
	@echo "==============================================="
	@echo "Make: run-api - running api images"
	@echo "==============================================="
	@docker-compose -f docker-compose.yml up -d mongo_db api

##Logs
log-api: ## Runs `docker logs <container> -f` for the api container
	@echo "==============================================="
	@echo "Running docker logs for the api container"
	@echo "==============================================="
	@docker logs api -f

log-db: ## Runs `docker logs <container> -f` for the db container
	@echo "==============================================="
	@echo "Running docker logs for the db container"
	@echo "==============================================="
	@docker logs mongo_db -f

##Close and clean
close: ## Closes all project containers
	@echo "==============================================="
	@echo "Make: close - closing Docker containers"
	@echo "==============================================="
	@docker-compose -f docker-compose.yml down

clean: ## Closes and cleans (removes) all project containers
	@echo "==============================================="
	@echo "Make: clean - closing and cleaning Docker containers"
	@echo "==============================================="
	@docker-compose -f docker-compose.yml down -v --rmi all --remove-orphans