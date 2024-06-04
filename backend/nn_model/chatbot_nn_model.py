import json
import pickle
import random

import nltk
import numpy as np
from nltk.stem import WordNetLemmatizer
from tensorflow.keras.models import load_model  # type: ignore


class ChatbotNNModel:
    def __init__(
        self, model_file_path, intents_file_path, words_file_path, classes_file_path
    ):
        self.model = load_model(model_file_path)
        # self.intents = json.loads(open(intents_file_path).read())
        self.intents = json.load(open(intents_file_path, encoding="utf-8"))
        self.words = pickle.load(open(words_file_path, "rb"))
        self.classes = pickle.load(open(classes_file_path, "rb"))
        self.lemmatizer = WordNetLemmatizer()

    def clean_up_sentence(self, sentence):
        sentence_words = nltk.word_tokenize(sentence)
        sentence_words = [
            self.lemmatizer.lemmatize(word.lower()) for word in sentence_words
        ]
        return sentence_words

    def bow(self, sentence, show_details=True):
        sentence_words = self.clean_up_sentence(sentence)
        bag = [0] * len(self.words)
        for s in sentence_words:
            for i, w in enumerate(self.words):
                if w == s:
                    bag[i] = 1
                    if show_details:
                        print("found in bag: %s" % w)
        return np.array(bag)

    def predict_class(self, sentence):
        p = self.bow(sentence, show_details=False)
        res = self.model.predict(np.array([p]))[0]
        ERROR_THRESHOLD = 0.25
        results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
        results.sort(key=lambda x: x[1], reverse=True)
        return_list = []
        for r in results:
            return_list.append({"intent": self.classes[r[0]], "probability": str(r[1])})
        return return_list

    def get_response(self, ints):
        tag = ints[0]["intent"]
        list_of_intents = self.intents["intents"]
        for i in list_of_intents:
            if i["tag"] == tag:
                result = random.choice(i["responses"])
                break
        return result

    def chatbot_response(self, msg):
        ints = self.predict_class(msg)
        res = self.get_response(ints)
        return res


import os

script_dir = os.getcwd()

model_file_path = os.path.join(script_dir, "backend/nn_model/chatbot_model.h5")
intents_file_path = os.path.join(script_dir, "backend/nn_model/intents.json")
words_file_path = os.path.join(script_dir, "backend/nn_model/words.pkl")
classes_file_path = os.path.join(script_dir, "backend/nn_model/classes.pkl")


chatbot_nn_model = ChatbotNNModel(
    model_file_path, intents_file_path, words_file_path, classes_file_path
)

# predefined_questions = [
#     "Xin chào",
#     "Có tất cả bao nhiêu giày",
#     "Có tất cả bao nhiêu thương hiệu giày",
#     "Có tất cả bao nhiêu khuyến mãi",
#     "Tạm biệt",
# ]

# # Duyệt qua danh sách các câu hỏi và in ra câu trả lời từ chatbot
# for question in predefined_questions:
#     print("You:", question)
#     response = chatbot_nn_model.chatbot_response(question)
#     print("Bot:", response)
