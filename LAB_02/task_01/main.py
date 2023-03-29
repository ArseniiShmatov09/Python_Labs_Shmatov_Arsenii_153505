import utilities

if __name__ == "__main__":
    f = open('/home/arsenii/IGI_LABS/LAB_02/task_01/text.txt')
    text = f.read()
    print(f'\nКоличество предложений в тексте -  {utilities.get_amount_of_sentences(text)}')
    print(f'Количество недекларативных предложений в тексте - {utilities.get_amount_of_non_declarative_sentences(text)}')
    print(f'Средняя длина предложения в символах (учитывается только количество слов) - {utilities.get_average_amount_of_characters_in_sentence(text)}')
    print(f'Средняя длина слова в тексте в символах {utilities.get_average_amount_of_characters_in_word(text)}')
   
    while True:
        try:
            k = int(input('\nВведите k: '))
            break
        except ValueError:
            print("Неправильный ввод! Попробуй еще: ")
   
    while True:
        try:
            n = int(input('\nВведите n: '))
            break
        except ValueError:
           print("Неправильный ввод! Попробуй еще: ")

    print('\nТоп-K N-грамм:')
    print(utilities.get_top_grams(text, k, n))

