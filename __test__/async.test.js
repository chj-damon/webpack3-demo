import async from '../utils/async';
// 将action单独定义，然后在测试的时候引入进行测试
/**
 * 
import {createAction} from 'redux-actions';
import {ADD_APPLE} from 'AppConstants.js';

export const addApple = createAction(
    ADD_APPLE,
    (apple) => ({apple}),
);

*
*
import {addApple} from 'Actions.js';
import {ADD_APPLE} from 'AppConstants.js';

describe('Actions', () => {
    describe('addApple', () => {
        it('should create action with passed data', () => {
            const apple = {kind: 'red', isRipe: true};
            expect(addApple(apple)).toEqual({type: ADD_APPLE, payload: {apple}})
        });
    });
});
 * 
 * 
 */

test('异步测试', async () => {
    expect.assertions(4);
    try {
        const result = await async();
        expect(result.success).toBe(true);
        expect(result.data.length).toBe(1);
        expect(result.data[0].name).toMatch(/规则场景/);
        expect(result.data[0].value).toMatch(/scene/);
    } catch (e) {
        expect(e.toString()).toMatch('error');
    }
});