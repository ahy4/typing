#!/bin/bash
cd /home/user/typing
python3 << 'PYEOF'
import json
import os

input_file = "gomi/similar_islands/island_2.json"
output_file = "gomi/similar_results/island_2.json"

with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

to_delete = set()

# Exact duplicates
jp_kana = {}
for e in data:
    k = (e['jp'], e['kana'])
    if k not in jp_kana:
        jp_kana[k] = []
    jp_kana[k].append(e)

for g in jp_kana.values():
    if len(g) > 1:
        non_r = [x for x in g if not x.get('recent')]
        keep_idx = (non_r[0] if non_r else g[0])['index']
        for e in g:
            if e['index'] != keep_idx:
                to_delete.add(e['index'])

# Near-duplicates
remaining = [e for e in data if e['index'] not in to_delete]
jp_rem = {}
for e in remaining:
    if e['jp'] not in jp_rem:
        jp_rem[e['jp']] = []
    jp_rem[e['jp']].append(e)

for group in jp_rem.values():
    for i in range(len(group)):
        for j in range(i+1, len(group)):
            e1, e2 = group[i], group[j]
            if e1['index'] in to_delete or e2['index'] in to_delete:
                continue
            diff = abs(len(e1['kana']) - len(e2['kana']))
            if diff <= 3:
                r1 = e1.get('recent', False)
                r2 = e2.get('recent', False)
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

del_list = sorted(list(to_delete))
if len(del_list) >= len(data):
    del_list = del_list[:-1]

res = {
    "delete": del_list,
    "reason": "Exact duplicates and near-redundant entries (kana diff ≤3 chars) removed, prioritizing deletion of recent=true entries." if del_list else "内容・kana ともに十分に異なる"
}

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(res, f, ensure_ascii=False)
PYEOF
