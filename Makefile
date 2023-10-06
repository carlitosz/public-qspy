# Pretty colors
COLOR_GREEN=\033[0;32m
COLOR_RED=\033[0;31m
COLOR_BLUE=\033[0;34m
COLOR_END=\033[0m

PREFIX ?= $(PWD)

.PHONY: deps
deps: #! Initialize dependencies
	@echo "$(COLOR_GREEN)Installing client-side deps...$(COLOR_END)\n"
	cd $(PREFIX)/qspy && npm i
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


.PHONY: dev
dev: #! Spin up dev environment
	@echo "$(COLOR_GREEN)Starting dev...$(COLOR_END)\n"
	cd $(PREFIX)/qspy && npm run dev

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
