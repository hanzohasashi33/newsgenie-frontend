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
model = SimpleT5()
# model.from_pretrained(model_type="t5", model_name="t5-base")
model.load_model("t5","../../output/content/outputs/simplet5-epoch-2-train-loss-0.924-val-loss-1.4455/", use_gpu=False)
print("Model Loaded")

client = MongoClient("localhost", 27017)
print("Connected to MongoDB")

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
    newsArticle = model.predict(newsArticle_to_summarize)
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



def logMessage(type, action, user, message):
    logId = uuid.uuid1()
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    if type == "INFO":
        logger.info(f"{dt_string} {logId} INFO {action} {user} {message}")
    else: 
        logger.error(f"{dt_string} {logId} ERROR {action} {user} {message}")


    
@app.post("/create_article", status_code=status.HTTP_201_CREATED)
async def create_article(request: Request):
    article = await request.json()
    article_collection = client["newsgenie"]["articles"]
    result = article_collection.insert_one(article)
    if result.acknowledged:
        logMessage("INFO","create_article", article["user"]["email"], "created article")
    else:
        logMessage("ERROR","create_article", article["user"]["email"], "failed to create article")
    return {"insertion": result.acknowledged}



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



@app.post("/create_comment", status_code=status.HTTP_201_CREATED)
async def create_comment(request: Request):
    comment = await request.json()
    comment_collection = client["newsgenie"]["comments"]
    result = comment_collection.insert_one(comment)
    if result.acknowledged:
        logMessage("INFO","create_comment", comment["user"]["email"], "added comment")
    else:
        logMessage("ERROR","create_comment", comment["user"]["email"], "failed to add comment")
    return {"insertion": result.acknowledged}




@app.post("/get_comments", status_code=status.HTTP_202_ACCEPTED)
async def get_comments(request: Request):
    articleId = await request.json()
    articleId = articleId["id"]
    comment_collection = client["newsgenie"]["comments"]
    comments = []
    for comment in comment_collection.find({"article_id": articleId}):
        comments.append(comment)
    return {"comments": comments}



@app.post("/post_visit", status_code=status.HTTP_201_CREATED)
async def post_visit(request: Request):
    visit = await request.json()
    visit_collection = client["newsgenie"]["visits"]
    result = visit_collection.insert_one(visit)
    return {"insertion": result.acknowledged}


@app.post("/get_visits", status_code=status.HTTP_202_ACCEPTED)
async def get_visits(request: Request):
    userId = await request.json()
    userId = userId["userId"]
    visit_collection = client["newsgenie"]["visits"]    
    visits = []
    for visit in visit_collection.find({"user.id" : userId}):
        visits.append(visit)
    return {'visits': visits}