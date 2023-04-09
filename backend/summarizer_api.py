from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()

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