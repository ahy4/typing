#!/usr/bin/env python3
import json
from difflib import SequenceMatcher

input_file = "/home/user/typing/gomi/similar_islands/island_2.json"
output_file = "/home/user/typing/gomi/similar_results/island_2.json"

def levenshtein_distance(s1, s2):
    """Calculate Levenshtein distance between two strings"""
    if len(s1) < len(s2):
        return levenshtein_distance(s2, s1)
    if len(s2) == 0:
        return len(s1)

    previous_row = range(len(s2) + 1)
    for i, c1 in enumerate(s1):
        current_row = [i + 1]
        for j, c2 in enumerate(s2):
            insertions = previous_row[j + 1] + 1
            deletions = current_row[j] + 1
            substitutions = previous_row[j] + (c1 != c2)
            current_row.append(min(insertions, deletions, substitutions))
        previous_row = current_row
    return previous_row[-1]

with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

delete_indices = set()

# First pass: exact duplicates (jp and kana both identical)
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
        delete_indices.add(item['index'])

# Second pass: check for kana differences <= 3 chars with same jp
for jp_key in set(item['jp'] for item in data):
    items_with_jp = [item for item in data if item['jp'] == jp_key and item['index'] not in delete_indices]

    if len(items_with_jp) <= 1:
        continue

    # Group by small kana differences
    grouped = []
    processed = set()

    for i, item1 in enumerate(items_with_jp):
        if i in processed:
            continue

        group = [item1]
        processed.add(i)

        for j, item2 in enumerate(items_with_jp[i+1:], start=i+1):
            if j in processed:
                continue

            # Check kana difference
            kana_diff = abs(len(item1['kana']) - len(item2['kana']))
            if kana_diff <= 3:
                # Consider it redundant
                group.append(item2)
                processed.add(j)

        if len(group) > 1:
            grouped.append(group)

    # For each redundant group, keep the best one
    for group in grouped:
        if len(group) <= 1:
            continue
        group.sort(key=lambda x: (x['recent'], -x['kana_len']))
        for item in group[1:]:
            delete_indices.add(item['index'])

delete_list = sorted(list(delete_indices))

if delete_list:
    reason = "完全重複または極めて冗長な jp・kana の組み合わせを検出しました。各グループから 1 件のみ残し、既存エントリ（recent: false）と文字数の多い方を優先しました。"
else:
    reason = "内容・kana ともに十分に異なる"

result = {
    "delete": delete_list,
    "reason": reason
}

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False)

print(json.dumps(result, ensure_ascii=False, indent=2))
