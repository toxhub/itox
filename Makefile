
RELEASE_DIR    = out/release/
RELEASE_COPY   = bin config server

VERSION = $(shell cat package.json | awk -F '"' '/version" *: *"/{print $$4}')

PROJECT_NAME = $(shell cat package.json | awk -F '"' '/name" *: *"/{print $$4}')

package:
	@echo 'Copy files...'
	@npm run build
	@mkdir -p $(RELEASE_DIR)
	@if [ `echo $$OSTYPE | grep -c 'darwin'` -eq 1 ]; then \
		cp -r $(RELEASE_COPY) $(RELEASE_DIR); \
		rm -r $(RELEASE_DIR)server/public/; \
		mkdir $(RELEASE_DIR)server/public/; \
		cp -r dist $(RELEASE_DIR)server/public/${VERSION}; \
	else \
		cp -rL $(RELEASE_COPY) $(RELEASE_DIR); \
		rm -rL $(RELEASE_DIR)server/public/; \
		mkdir $(RELEASE_DIR)server/public; \
		cp -rL dist $(RELEASE_DIR)server/public/${VERSION}; \
	fi

	@cp package-lock.json $(RELEASE_DIR)
	@cp package.json $(RELEASE_DIR)
	@cp app.js $(RELEASE_DIR)
	@cp config/config_daily.js $(RELEASE_DIR)/config/config.js
	@cd $(RELEASE_DIR) && npm install --production --registry https://registry.npm.taobao.org
	@echo "all codes are in \"$(RELEASE_DIR)\""
	@mv $(RELEASE_DIR) out/${PROJECT_NAME}_${VERSION}
	@cd out && tar czf ${PROJECT_NAME}_${VERSION}.tgz ${PROJECT_NAME}_${VERSION}


install:
	@npm install --registry https://registry.npm.taobao.org

dev:
	@npm run dev

