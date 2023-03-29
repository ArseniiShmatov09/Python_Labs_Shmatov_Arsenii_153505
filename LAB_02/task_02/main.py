import my_container


if __name__ == "__main__":

    username = input("Введите Имя контейнера: ")
    container = my_container.MyContainer(username)
    is_executing = True

    while is_executing:

        command_list = '''
Список команд:

add 
remove 
find
list
grep 
save
load
switch
exit
'''       
        print(command_list)
        command = input("Введите команду: ")

        match command:

            case "add":
                key = input("Введите ключ для добавления: ")
                key = key.split()
                for el in key:
                    container.add(el)

            case "remove":
                key = input("Введите ключ для удаления: ")
                container.remove(key)

            case "find":
                key = input("Введите ключ для поиска: ")
                key = key.split()
                for el in key:
                    container.find(el)

            case "list":
                print("\nСодержимое контейнера:\n")
                container.list()

            case "grep":
                key = input("Введите регулярное выражение для поиска: ")
                container.grep(key)

            case "save":
                container.save()
                print("Контейнер успешно сохранен!")

            case "load":
                container.load()

            case "switch":
                answer = input("Хотите сохранить контейнер? Введите 'y', если да: ")

                if answer.lower() == 'y':
                    container.save()
                    print("\nКонтейнер успешно сохранен!\n")

                else:     
                    print("\nКонтейнер не сохранен.\n")

                user = input("Введите Имя контейнера для переключения: ")
                container.switch(user)

            case "exit":
                
                answer = input("Хотите сохранить контейнер? Введите 'y', если да: ")

                if answer.lower() == 'y':
                    container.save()
                    print("\nКонтейнер успешно сохранен!")

                else:     
                    print("\nКонтейнер не сохранен.")

                is_executing = False

            case _:
                print("\nНет такой команды")
