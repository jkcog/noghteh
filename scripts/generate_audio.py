"""Generate a pronunciation mp3 for every word in src/words.json.

Usage:
    python scripts/generate_audio.py          # only generate missing files
    python scripts/generate_audio.py --force  # regenerate everything
"""
import asyncio
import json
import os
import sys

import edge_tts

VOICE = "fa-IR-DilaraNeural"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WORDS_FILE = os.path.join(ROOT, "src", "words.json")
OUTPUT_DIR = os.path.join(ROOT, "public", "audio")


async def main(force=False):
    with open(WORDS_FILE, encoding="utf-8") as f:
        # Each entry: [id, category, translation, transliteration, persian]
        words = json.load(f)

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    todo = [
        (w[0], w[4])
        for w in words
        if force or not os.path.exists(os.path.join(OUTPUT_DIR, f"{w[0]}.mp3"))
    ]
    print(f"Generating {len(todo)} of {len(words)} words using Neural Voice")

    failed = []
    for word_id, persian_text in todo:
        filepath = os.path.join(OUTPUT_DIR, f"{word_id}.mp3")
        try:
            await edge_tts.Communicate(persian_text, VOICE).save(filepath)
            print(f"Saved [{word_id}]: {persian_text}")
        except Exception as e:
            failed.append(word_id)
            if os.path.exists(filepath) and os.path.getsize(filepath) == 0:
                os.remove(filepath)
            print(f"Failed [{word_id}]: {e}")

    print(f"\nDone! {len(failed)} failed: {failed}" if failed else "\nDone!")


if __name__ == "__main__":
    asyncio.run(main(force="--force" in sys.argv))
