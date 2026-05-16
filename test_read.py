import json

# Try to read just the length and first entry
with open("/home/user/typing/gomi/similar_islands/island_2.json") as f:
    data = json.load(f)

print(f"Total entries: {len(data)}")
print(f"First entry: {data[0]}")
print(f"Sample: {data[0:1]}")

# Count duplicates
from collections import defaultdict
jp_kana_count = defaultdict(int)
for e in data:
    key = (e['jp'], e['kana'])
    jp_kana_count[key] += 1

dups = sum(1 for c in jp_kana_count.values() if c > 1)
print(f"Duplicate (jp, kana) pairs: {dups}")
