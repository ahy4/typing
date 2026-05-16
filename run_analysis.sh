#!/bin/bash
cd /home/user/typing
python3 analyze.py 2>&1
ls -lh gomi/similar_results/island_2.json 2>&1
head -c 500 gomi/similar_results/island_2.json 2>&1
