PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash

# ============================================================
# 开发命令
# ============================================================

list:
	$(info Available targets:)
	$(info )
	@LC_ALL=C $(MAKE) -pRrq -f $(firstword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/(^|\n)# Files(\n|$$)/,/(^|\n)# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | grep -E -v -e '^[^[:alnum:]]' -e '^$@$$'

install:
	pnpm install

clean:
	pnpm run clean

build:
	pnpm run build

rebuild: clean build

server:
	pnpm run server

s: clean server

lint:
	pnpm run lint

lint-fix:
	pnpm run lint:fix

test:
	pnpm run test

# ============================================================
# 内容创建
# ============================================================

slug :=
title :=

check-slug-and-title:
ifndef slug
	$(error slug is not set, use `make note slug=slug title=title`)
endif
ifndef title
	$(error title is not set, use `make note slug=slug title=title`)
endif

note: check-slug-and-title
	hexo new note -p "../notes/$(slug)/index.md" "$(title)"

post: check-slug-and-title
	hexo new post -p "$(shell date '+%Y')/$(slug)" "$(title)"

coding: check-slug-and-title
	hexo new coding -p "../coding/$(slug)/index.md" "$(title)"

# ============================================================
# 内容维护
# ============================================================

frontmatter:
	node tools/fill-frontmatter.js

images:
	node tools/optimize-images.js

# ============================================================
# 质量检查
# ============================================================

check: lint test
	@echo "✅ 质量检查通过"

.PHONY: list install clean build rebuild server s lint lint-fix test note post coding check-slug-and-title frontmatter images check
