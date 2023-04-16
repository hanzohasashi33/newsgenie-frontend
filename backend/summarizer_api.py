from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from simplet5 import SimpleT5
from loguru import logger
import uuid
from datetime import datetime


fmt = "{message}"
logger.add("./backend_logs.log", format=fmt)

app = FastAPI()
model = SimpleT5()
model.from_pretrained(model_type="t5", model_name="t5-base")
model.load_model("t5","../../output/content/outputs/simplet5-epoch-2-train-loss-0.924-val-loss-1.4455/", use_gpu=False)
print("Model Loaded")


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