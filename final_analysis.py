#!/usr/bin/env python3
"""
Analyze island_2.json for redundant typing game entries.
"""
import json
import sys

def analyze_island(input_file, output_file):
    # Read input
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    delete_indices = set()

    # Track (jp, kana) combinations to find exact duplicates
    exact_matches = {}
    for item in data:
        key = (item['jp'], item['kana'])
        if key not in exact_matches:
            exact_matches[key] = []
        exact_matches[key].append(item)

    # Handle exact duplicates: keep one, delete duplicates
    for key, items in exact_matches.items():
        if len(items) > 1:
            # Sort: keep recent:false first, then keep longest kana
            items.sort(key=lambda x: (x.get('recent', False), -len(x['kana'])))
            # Delete all but first
            for item in items[1:]:
                delete_indices.add(item['index'])

    # Also check for near-duplicates in same jp with small kana difference
    jp_groups = {}
    for item in data:
        if item['index'] not in delete_indices:  # Don't reprocess already marked for deletion
            if item['jp'] not in jp_groups:
                jp_groups[item['jp']] = []
            jp_groups[item['jp']].append(item)

    for jp, items in jp_groups.items():
        if len(items) <= 1:
            continue

        # Check for items with kana difference <= 3
        for i in range(len(items)):
            for j in range(i + 1, len(items)):
                kana_diff = abs(len(items[i]['kana']) - len(items[j]['kana']))
                if kana_diff <= 3:
                    # Mark for potential deletion
                    # Keep the one with longer kana and recent:false preference
                    if items[i].get('recent', False) and not items[j].get('recent', False):
                        delete_indices.add(items[i]['index'])
                    elif items[i].get('recent', False) or len(items[i]['kana']) < len(items[j]['kana']):
                        delete_indices.add(items[i]['index'])
                    else:
                        delete_indices.add(items[j]['index'])

    delete_list = sorted(list(delete_indices))

    if delete_list:
        reason = "完全重複または極めて冗長な jp・kana の組み合わせを検出しました。各グループから 1 件のみ残し、既存エントリ（recent: false）と文字数の多い方を優先しました。"
    else:
        reason = "内容・kana ともに十分に異なる"

    result = {
        "delete": delete_list,
        "reason": reason
    }

    # Write output
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False)

    return result

if __name__ == '__main__':
    result = analyze_island(
        '/home/user/typing/gomi/similar_islands/island_2.json',
        '/home/user/typing/gomi/similar_results/island_2.json'
    )
    print(json.dumps(result, ensure_ascii=False))
