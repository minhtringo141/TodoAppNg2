/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TodoDataService } from './todo-data.service';
import { Todo } from './todo';
describe('TodoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoDataService]
    });
  });

  it('should ...', inject([TodoDataService], (service: TodoDataService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getAllTodo()', () => {
    it('should return an empty array by default', inject([TodoDataService], (service: TodoDataService) => {
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('Shold return all todos', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({ title: 'Hello1', complete: true });
      let todo2 = new Todo({ title: 'Hello2', complete: false });
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }))
  });

  describe('#save(todo)', () => {
    it('Should automatically assign an incrementing id', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({ title: 'Hello1', complete: false });
      let todo2 = new Todo({ title: 'Hello2', complete: true });
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getTodoById(1)).toEqual(todo1);
      expect(service.getTodoById(2)).toEqual(todo2);
    }));
  });


  describe('#deleteTodoById(id)', () => {
    it('should remove todo with the corresponding id', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({ title: 'Hello1', complete: false });
      let todo2 = new Todo({ title: 'Hello2', complete: false });
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(1);
      expect(service.getAllTodos()).toEqual([todo2]);
      service.deleteTodoById(2);
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should not removing anything if todo with corresponding id is not found', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({ title: 'Hello1', complete: true });
      let todo2 = new Todo({ title: 'Hello2', complete: false });
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(3);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }))
  });

  describe('#updateTodoById(id, values)', () => {
    it('should return todo with the corresponding id and updated data', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({ title: 'Hello1', complete: false });
      service.addTodo(todo1);
      let updatedTodo = service.updateTodoById(1, {
        title: 'New Title'
      });
      expect(updatedTodo.title).toEqual('New Title');
    }));

    it('should  return null if todo is not found', inject([TodoDataService], (service: TodoDataService) => {
      let todo = new Todo({ title: 'Hello1', complete: false });
      service.addTodo(todo);
      let updatedTodo = service.updateTodoById(2, {
        title: 'New title'
      });
      expect(updatedTodo).toEqual(null);
    }))
  });

  describe('#tonggleTodoComplete(todo)', () => {
    it('should return the updated todo with the reverse complete status', inject([TodoDataService], (service: TodoDataService) => {
      let todo = new Todo({ title: 'Hello1', complete: false });
      service.addTodo(todo);
      let updatedTodo = service.toggleTodoComplete(todo);
      expect(updatedTodo.complete).toEqual(true);
      service.toggleTodoComplete(todo);
      expect(updatedTodo.complete).toEqual(false);
    }));
  });
});