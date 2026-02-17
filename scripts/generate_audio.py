import os
import asyncio
import edge_tts

VOICE = "fa-IR-DilaraNeural"

words = {
    1: "بابا",    # Baba
    2: "توت",     # Tut
    3: "پا",      # Pa
    4: "نان",     # Nan
    5: "بینی",    # Bini
    7: "توپ",     # Tup
    8: "زن",      # Zan
    9: "اسب",     # Asb
    10: "سیب",    # Sib
    11: "موش",    # Mush
    12: "آب",     # Ab
    13: "پسر",    # Pesar
    14: "برف",    # Barf
    15: "شب",     # Shab
    16: "چای",    # Chay
    17: "یخ",     # Yakh
    18: "دریا",   # Darya
    19: "پنیر",   # Panir
    20: "باران",  # Baran
    21: "زبان",   # Zaban
    22: "جوجه",   # Jujeh
    23: "درخت",   # Derakht
    24: "فرش",    # Farsh
    25: "بادام",  # Badam
    26: "دوست",   # Doost
    27: "شیر",    # Shir
    28: "خانه",   # Khaneh
    29: "خوب",    # Khub
    30: "کتاب",   # Ketab
    31: "پنجره",  # Panjereh
    32: "نمک",    # Namak
    34: "گوش",    # Gush
    35: "بیست",   # Bist
    36: "چشم",    # Chashm
    37: "کفش",    # Kafsh
    38: "زنبور",  # Zanbur
    39: "خرگوش",  # Khargush
    40: "آفتاب",  # Aftab
    41: "تابستان",# Tabestan
    42: "شیرین",  # Shirin
    43: "خورشید", # Khorshid
    44: "چهارشنبه", # Chaharshanbe
    45: "دیشب",   # Dishab
    46: "سبز",    # Sabz
    47: "برنج",   # Berenj
    48: "میز",    # Miz
    49: "چتر",    # Chetr
    50: "پول",    # Pul
    51: "دست",    # Dast
    52: "پسته",   # Pesteh
    53: "گربه",   # Gorbeh
    54: "ماشین",  # Mashin
    55: "انجیر",  # Anjir
    56: "خرس",    # Khers
    57: "قلب",    # Ghalb
    58: "کیف",    # Kif
    59: "کباب",   # Kebab
    60: "عنکبوت", # Ankabut
}

async def main():
    output_dir = "public/audio"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    print(f"Starting download for {len(words)} words using Neural Voice")

    for word_id, persian_text in words.items():
        filename = f"{word_id}.mp3"
        filepath = os.path.join(output_dir, filename)
        
        try:
            communicate = edge_tts.Communicate(persian_text, VOICE)
            await communicate.save(filepath)
            print(f"Saved [{word_id}]: {persian_text}")
        except Exception as e:
            print(f"Failed [{word_id}]: {e}")

    print("\nDone!")

if __name__ == "__main__":
    asyncio.run(main())