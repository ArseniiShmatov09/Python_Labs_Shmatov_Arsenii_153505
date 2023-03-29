import re
import json
import os

class MyContainer:

    def __init__(self, username):

        self.username = username
        self.storage = set()
        self.switch(username)

    def add(self, key):

        if key not in self.storage:
            self.storage.add(key)

    def remove(self, key):

        if key in self.storage:
            self.storage.remove(key)
        else:
            print("\nТакого ключа нет!")

    def find(self, key):

        if key in self.storage:
            print("\nНайденные значения:\n")
            print(f"{key}")
            return True
        
        else:
            print("\nТакие элементы не найдены :(")
            return False

    def list(self):
        if len(self.storage) == 0:
            print("Пусто")
        else:    
            for key in self.storage:
                print(f'{key}')

    def grep(self, regex):

        is_something_match = False
        print("\nНайденные значения:\n")
        
        for key in self.storage:
           
            if re.match(regex, key):               
                print(f"{key}")
                is_something_match = True

        if not is_something_match:
            print("\nТакие элементы не найдены :(\n")

    def save(self):

        os.makedirs(os.path.dirname(f'./task_02/containers/{self.username}.json'), exist_ok=True)
        with open(f'./task_02/containers/{self.username}.json', 'w') as fp:
            json.dump(list(self.storage), fp)

    def load(self):

        if os.path.exists(f'./task_02/containers/{self.username}.json'):
            with open(f'./task_02/containers/{self.username}.json', 'r') as fp:
                self.storage.update(set(json.load(fp)))

        else:
            print(f"Такого пользователя не существует! Создан новый контейнер для пользователя: {self.username}")

    def switch(self, username):

        self.username = username
        self.storage.clear()

        if os.path.exists(f'./task_02/containers/{self.username}.json'):
            answer = input("\nХотите загрузить контейнер? Введите 'y', если да: ")

            if answer.lower() == "y":
                self.load()

        else:
            print(f"\nСоздан новый контейнер для пользователя: {self.username}")
