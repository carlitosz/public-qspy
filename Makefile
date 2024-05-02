PREFIX ?= $(PWD)

.PHONY: build
build: #! Generate a production build of next
	@echo "Creating a production build ...\n"
	cd $(PREFIX)/next && npm run build

.PHONY: dev
dev: #! Start a dev environment
	@echo "+ $@"
	cd $(PREFIX)/next && npm run dev

.PHONY: config
config: #! Configure the application
	@echo "+ $@"
	@echo "Creating backend configuration files..."
	cd $(PREFIX)/infrastructure && cp template.yaml.dist template.yaml && cp samconfig.toml.dist samconfig.toml
	@echo "\n"

	@echo "Creating frontend configuration files..."
	cd $(PREFIX)/next && cp .env.dist .env

	@echo "Done."

.PHONY: deps
deps: #! Install all deps
	@echo "+ $@"
	@echo "Installing dependencies..."
	cd $(PREFIX) npm i && cd $(PREFIX)/infrastructure && npm i

.PHONY: frontend-deps
frontend-deps: #! Initialize frontend dependencies
	@echo "Installing client-side deps...\n"
	cd $(PREFIX)/next && npm i

.PHONY: backend-deps
backend-deps: #! Init backend dependencies
	@echo "\n\nInstalling function deps...\n"
	cd $(PREFIX)/infrastructure && npm i

.PHONY: deploy-development
deploy-development: #! Deploys backend to AWS
	@echo "Deploying DEVELOPMENT infrastructure..."
	@echo "\nClearing cache..."
	cd $(PREFIX)/infrastructure && rm -rf .aws-sam
	@echo "\nBuilding..."
	cd $(PREFIX)/infrastructure && sam build
	@echo "\nDeploying..."
	cd $(PREFIX)/infrastructure && sam deploy --config-env development

.PHONY: backend-tests
backend-tests: #! Run backend tests
	@echo "+ $@"
	@echo "Running tsc ...\n"
	cd $(PREFIX)/infrastructure && npm run tsc
	@echo "\nRunning Jest ...\n"
	cd $(PREFIX)/infrastructure && npm run jest

.PHONY: frontend-tests
frontend-tests: #! Run frontend tests
	@echo "+ $@"
	@echo "Running tsc ...\n"
	cd $(PREFIX)/next && npm run tsc
	@echo "\nRunning Jest ...\n"
	cd $(PREFIX)/next && npm run jest

.PHONY: watch
watch: #! Enter Jest watch mode
	@echo "+ $@"
	@echo "Entering watch mode ...\n"
	cd $(PREFIX)/next && npm run jest:watch

.PHONY: test
test: #! Run all tests
	@echo "+ $@"
	@make backend-tests
	@make frontend-tests
