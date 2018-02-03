import sinon from 'sinon';
import { assert } from 'chai';
import TodoController from '../../controllers/todo';

describe('Todo Controller Unit Tests:', () => {
  describe('Get /todos/2', () => {
    it('it should validate todo item id', () => {
      const req = {
        params: {
          id: '2',
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
      };

      TodoController.GetTodo(req, res);
      assert.isTrue(res.status.calledWith(400));
      assert.isTrue(res.send.calledWith({ message: 'Invalid Id' }), `Bad message ${res.send.args[0][0].message}`);
    });
  });
});

