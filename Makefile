# Pretty colors
COLOR_GREEN=\033[0;32m
COLOR_RED=\033[0;31m
COLOR_BLUE=\033[0;34m
COLOR_END=\033[0m

PREFIX ?= $(PWD)

.PHONY: build
build: #! Generate a production build of next
	@echo "$(COLOR_BLUE)Creating a production build ...$(COLOR_END)\n"
	cd $(PREFIX)/next && npm run build

.PHONY: dev
dev: #! Start a new development environment
	@echo "+ $@"
	cd $(PREFIX)/next && npm run dev

.PHONY: next-deps
next-deps: #! Initialize client dependencies
	@echo "$(COLOR_GREEN)Installing client-side deps...$(COLOR_END)\n"
	cd $(PREFIX)/next && npm i

.PHONY: function-deps
function-deps: #! Init function dependencies
	@echo "\n\n$(COLOR_GREEN)Installing function deps...$(COLOR_END)\n"
	cd $(PREFIX)/functions && npm i

.PHONY: deploy-development
deploy-development: #! Deploys backend to AWS
	@echo "$(COLOR_GREEN)Deploying $(COLOR_BLUE)DEVELOPMENT$(COLOR_GREEN) infrastructure...$(COLOR_END)"
	@echo "\n$(COLOR_GREEN)Clearing cache...$(COLOR_END)"
	cd $(PREFIX)/infrastructure && rm -rf .aws-sam
	@echo "\n$(COLOR_GREEN)Building...$(COLOR_END)"
	cd $(PREFIX)/infrastructure && sam build
	@echo "\n$(COLOR_GREEN)Deploying...$(COLOR_END)"
	cd $(PREFIX)/infrastructure && sam deploy --config-env development

.PHONY: sync-development
sync-development: #! Syncs lambda function code without deploying. *ONLY USE ON DEVELOPMENT*
	@echo "$(COLOR_GREEN)Running $(COLOR_RED)SYNC$(COLOR_GREEN) on lambda code...$(COLOR_END)"
	@echo "\n$(COLOR_GREEN)Syncing...$(COLOR_END)"
	cd $(PREFIX)/infrastructure && sam sync --code --config-env development

.PHONY: test
test: #! Run all tests
	@echo "+ $@"
	@echo "$(COLOR_GREEN)Running tsc ...$(COLOR_END)\n"
	cd $(PREFIX)/infrastructure && npm run tsc
	@echo "\n\n$(COLOR_GREEN)Running jest ...$(COLOR_END)\n"
	cd $(PREFIX)/infrastructure && npm run jest

.PHONY: test-watch
test-watch: #! Watches for file changes when writing tests
	@echo "$(COLOR_GREEN)Test watch mode starting...$(COLOR_END)\n"
	cd $(PREFIX)/infrastructure && npm run jest:watch
