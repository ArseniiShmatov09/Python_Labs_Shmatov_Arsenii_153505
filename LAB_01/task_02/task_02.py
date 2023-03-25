def MyFunc(a, b, operation):
  
   if operation == '+':
      return a + b
   elif operation == '-':
      return a - b
   elif operation == '*':
      return a * b
   elif operation == '/':
      return a / b
   
def get_number():
    while True:
        x = input()
        if x.isdigit():
            return int(x)
        else:
            print("Попробуйте еще, введите число:")   
  
print("Введите 1-ое число:")
x = get_number()
print ("Введите 2-ое число:")
y = get_number()
op = input("Введите операцию:")
    
if op != '+' and op != '-' and op != '/' and op != '*':
    print("Введена неправильная операция")
elif op == '/' and y == 0:
    print("Деление на 0")
else:
    print("Result:", MyFunc(x, y, op))