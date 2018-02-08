import { assert } from 'chai';
import request from 'supertest';
import server from '../../server';
import TodoModel from '../../models/todo';
import UserModel from '../../models/user';

const agent = request.agent(server);
let authorizationHeader = {};

describe('Integration Todos', () => {
  before((done) => {
    UserModel.remove({}, () => {
      // runs before all tests in this block
      const user = {
        email: 'test@test.com',
        displayName: 'test',
        password: 'test',
      };
      agent
        .post('/api/signup')
        .send(user)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, 'token');
          authorizationHeader = { Authorization: `Bearer ${res.body.token}`, 'Content-Type': 'application/json' };
          done();
        });
    });
  });
  beforeEach((done) => {
    TodoModel.remove({}, () => {
      done();
    });
  });
  /*
  * Test the /GET
  */
  describe('GET /todos', () => {
    it('it should GET all the todo items', (done) => {
      agent
        .get('/api/todos')
        .set(authorizationHeader)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body.todos);
          assert.isEmpty(res.body.todos);
          done();
        });
    });
  });
  /*
  * Test the /Get/id
  */
  describe('Get /todo/id', () => {
    it('it should Get a todo by id', (done) => {
      const todo = new TodoModel({
        name: 'test name',
        description: 'test description',
        dueDate: Date.now(),
        completed: false,
      });
      todo.save((error, todoStored) => {
        agent
          .get(`/api/todos/${todoStored.id}`)
          .set(authorizationHeader)
          .send(todoStored)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.todo.name, todoStored.name);
            assert.equal(res.body.todo.description, todoStored.description);
            assert.equal(res.body.todo.completed, todoStored.completed);
            assert.equal(res.body.todo.dueDate, todoStored.dueDate.toISOString());
            done();
          });
      });
    });
  });
  /*
  * Test the /POST
  */
  describe('/POST todo', () => {
    it('should POST a todo', (done) => {
      const createParams = {
        name: 'test name',
        description: 'test description',
        dueDate: new Date().toISOString(),
        completed: false,
      };
      agent
        .post('/api/todos')
        .set(authorizationHeader)
        .send(createParams)
        .end((error, res) => {
          assert.equal(res.status, 201);
          assert.equal(res.body.todo.name, createParams.name);
          assert.equal(res.body.todo.description, createParams.description);
          assert.equal(res.body.todo.completed, createParams.completed);
          assert.equal(res.body.todo.dueDate, createParams.dueDate);
          done();
        });
    });
    it('it should not POST a todo without name field', (done) => {
      const todoItem = {
        description: 'integration test',
        completed: false,
        dueDate: Date.now(),
      };
      agent
        .post('/api/todos')
        .set(authorizationHeader)
        .send(todoItem)
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.isObject(res.body);
          assert.propertyVal(res.body, 'message', 'Name is required');
          done();
        });
    });
  });
  /*
  * Test the /PUT
  */
  describe('PUT /todos/id', () => {
    it('it should update a todo', (done) => {
      const todoItem = new TodoModel({
        name: 'test name',
        description: 'test description',
        dueDate: Date.now(),
        completed: false,
      });
      const updateParams = {
        name: 'name updated',
        description: 'description updated',
        dueDate: Date.now(),
        completed: true,
      };
      todoItem.save((error, todoStored) => {
        agent
          .put(`/api/todos/${todoStored.id}`)
          .set(authorizationHeader)
          .send(updateParams)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.todo.name, updateParams.name);
            assert.equal(res.body.todo.description, updateParams.description);
            assert.equal(res.body.todo.completed, updateParams.completed);
            done();
          });
      });
    });
  });
});
