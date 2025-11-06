.PHONY: build deploy clean ssh load-password backup

# SSH configuration (uses environment variables from ~/.profile)
SSH_HOST = $(IBRAHIM_SSH_HOST)
SSH_USER = $(IBRAHIM_SSH_USER)
REMOTE_PATH = /www/
LOCAL_BUILD = dist/
BACKUP_DIR = ../www-bck/

# Load SSH password from Keychain (cached per terminal session)
load-password:
	@if [ -z "$$IBRAHIM_SSH_PASS" ]; then \
		echo "🔐 Loading SSH password from Keychain (Touch ID required)..."; \
		export IBRAHIM_SSH_PASS=$$(security find-generic-password -a "$(SSH_HOST)" -s "ibrahim-ssh" -w 2>/dev/null); \
		if [ -z "$$IBRAHIM_SSH_PASS" ]; then \
			echo "❌ Password not found in Keychain."; \
			echo ""; \
			echo "📝 To store your password securely, run:"; \
			echo "   security add-generic-password -a '$(SSH_HOST)' -s 'ibrahim-ssh' -w"; \
			echo ""; \
			exit 1; \
		fi; \
		echo "✅ Password loaded and cached for this terminal session!"; \
		echo ""; \
	fi

# Build the production version
build:
	@echo "Building production version..."
	@export NVM_DIR="$$HOME/.nvm"; \
	[ -s "$$NVM_DIR/nvm.sh" ] && . "$$NVM_DIR/nvm.sh"; \
	nvm use 22 && \
	echo "Using Node version: $$(node --version)" && \
	npm run build

# Deploy to server
deploy: build
	@echo "Deploying to $(SSH_USER)@$(SSH_HOST)..."
	@if [ -z "$$IBRAHIM_SSH_PASS" ]; then \
		echo "🔐 Loading SSH password from Keychain (Touch ID required)..."; \
		IBRAHIM_SSH_PASS=$$(security find-generic-password -a "$(SSH_HOST)" -s "ibrahim-ssh" -w 2>/dev/null); \
		if [ -z "$$IBRAHIM_SSH_PASS" ]; then \
			echo "❌ Password not found in Keychain."; \
			echo "📝 To store your password securely, run:"; \
			echo "   security add-generic-password -a '$(SSH_HOST)' -s 'ibrahim-ssh' -w"; \
			exit 1; \
		fi; \
		export IBRAHIM_SSH_PASS; \
	fi; \
	if command -v sshpass >/dev/null 2>&1; then \
		sshpass -p "$$IBRAHIM_SSH_PASS" rsync -avz --delete --exclude='music' --exclude='press_files' --exclude='press_material' --exclude='videos' --progress $(LOCAL_BUILD) $(SSH_USER)@$(SSH_HOST):$(REMOTE_PATH); \
	else \
		echo "⚠️  sshpass not installed. Install with: brew install hudochenkov/sshpass/sshpass"; \
		echo "Falling back to manual password entry..."; \
		rsync -avz --delete --exclude='music' --exclude='press_files' --exclude='press_material' --exclude='videos' --progress $(LOCAL_BUILD) $(SSH_USER)@$(SSH_HOST):$(REMOTE_PATH); \
	fi
	@echo "Deployment complete!"

# Deploy without rebuilding (use with caution)
deploy-only:
	@echo "Deploying existing build to $(SSH_USER)@$(SSH_HOST)..."
	@if [ -z "$$IBRAHIM_SSH_PASS" ]; then \
		echo "🔐 Loading SSH password from Keychain (Touch ID required)..."; \
		IBRAHIM_SSH_PASS=$$(security find-generic-password -a "$(SSH_HOST)" -s "ibrahim-ssh" -w 2>/dev/null); \
		if [ -z "$$IBRAHIM_SSH_PASS" ]; then \
			echo "❌ Password not found in Keychain."; \
			echo "📝 To store your password securely, run:"; \
			echo "   security add-generic-password -a '$(SSH_HOST)' -s 'ibrahim-ssh' -w"; \
			exit 1; \
		fi; \
		export IBRAHIM_SSH_PASS; \
	fi; \
	if command -v sshpass >/dev/null 2>&1; then \
		sshpass -p "$$IBRAHIM_SSH_PASS" rsync -avz --delete --exclude='music' --exclude='press_files' --exclude='press_material' --exclude='videos' --progress $(LOCAL_BUILD) $(SSH_USER)@$(SSH_HOST):$(REMOTE_PATH); \
	else \
		echo "⚠️  sshpass not installed. Install with: brew install hudochenkov/sshpass/sshpass"; \
		echo "Falling back to manual password entry..."; \
		rsync -avz --delete --exclude='music' --exclude='press_files' --exclude='press_material' --exclude='videos' --progress $(LOCAL_BUILD) $(SSH_USER)@$(SSH_HOST):$(REMOTE_PATH); \
	fi
	@echo "Deployment complete!"

# Clean build directory
clean:
	@echo "Cleaning build directory..."
	rm -rf $(LOCAL_BUILD)
	@echo "Clean complete!"

# Dry run to see what would be deployed
dry-run: build
	@echo "Performing dry run..."
	@if [ -z "$$IBRAHIM_SSH_PASS" ]; then \
		echo "🔐 Loading SSH password from Keychain (Touch ID required)..."; \
		IBRAHIM_SSH_PASS=$$(security find-generic-password -a "$(SSH_HOST)" -s "ibrahim-ssh" -w 2>/dev/null); \
		if [ -z "$$IBRAHIM_SSH_PASS" ]; then \
			echo "❌ Password not found in Keychain."; \
			echo "📝 To store your password securely, run:"; \
			echo "   security add-generic-password -a '$(SSH_HOST)' -s 'ibrahim-ssh' -w"; \
			exit 1; \
		fi; \
		export IBRAHIM_SSH_PASS; \
	fi; \
	if command -v sshpass >/dev/null 2>&1; then \
		sshpass -p "$$IBRAHIM_SSH_PASS" rsync -avz --delete --exclude='music' --exclude='press_files' --exclude='press_material' --exclude='videos' --dry-run --progress $(LOCAL_BUILD) $(SSH_USER)@$(SSH_HOST):$(REMOTE_PATH); \
	else \
		echo "⚠️  sshpass not installed. Install with: brew install hudochenkov/sshpass/sshpass"; \
		echo "Falling back to manual password entry..."; \
		rsync -avz --delete --exclude='music' --exclude='press_files' --exclude='press_material' --exclude='videos' --dry-run --progress $(LOCAL_BUILD) $(SSH_USER)@$(SSH_HOST):$(REMOTE_PATH); \
	fi

# SSH into the server
ssh:
	@echo "Connecting to $(SSH_USER)@$(SSH_HOST)..."
	@if [ -z "$$IBRAHIM_SSH_PASS" ]; then \
		echo "🔐 Loading SSH password from Keychain (Touch ID required)..."; \
		IBRAHIM_SSH_PASS=$$(security find-generic-password -a "$(SSH_HOST)" -s "ibrahim-ssh" -w 2>/dev/null); \
		if [ -z "$$IBRAHIM_SSH_PASS" ]; then \
			echo "❌ Password not found in Keychain."; \
			echo "📝 To store your password securely, run:"; \
			echo "   security add-generic-password -a '$(SSH_HOST)' -s 'ibrahim-ssh' -w"; \
			exit 1; \
		fi; \
		export IBRAHIM_SSH_PASS; \
	fi; \
	if command -v sshpass >/dev/null 2>&1; then \
		sshpass -p "$$IBRAHIM_SSH_PASS" ssh $(SSH_USER)@$(SSH_HOST); \
	else \
		echo "⚠️  sshpass not installed. Install with: brew install hudochenkov/sshpass/sshpass"; \
		echo "Falling back to manual password entry..."; \
		ssh $(SSH_USER)@$(SSH_HOST); \
	fi

# Backup server files to local directory (includes hidden files)
backup:
	@echo "Backing up from $(SSH_USER)@$(SSH_HOST):$(REMOTE_PATH) to $(BACKUP_DIR)..."
	@if [ -z "$$IBRAHIM_SSH_PASS" ]; then \
		echo "🔐 Loading SSH password from Keychain (Touch ID required)..."; \
		IBRAHIM_SSH_PASS=$$(security find-generic-password -a "$(SSH_HOST)" -s "ibrahim-ssh" -w 2>/dev/null); \
		if [ -z "$$IBRAHIM_SSH_PASS" ]; then \
			echo "❌ Password not found in Keychain."; \
			echo "📝 To store your password securely, run:"; \
			echo "   security add-generic-password -a '$(SSH_HOST)' -s 'ibrahim-ssh' -w"; \
			exit 1; \
		fi; \
		export IBRAHIM_SSH_PASS; \
	fi; \
	@mkdir -p $(BACKUP_DIR); \
	if command -v sshpass >/dev/null 2>&1; then \
		sshpass -p "$$IBRAHIM_SSH_PASS" rsync -avz --progress $(SSH_USER)@$(SSH_HOST):$(REMOTE_PATH) $(BACKUP_DIR); \
	else \
		echo "⚠️  sshpass not installed. Install with: brew install hudochenkov/sshpass/sshpass"; \
		echo "Falling back to manual password entry..."; \
		rsync -avz --progress $(SSH_USER)@$(SSH_HOST):$(REMOTE_PATH) $(BACKUP_DIR); \
	fi
	@echo "Backup complete!"
