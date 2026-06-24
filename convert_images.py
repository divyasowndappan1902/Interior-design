import os
from PIL import Image

def convert_to_webp(input_path, output_path, target_kb=100):
    img = Image.open(input_path)
    
    # Resize slightly if very large to help compression
    img.thumbnail((800, 800))
    
    quality = 90
    while True:
        img.save(output_path, 'WEBP', quality=quality)
        size_kb = os.path.getsize(output_path) / 1024
        if size_kb <= target_kb or quality <= 10:
            break
        quality -= 5

    print(f"Saved {output_path} (Size: {size_kb:.2f} KB, Quality: {quality})")

# File paths
img1_in = r"C:\Users\Admin\.gemini\antigravity\brain\b20f1257-fa85-4992-8fca-a4588c1f8007\floor_plan_approved_1782289421070.png"
img2_in = r"C:\Users\Admin\.gemini\antigravity\brain\b20f1257-fa85-4992-8fca-a4588c1f8007\color_palette_approved_1782289441233.png"

img1_out = r"C:\Users\Admin\Desktop\Interior design\assets\floor_plan_approved.webp"
img2_out = r"C:\Users\Admin\Desktop\Interior design\assets\color_palette_approved.webp"

# Create assets folder if it doesn't exist
os.makedirs(r"C:\Users\Admin\Desktop\Interior design\assets", exist_ok=True)

convert_to_webp(img1_in, img1_out)
convert_to_webp(img2_in, img2_out)
