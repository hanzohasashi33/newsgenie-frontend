from fastapi import FastAPI, status, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from simplet5 import SimpleT5
from loguru import logger
from datetime import datetime
from pymongo import MongoClient
from bson.objectid import ObjectId

import pydantic
pydantic.json.ENCODERS_BY_TYPE[ObjectId]=str

import uuid 



fmt = "{message}"
logger.add("./backend_logs.log", format=fmt)

app = FastAPI()
# model = SimpleT5()
# model.from_pretrained(model_type="t5", model_name="t5-base")
# model.load_model("t5","../../output/content/outputs/simplet5-epoch-2-train-loss-0.924-val-loss-1.4455/", use_gpu=False)
# print("Model Loaded")

client = MongoClient("localhost", 27017)
print("Connected to MongoDB")

db = client["newsgenie"]
news_collection = db["news"]


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


class LogMessage(BaseModel):
    action: str 
    user: str
    message: str
    level: str


class User(BaseModel):
    id: str 
    email: str



class Article(BaseModel):
    user: User
    headline: str 
    description: str 
    genre: str 
    rating: float



@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/summary")
async def summarize(newsArticle: NewsArticle):
    newsArticle_to_summarize = "summarize: {}".format(newsArticle)
    # newsArticle = model.predict(newsArticle_to_summarize)
    return newsArticle



@app.post("/log")
async def writelog(logMessage: LogMessage):
    if logMessage.level == "info":
        logId = uuid.uuid1()
        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
        logger.info(f"{dt_string} {logId} INFO {logMessage.action} {logMessage.user} {logMessage.message}")
    elif logMessage.level == "error":
        logId = uuid.uuid1()
        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
        logger.error(f"{dt_string} {logId} ERROR {logMessage.action} {logMessage.user} {logMessage.message}")



    
@app.post("/create_article", status_code=status.HTTP_201_CREATED)
async def create_article(request: Request):
    article = await request.json()
    article_collection = client["newsgenie"]["articles"]
    print(article)
    result = article_collection.insert_one(article)
    ack = "ok"
    return {"insertion": ack}



@app.get("/get_articles", status_code=status.HTTP_202_ACCEPTED)
async def get_articles():
    article_collection = client["newsgenie"]["articles"]
    articles = []
    for article in article_collection.find():
        articles.append(article)
    return articles


@app.post("/get_article", status_code=status.HTTP_201_CREATED)
async def get_article(request: Request):
    articleId = await request.json()
    print(articleId)
    articleId = articleId["id"]
    article_collection = client["newsgenie"]["articles"]
    result = article_collection.find_one({"_id": ObjectId(articleId)})
    return {"article": result}