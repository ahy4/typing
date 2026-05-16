#!/usr/bin/env python3
import json

input_file = "/home/user/typing/gomi/similar_islands/island_2.json"

# Read and check first few entries
with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Total entries: {len(data)}")
print(f"\nFirst 3 entries:")
for entry in data[:3]:
    print(json.dumps(entry, ensure_ascii=False, indent=2))

# Count recent vs non-recent
recent_count = sum(1 for e in data if e.get('recent', False))
non_recent_count = len(data) - recent_count
print(f"\nRecent entries: {recent_count}")
print(f"Non-recent entries: {non_recent_count}")

# Check for duplicates
jp_kana_map = {}
for entry in data:
    key = (entry['jp'], entry['kana'])
    if key not in jp_kana_map:
        jp_kana_map[key] = []
    jp_kana_map[key].append(entry)

duplicates = {k: v for k, v in jp_kana_map.items() if len(v) > 1}
print(f"\nExact duplicate groups: {len(duplicates)}")
if duplicates:
    print("First few duplicates:")
    for i, (key, group) in enumerate(list(duplicates.items())[:3]):
        print(f"  {key}: {len(group)} entries")
        for e in group:
            print(f"    - index {e['index']}, recent={e.get('recent', False)}")
