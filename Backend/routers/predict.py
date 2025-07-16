# # routers/predict.py
# from fastapi import APIRouter, File, UploadFile
# from tensorflow.keras.models import load_model
# from tensorflow.keras.preprocessing import image
# import numpy as np
# from PIL import Image
# import io,os,requests

# router = APIRouter()

# #model = load_model("model/model.h5") 
# url = "https://github.com/SpamBytes-Telexa/Aswanna---/releases/download/v1.0/model.h5"
# dest_path = "MLModels/model.h5"

# if not os.path.exists(dest_path):
#     print("Downloading model...")
#     r = requests.get(url)
#     with open(dest_path, "wb") as f:
#         f.write(r.content)
#     print("Download complete!")
# else:
#     print("Model already exists.")

# model = load_model(dest_path)
# class_names = ['healthy', 'rust', 'powdery']  # Adjust as needed

# def read_imagefile(file) -> Image.Image:
#     image_data = Image.open(io.BytesIO(file))
#     return image_data

# def preprocess(img: Image.Image) -> np.ndarray:
#     img = img.resize((224, 224))
#     img_array = image.img_to_array(img)
#     img_array = np.expand_dims(img_array, axis=0)
#     img_array = img_array / 255.0
#     return img_array

# @router.post("/predict")
# async def predict(file: UploadFile = File(...)):
#     img = read_imagefile(await file.read())
#     processed_img = preprocess(img)
#     prediction = model.predict(processed_img)
#     predicted_class = class_names[np.argmax(prediction)]
#     confidence = float(np.max(prediction))
#     return {"class": predicted_class, "confidence": confidence}
