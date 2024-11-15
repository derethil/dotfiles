#!/bin/bash

PKGS=$(ls -d -- */)

for PKG in $PKGS; do
  cd "$PKG" || exit
  makepkg -si
  cd ..
done
