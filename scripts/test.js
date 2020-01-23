const CreateConstant = require('./constant.js');

describe('CreateConstant', function() {
    
    it('should exist', function() {
        expect(CreateConstant).toBeDefined();
    });
    
    it('should be a function', function() {
        expect(CreateConstant).toBeInstanceOf(Function);
    });
    test('item counter is set to 0', () => {
      expect(new CreateConstant().item_counter).toBe(0);
    });
    
});