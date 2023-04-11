from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from simplet5 import SimpleT5


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



@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/summary")
async def summarize(newsArticle: NewsArticle):
    newsArticle_to_summarize = "summarize: {}".format(newsArticle)
    newsArticle = model.predict(newsArticle_to_summarize)
    return newsArticle