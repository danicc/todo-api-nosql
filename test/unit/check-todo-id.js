import sinon from 'sinon';
import { assert } from 'chai';
import checkTodoId from '../../middleware/check-todo-id';
import TodoModel from '../../models/todo';

describe('Check Todo Id Unit Tests:', () => {
  describe('checkTodoId', () => {
    it('it should return status 400 and Invalid Id', (done) => {
      const req = {};
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
      };
      const next = sinon.spy();
      const id = '2';

      checkTodoId(req, res, next, id);

      assert.isTrue(res.status.calledWith(400));
      assert.isTrue(res.send.calledWith({ message: 'Invalid Id' }), `Bad message ${res.send.args[0][0].message}`);
      done();
    });
    it('it should return status 404 and Not Found', (done) => {
      const req = {};
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
      };
      const next = sinon.spy();
      const id = '5a762f107d90a60e96d7bd37';

      sinon.stub(TodoModel, 'findById').yields(null, null);

      checkTodoId(req, res, next, id);
      assert.isTrue(res.status.calledWith(404));
      assert.isTrue(res.send.calledWith({ message: 'Not Found' }), `Bad message ${res.send.args[0][0].message}`);
      done();
    });
  });
});

