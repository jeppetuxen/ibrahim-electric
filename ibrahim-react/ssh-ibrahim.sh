#!/bin/bash

# SSH to Ibrahim Electric server using password from Keychain
# This will prompt for Touch ID to retrieve the password

HOST="$IBRAHIM_SSH_HOST"
USER="$IBRAHIM_SSH_USER"

echo "🔐 Retrieving password from Keychain (Touch ID required)..."

# Try to get password from Keychain - this will prompt for Touch ID
# You need to store the password in Keychain first with the label "ibrahim-ssh"
PASSWORD=$(security find-generic-password -a "$USER" -s "ibrahim-ssh" -w 2>/dev/null)

if [ -z "$PASSWORD" ]; then
    echo "❌ Password not found in Keychain."
    echo ""
    echo "To store your password in Keychain, run:"
    echo "  security add-generic-password -a '$USER' -s 'ibrahim-ssh' -w"
    echo ""
    echo "Then enter your password when prompted."
    echo ""
    echo "For now, SSH will prompt you for the password normally."
    ssh "$USER@$HOST"
else
    echo "✅ Password retrieved!"
    echo "🚀 Connecting to $USER@$HOST..."

    # Use sshpass if available, otherwise fall back to expect
    if command -v sshpass >/dev/null 2>&1; then
        sshpass -p "$PASSWORD" ssh "$USER@$HOST"
    else
        echo "❌ sshpass not installed."
        echo "Install it with: brew install hudochenkov/sshpass/sshpass"
        echo ""
        echo "Falling back to manual password entry..."
        ssh "$USER@$HOST"
    fi
fi
