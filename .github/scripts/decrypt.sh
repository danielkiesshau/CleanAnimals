#!/bin/sh

# Decrypt the file
mkdir ./secrets
# --lote para evitar o comando interativo
# --sim para supor "sim" para as perguntas
gpg --quiet --batch --yes --decrypt --passphrase="$LARGE_SECRET_PASSPHRASE" \
--output ./secrets/service_account.json service_account.json.gpg
