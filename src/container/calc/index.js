class Calc {
  static #value = ''
  static #NAME = 'calc'
  static #isDot = false

  static add = (newValue) => {
    // Если предпоследний символ не число, тогда
    if (isNaN(this.#value[this.#value.length - 2])) {
      // если последний символ число ноль и точка еще не стоит(т.е. можно ставить точку)
      if (
        Number(this.#value[this.#value.length - 1]) === 0 &&
        this.#isDot == false
      ) {
        return null
      }
    }

    // в конец #value дописывается значение newValue
    this.#value = this.#value.concat(newValue)
    // После обновления #value вывести его на экран (вызвать функцию #output)
    this.#output()
  }

  //   Функция static #output (вписывает на табло калькулятора значения, которые добавляются в #value) обратится к window.output.innerHTML и положит туда #value
  static #output = () => {
    // обращаемся к запомненому в локальном хранилище перед выводом значения
    this.#save()
    window.output.innerHTML = this.#value
  }

  static dot = () => {
    // если у нас уже есть точка, то код дальше не выполняется. Т.е. после точки не можем поставить точку
    if (this.#isDot) {
      return null
    }

    if (isNaN(this.#value[this.#value.length - 1])) {
      return null
    }
    // Дописывает . в конец #value и выводит на табло калькулятора
    this.#value = this.#value.concat('.')
    this.#output()
    // если . поставлена, меняем статус #isDot на true
    this.#isDot = true
  }

  static op = (opValue) => {
    // Если всредине #value последний символ ([this.#value.length - 1] - это индекс последнего символа) не является числом (isNaN - Not a Number), выдается null и последующий код не выполняется. Т.е. знаки можем ставить только после чисел
    if (isNaN(this.#value[this.#value.length - 1])) {
      return null
    }

    // Дописывает знаки в конец #value и выводит на табло калькулятора
    this.#value = this.#value.concat(opValue)
    this.#output()
    // если знак поставлен меняем #isDot на false, чтобы можно было дописывать точку
    this.#isDot = false
  }

  static reset = () => {
    //   Кнопка С будет обновлять значение до по умолчанию(т.е. очищать табло калькулятора) -  положит в #value пустую строку и выполнит output
    this.#value = ''
    // очистить значение
    this.#isDot = false
    this.#output()
  }

  static result = () => {
    // В #value положим строку, созданную от выполнения функции eval (выполнение js-кода). Результат выполнения функции будет число, которое преобразуем в строку, т.к. соncat работает только со строкой
    this.#value = String(eval(this.#value))
    // положит из актуального #value значение в output тег
    this.#output()
  }

  static #save = () => {
    // сохраняет значение в хранилище
    window.localStorage.setItem(this.#NAME, this.#value)
  }

  static #load = () => {
    // подгружает из хранилища getItem или выдает пустую строку
    this.#value =
      window.localStorage.getItem(this.#NAME) || ''
  }

  // техническая  функция для инициализации калькулятора
  static innit = () => {
    this.#load()
    this.#output()
    console.log('Calc is init')
  }
}

window.calc = Calc
