import os
from PIL import Image

def compress_to_target(input_path, output_path, target_mb):
    img = Image.open(input_path)

    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
        alpha = img.convert('RGBA').split()[-1]
        bg = Image.new("RGB", img.size, (255, 255, 255))
        bg.paste(img, mask=alpha)
        img = bg
    else:
        img = img.convert("RGB")
    
    quality = 95
    target_bytes = target_mb * 1024 * 1024
    
    while quality > 5:
        img.save(output_path, "JPEG", quality=quality, optimize=True)
        size = os.path.getsize(output_path)
        
        if size <= target_bytes:
            print(f"Success! Saved at {quality}% quality. Size: {size/1024/1024:.2f} MB")
            return
        
        quality -= 5
        
    print("Could not compress to target size without severe quality loss.")

compress_to_target("og.png", "newOg.png", 0.300)
