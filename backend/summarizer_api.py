from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import dill 

import pickle 
from class_def import SummarizerModel, SummarizerDataModule, SummarizerDataset

app = FastAPI()


class CustomUnpickler(pickle.Unpickler):

    def find_class(self, module, name):
        if name == 'SummarizerModel':
            from class_def import SummarizerModel
            return SummarizerModel
        return super().find_class(module, name)

pickle_data = CustomUnpickler(open('../model/summarizer_model.pkl', 'rb')).load()

# with open("../model/temp.joblib", 'rb') as file:  
#     Pickled_model = dill.load(file)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NewsArticle(BaseModel):
    newsArticle: str 



@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/summary")
async def summarize(newsArticle: NewsArticle):
    return newsArticle