const Validator = require('../Validator');
const expect = require('chai').expect;

describe('testing-configuration-logging/unit-tests', () => {
  describe('Validator', () => {
    it('Строковый верный объект', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 10,
          max: 20,
        },
      });
      const obj = {name: 'antoine griezmann'};
      const errors = validator.validate(obj);

      expect(errors).to.have.length(0);
    });

    it('Строковый объект: верные пограничные значения (min)', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 10,
          max: 20,
        },
      });
      const obj = {name: 'griezmann.'};
      const errors = validator.validate(obj);

      expect(errors).to.have.length(0);
    });

    it('Строковый объект: верные значения (mid)', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 10,
          max: 20,
        },
      });
      const obj = {name: 'antoine griezmann'};
      const errors = validator.validate(obj);

      expect(errors).to.have.length(0);
    });

    it('Строковый объект: верные пограничные значения (max)', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 10,
          max: 20,
        },
      });
      const obj = {name: 'mr.antoine griezmann'};
      const errors = validator.validate(obj);

      expect(errors).to.have.length(0);
    });

    it('Строковый объект с меньшей длинной', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 10,
          max: 20,
        },
      });
      const obj = {name: 'm.antoine'};
      const errors = validator.validate(obj);

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0]).to.have.property('error').and.to.be.equal('too short, expect 10, got 9');
    });

    it('Строковый объект с большей длинной', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 10,
          max: 20,
        },
      });
      const obj = {name: 'antoine antoine antoi'};
      const errors = validator.validate(obj);

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0]).to.have.property('error').and.to.be.equal('too long, expect 20, got 21');
    });

    it('Проверка полей неверного типа number-string', () => {
      const validator = new Validator({
        age: {
          type: 'number',
          min: 18,
          max: 27,
        },
      });

      const obj = {age: 'Lalala'};
      const errors = validator.validate(obj);
      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('age');
      expect(errors[0]).to.have.property('error').and.to.be.equal('expect number, got string');
    });

    it('Проверка полей неверного типа string-number', () => {
      const validator = new Validator({
        age: {
          type: 'string',
          min: 18,
          max: 27,
        },
      });

      const obj = {age: 12};
      const errors = validator.validate(obj);
      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('age');
      expect(errors[0]).to.have.property('error').and.to.be.equal('expect string, got number');
    });

    it('Проверка полей неверного типа number-array', () => {
      const validator = new Validator({
        age: {
          type: 'number',
          min: 18,
          max: 27,
        },
      });

      const obj = {age: [1, 2]};
      const errors = validator.validate(obj);
      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('age');
      expect(errors[0]).to.have.property('error').and.to.be.equal('expect number, got array');
    });

    it('Проверка числовых полей: верное пограничное значение (min)', () => {
      const validator = new Validator({
        age: {
          type: 'number',
          min: 18,
          max: 27,
        },
      });

      const obj = {age: 18};
      const errors = validator.validate(obj);
      expect(errors).to.have.length(0);
    });

    it('Проверка числовых полей: верное значение (mid)', () => {
      const validator = new Validator({
        age: {
          type: 'number',
          min: 18,
          max: 27,
        },
      });

      const obj = {age: 25};
      const errors = validator.validate(obj);
      expect(errors).to.have.length(0);
    });

    it('Проверка числовых полей: верное пограничное значение (max)', () => {
      const validator = new Validator({
        age: {
          type: 'number',
          min: 18,
          max: 27,
        },
      });

      const obj = {age: 27};
      const errors = validator.validate(obj);
      expect(errors).to.have.length(0);
    });

    it('Проверка числовых полей: не верное пограничное значение (min)', () => {
      const validator = new Validator({
        age: {
          type: 'number',
          min: 18,
          max: 27,
        },
      });

      const obj = {age: 17};
      const errors = validator.validate(obj);
      expect(errors).to.have.length(1);

      expect(errors[0]).to.have.property('field').and.to.be.equal('age');
      expect(errors[0]).to.have.property('error').and.to.be.equal('too little, expect 18, got 17');
    });

    it('Проверка числовых полей: не верное пограничное значение (max)', () => {
      const validator = new Validator({
        age: {
          type: 'number',
          min: 18,
          max: 27,
        },
      });

      const obj = {age: 28};
      const errors = validator.validate(obj);
      expect(errors).to.have.length(1);

      expect(errors[0]).to.have.property('field').and.to.be.equal('age');
      expect(errors[0]).to.have.property('error').and.to.be.equal('too big, expect 27, got 28');
    });

    it('Сложный верный объект', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 10,
          max: 20,
        },
        age: {
          type: 'number',
          min: 0,
          max: 100,
        },
      });
      const obj = {name: 'antoine griezmann', age: 31};
      const errors = validator.validate(obj);

      expect(errors).to.have.length(0);
    });

    it('Сложный неверынй объект: ошибки в двух полях (min)', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 10,
          max: 20,
        },
        age: {
          type: 'number',
          min: 0,
          max: 100,
        },
      });
      const obj = {name: 'antoine', age: -1};
      const errors = validator.validate(obj);

      expect(errors).to.have.length(2);

      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0]).to.have.property('error').and.to.be.equal('too short, expect 10, got 7');

      expect(errors[1]).to.have.property('field').and.to.be.equal('age');
      expect(errors[1]).to.have.property('error').and.to.be.equal('too little, expect 0, got -1');
    });

    it('Сложный неверынй объект: ошибки в двух полях (max)', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 10,
          max: 20,
        },
        age: {
          type: 'number',
          min: 0,
          max: 100,
        },
      });
      const obj = {name: 'antoine antoine antoi', age: 101};
      const errors = validator.validate(obj);

      expect(errors).to.have.length(2);

      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0]).to.have.property('error').and.to.be.equal('too long, expect 20, got 21');

      expect(errors[1]).to.have.property('field').and.to.be.equal('age');
      expect(errors[1]).to.have.property('error').and.to.be.equal('too big, expect 100, got 101');
    });

    it('Сложный неверынй объект: ошибки в одном поле', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 10,
          max: 20,
        },
        age: {
          type: 'number',
          min: 0,
          max: 100,
        },
      });
      const obj = {name: 'antoine antoine', age: 101};
      const errors = validator.validate(obj);

      expect(errors).to.have.length(1);

      expect(errors[0]).to.have.property('field').and.to.be.equal('age');
      expect(errors[0]).to.have.property('error').and.to.be.equal('too big, expect 100, got 101');
    });
  });


  it('Сложный неверынй объект: ошибки в одном поле', () => {
    const validator = new Validator({
      name: {
        type: 'string',
        min: 10,
        max: 20,
      },
      age: {
        type: 'number',
        min: 0,
        max: 100,
      },
    });
    const obj = {name: 'antoine', age: 100};
    const errors = validator.validate(obj);

    expect(errors).to.have.length(1);

    expect(errors[0]).to.have.property('field').and.to.be.equal('name');
    expect(errors[0]).to.have.property('error').and.to.be.equal('too short, expect 10, got 7');
  });
});
