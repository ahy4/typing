import json
import sys
import os

input_file = "/home/user/typing/gomi/similar_islands/island_2.json"
output_file = "/home/user/typing/gomi/similar_results/island_2.json"

os.makedirs(os.path.dirname(output_file), exist_ok=True)

with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

to_delete = set()

# Pass 1: Exact duplicates (jp and kana identical)
jp_kana_map = {}
for entry in data:
    key = (entry['jp'], entry['kana'])
    if key not in jp_kana_map:
        jp_kana_map[key] = []
    jp_kana_map[key].append(entry)

for (jp, kana), group in jp_kana_map.items():
    if len(group) > 1:
        recent = [e for e in group if e.get('recent', False)]
        non_recent = [e for e in group if not e.get('recent', False)]

        if non_recent:
            keep = non_recent[0]['index']
            for e in group:
                if e['index'] != keep:
                    to_delete.add(e['index'])
        else:
            keep = group[0]['index']
            for e in group[1:]:
                to_delete.add(e['index'])

# Pass 2: Near-duplicates (kana diff <= 3 chars, same jp)
remaining = [e for e in data if e['index'] not in to_delete]
jp_groups = {}
for entry in remaining:
    if entry['jp'] not in jp_groups:
        jp_groups[entry['jp']] = []
    jp_groups[entry['jp']].append(entry)

for jp, group in jp_groups.items():
    if len(group) <= 1:
        continue
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

delete_list = sorted(list(to_delete))
if len(delete_list) >= len(data):
    delete_list = delete_list[:-1]

result = {
    "delete": delete_list,
    "reason": "Exact duplicates and near-redundant entries (kana diff ≤3 chars) removed, prioritizing deletion of recent=true entries." if delete_list else "内容・kana ともに十分に異なる"
}

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False)

print(json.dumps(result, ensure_ascii=False, indent=2))
