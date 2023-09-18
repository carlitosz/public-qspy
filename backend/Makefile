# Pretty colors
COLOR_GREEN=\033[0;32m
COLOR_RED=\033[0;31m
COLOR_BLUE=\033[0;34m
COLOR_END=\033[0m

.PHONY: deploy-development
deploy-development: #! Deploys backend to AWS
	@echo "$(COLOR_GREEN)Deploying $(COLOR_BLUE)DEVELOPMENT$(COLOR_GREEN) infrastructure...$(COLOR_END)"
	@echo "\n$(COLOR_GREEN)Clearing cache...$(COLOR_END)"
	rm -rf .aws-sam
	@echo "\n$(COLOR_GREEN)Building...$(COLOR_END)"
	sam build
	@echo "\n$(COLOR_GREEN)Deploying...$(COLOR_END)"
	sam deploy --config-env development

.PHONY: sync-development
sync-development: #! Syncs lambda function code without deploying. *ONLY USE ON DEVELOPMENT*
	@echo "$(COLOR_GREEN)Running $(COLOR_RED)SYNC$(COLOR_GREEN) on lambda code...$(COLOR_END)"
	@echo "\n$(COLOR_GREEN)Syncing...$(COLOR_END)"
	sam sync --code --config-env development

.PHONY: deploy-production
deploy-production: #! Deploys backend to AWS
	@echo "$(COLOR_GREEN)Deploying $(COLOR_RED)PRODUCTION$(COLOR_GREEN) infrastructure...$(COLOR_END)"
	@echo "\n$(COLOR_GREEN)Clearing cache...$(COLOR_END)"
	rm -rf .aws-sam
	@echo "\n$(COLOR_GREEN)Building...$(COLOR_END)"
	sam build
	@echo "\n$(COLOR_GREEN)Deploying...$(COLOR_END)"
	sam deploy --config-env production

.PHONY: test
test: #! Runs Jest test suite
	@echo "$(COLOR_GREEN)Running backend tests...$(COLOR_END)\n"
	npm run tsc && npm run jest

.PHONY: test-watch
test-watch: #! Watches for file changes when writing tests
	@echo "$(COLOR_GREEN)Test watch mode starting...$(COLOR_END)\n"
	npm run jest:watch
