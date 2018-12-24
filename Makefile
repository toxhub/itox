TESTS          = $(sort $(shell find tests -type f -name "*.test.js"))
-BIN_MOCHA    := ./node_modules/.bin/_mocha
-BIN_NYC      := ./node_modules/.bin/nyc
-BIN_ESMINIFY := ./node_modules/.bin/esminify

RELEASE_DIR    = out/release/
RELEASE_COPY   = bin config server

VERSION = $(shell cat package.json | awk -F '"' '/version" *: *"/{print $$4}')

PROJECT_NAME = $(shell cat package.json | awk -F '"' '/name" *: *"/{print $$4}')

install:
	@npm install --production --registry http://registry.npm.taobao.org

test:
	NODE_ENV=test $(-BIN_MOCHA) -R spec -t 60000 --exit -r ./tests/env.js $(TESTS);

test-cov:
	$(-BIN_NYC) --reporter=lcov --reporter=text-summary $(-BIN_MOCHA) -R list -t 60000 --exit -r ./tests/env.js $(TESTS);
	@if [ `echo $$OSTYPE | grep -c 'darwin'` -eq 1 ]; then open coverage/lcov-report/index.html; fi

package: clean
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

package-prd: clean
	@echo 'Copy files...'
	@npm run build-cdn
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

tag:
	@cat package.json | xargs -0 node -p 'JSON.parse(process.argv[1]).version' | xargs git tag
	@git push origin --tags

eslint:
	@node_modules/.bin/eslint . --fix


clean:
	@echo 'Clean files...'
	@rm -rf ./out

.PHONY: install test-cov
