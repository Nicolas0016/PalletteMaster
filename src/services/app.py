import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from colorthief import ColorThief
import requests
import colorsys
import uuid

app = Flask(__name__)
CORS(app)  # Habilita CORS para toda la aplicación

def rgb_to_hex(rgb):
    return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])

def get_complementary_color(rgb):
    return (255 - rgb[0], 255 - rgb[1], 255 - rgb[2])

def get_palette_from_image(image_path, color_count=5):
    color_thief = ColorThief(image_path)
    palette = color_thief.get_palette(color_count=color_count)
    hex_palette = [rgb_to_hex(color) for color in palette]
    complementary_palette = [rgb_to_hex(get_complementary_color(color)) for color in palette]
    return hex_palette, complementary_palette

def fetch_suggested_palettes(base_color_hex):
    url = f"http://www.colourlovers.com/api/palettes?hex={base_color_hex.lstrip('#')}&format=json"
    response = requests.get(url)
    if response.status_code == 200:
        palettes = response.json()
        return [[f"#{color}" for color in palette['colors'][:5]] for palette in palettes]
    else:
        return []

def generate_harmonious_palettes(hex_palette):
    harmonious_palettes = []

    def hex_to_rgb(hex_color):
        hex_color = hex_color.lstrip('#')
        return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

    def rgb_to_hsv(rgb):
        return colorsys.rgb_to_hsv(*[x / 255.0 for x in rgb])

    def hsv_to_rgb(hsv):
        return tuple(int(x * 255) for x in colorsys.hsv_to_rgb(*hsv))

    def get_analogous(color):
        hsv = rgb_to_hsv(hex_to_rgb(color))
        analogous_colors = []
        for i in [-0.1, 0.1]:
            new_hue = (hsv[0] + i) % 1.0
            new_color = hsv_to_rgb((new_hue, hsv[1], hsv[2]))
            analogous_colors.append(rgb_to_hex(new_color))
        return analogous_colors

    def get_triadic(color):
        hsv = rgb_to_hsv(hex_to_rgb(color))
        triadic_colors = []
        for i in [1/3, 2/3]:
            new_hue = (hsv[0] + i) % 1.0
            new_color = hsv_to_rgb((new_hue, hsv[1], hsv[2]))
            triadic_colors.append(rgb_to_hex(new_color))
        return triadic_colors

    def get_tetradic(color):
        hsv = rgb_to_hsv(hex_to_rgb(color))
        tetradic_colors = []
        for i in [1/4, 2/4, 3/4]:
            new_hue = (hsv[0] + i) % 1.0
            new_color = hsv_to_rgb((new_hue, hsv[1], hsv[2]))
            tetradic_colors.append(rgb_to_hex(new_color))
        return tetradic_colors

    for color in hex_palette:
        harmonious_palettes.append({
            'base_color': color,
            'analogous': get_analogous(color),
            'triadic': get_triadic(color),
            'tetradic': get_tetradic(color)
        })

    return harmonious_palettes

@app.route('/')
def index():
    return "Color Scheme API is running."

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        file_path = os.path.join('uploads', file.filename)
        file.save(file_path)
        hex_palette, complementary_palette = get_palette_from_image(file_path)
        os.remove(file_path)

        # Get the first color in the palette for suggestions
        base_color_hex = hex_palette[0]
        suggested_palettes = fetch_suggested_palettes(base_color_hex)
        harmonious_palettes = generate_harmonious_palettes(hex_palette)

        # Create the UserColors structure
        user_colors = {
            "type": "UserColors",
            "items": [
                {
                    "name": "Palette",
                    "colors": [{"id": str(uuid.uuid4()), "color": color} for color in hex_palette]
                },
                {
                    "name": "Complementary",
                    "colors": [{"id": str(uuid.uuid4()), "color": color} for color in complementary_palette]
                },
                {
                    "name": "Analogous",
                    "colors": [
                        {"id": str(uuid.uuid4()), "color": color}
                        for palette in harmonious_palettes for color in palette['analogous']
                    ]
                },
                {
                    "name": "Triadic",
                    "colors": [
                        {"id": str(uuid.uuid4()), "color": color}
                        for palette in harmonious_palettes for color in palette['triadic']
                    ]
                },
                {
                    "name": "Tetradic",
                    "colors": [
                        {"id": str(uuid.uuid4()), "color": color}
                        for palette in harmonious_palettes for color in palette['tetradic']
                    ]
                }
            ]
        }

        return jsonify(user_colors)

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True)
