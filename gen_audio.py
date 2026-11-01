"""Membuat suara narasi (mp3) dari src/narration.json.
Suara utama: Microsoft Edge TTS (gratis). Cadangan: Google TTS (gTTS)."""
import asyncio, json, os

VOICE = os.environ.get("VOICE", "id-ID-GadisNeural")  # perempuan. Untuk laki-laki: id-ID-ArdiNeural
RATE = os.environ.get("RATE", "-4%")

data = json.load(open("src/narration.json", encoding="utf-8"))
jobs = {"intro": data["intro"], "outro": data["outro"]}
for i, subs in enumerate(data["steps"], 1):
    for j, text in enumerate(subs, 1):
        jobs[f"s{i}-{j}"] = text

os.makedirs("public/audio", exist_ok=True)


async def edge(name, text):
    import edge_tts
    await edge_tts.Communicate(text, VOICE, rate=RATE).save(f"public/audio/{name}.mp3")


def google(name, text):
    from gtts import gTTS
    gTTS(text, lang="id").save(f"public/audio/{name}.mp3")


async def main():
    for name, text in jobs.items():
        done = False
        for attempt in range(3):
            try:
                await edge(name, text)
                done = True
                break
            except Exception as e:
                print(f"[{name}] edge-tts gagal (percobaan {attempt + 1}): {e}")
                await asyncio.sleep(2)
        if not done:
            print(f"[{name}] pakai Google TTS")
            google(name, text)
        print("OK", name)


asyncio.run(main())
