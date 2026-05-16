#!/usr/bin/env python3
import json
import sys

# Read input
with open("/home/user/typing/gomi/similar_islands/island_2.json") as f:
    data = json.load(f)

# Process
to_delete = set()

# Find exact duplicates
jp_kana = {}
for e in data:
    k = (e['jp'], e['kana'])
    if k not in jp_kana:
        jp_kana[k] = []
    jp_kana[k].append(e)

for g in jp_kana.values():
    if len(g) > 1:
        non_recent = [x for x in g if not x.get('recent')]
        keep = (non_recent[0] if non_recent else g[0])['index']
        for e in g:
            if e['index'] != keep:
                to_delete.add(e['index'])

# Find near-duplicates
remaining = {e['index']: e for e in data if e['index'] not in to_delete}
by_jp = {}
for e in remaining.values():
    if e['jp'] not in by_jp:
        by_jp[e['jp']] = []
    by_jp[e['jp']].append(e)

for group in by_jp.values():
    for i in range(len(group)):
        for j in range(i+1, len(group)):
            e1, e2 = group[i], group[j]
            if e1['index'] in to_delete or e2['index'] in to_delete:
                continue
            diff = abs(len(e1['kana']) - len(e2['kana']))
            if diff <= 3:
                r1 = e1.get('recent')
                r2 = e2.get('recent')
                if r1 and not r2:
                    to_delete.add(e1['index'])
                elif r2 and not r1:
                    to_delete.add(e2['index'])
                elif r1 and r2:
                    if len(e1['kana']) > len(e2['kana']):
                        to_delete.add(e2['index'])
                    elif len(e2['kana']) > len(e1['kana']):
                        to_delete.add(e1['index'])
                    else:
                        to_delete.add(max(e1['index'], e2['index']))

# Ensure at least one survives
del_list = sorted(to_delete)
if len(del_list) >= len(data):
    del_list = del_list[:-1]

out = {
    "delete": del_list,
    "reason": "Exact duplicates and near-redundant entries (kana diff ≤3 chars) removed, prioritizing deletion of recent=true entries." if del_list else "内容・kana ともに十分に異なる"
}

import os
os.makedirs("/home/user/typing/gomi/similar_results", exist_ok=True)
with open("/home/user/typing/gomi/similar_results/island_2.json", "w") as f:
    json.dump(out, f, ensure_ascii=False)
print(json.dumps(out, ensure_ascii=False))
