#!/usr/bin/env python3
import json

input_file = "/home/user/typing/gomi/similar_islands/island_2.json"
output_file = "/home/user/typing/gomi/similar_results/island_2.json"

with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

delete_indices = []

# Check for complete duplicates (jp and kana both identical)
seen_exact = {}
for item in data:
    idx = item['index']
    jp = item['jp']
    kana = item['kana']
    recent = item.get('recent', False)

    key = (jp, kana)
    if key not in seen_exact:
        seen_exact[key] = []
    seen_exact[key].append({
        'index': idx,
        'jp': jp,
        'kana': kana,
        'recent': recent,
        'kana_len': len(kana)
    })

# Process exact duplicates
for group_key, items in seen_exact.items():
    if len(items) <= 1:
        continue

    # Sort by: prefer keeping recent: false, then by kana length (longer better)
    items.sort(key=lambda x: (x['recent'], -x['kana_len']))

    # Keep first, delete the rest
    for item in items[1:]:
        delete_indices.append(item['index'])

delete_indices.sort()

if delete_indices:
    reason = "完全重複する jp・kana の組み合わせを検出しました。各グループから 1 件のみ残し、既存エントリ（recent: false）を優先しました。"
else:
    reason = "内容・kana ともに十分に異なる"

result = {
    "delete": delete_indices,
    "reason": reason
}

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False)

print(json.dumps(result, ensure_ascii=False, indent=2))
