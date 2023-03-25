import random
numList =[]

for i in range(10):
    numList.append(random.randint(0, 100))

print("Исходный срисок:\n",numList)

EvenNumList =[]

for i in range(10):
    if numList[i] % 2 == 0:
        EvenNumList.append(numList[i])

print("Полученный срисок:\n",EvenNumList)