/**
 * toBe()比较数值是否相等
 * not.toBe()比较数值是否不相等
 */
test('2+2=4', () => {
    expect(2 + 2).toBe(4);
});

/**
 * toEqual()比较对象是否相等，会比较对象中的每一个属性
 * not.toEqual()，比较对象是否不相等
 */
test('比较对象', () => {
    const data = { one: 1 };
    data['two'] = 2;
    expect(data).toEqual({ one: 1, two: 2});
});

/**
 * undefined, null, defined, true, false
 */
test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
});
test('0', () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
});

/**
 * 对整数的测试
 */
test('2+2', () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3); // 大于
    expect(value).toBeGreaterThanOrEqual(3.5); // 大于等于
    expect(value).toBeLessThan(5); // 小于
    expect(value).toBeLessThanOrEqual(4.5); // 小于等于

    expect(value).toBe(4);
    expect(value).toEqual(4);
});

/**
 * 对小数的测试
 */
test('小数', () => {
    const value = 0.1 + 0.2;
    expect(value).not.toBe(0.3); // 不可以用toBe进行小数判断，用toBeCloseTo()
    expect(value).toBeCloseTo(0.3);
});

/**
 * 对字符串的测试
 */
test('字符串', () => {
    expect('team').not.toMatch(/I/); // 字符串中没有字母I
    expect('Christoph').toMatch(/stop/); // 字符串中包含stop
});

/**
 * 对数组的测试
 */
test('数组', () => {
    const shoppingList = [
        'diapers',
        'kleenex', 
        'trash bags', 
        'paper towels', 
        'beer',
    ];
    expect(shoppingList).toContain('beer');
    expect(shoppingList.length).toBe(5);
});

/**
 * 对异常的测试
 */
test('异常', () => {
    function compileCode() {
        throw new Error('something wrong.');
    }
    expect(compileCode).toThrow();
    expect(compileCode).toThrow(Error);

    expect(compileCode).toThrow('something wrong.');
    expect(compileCode).toThrow(/wrong/);
});