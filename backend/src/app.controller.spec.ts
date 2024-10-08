import { Test, TestingModule } from '@nestjs/testing'; // Import the testing utilities from NestJS
import { AppController } from './app.controller'; // Import the AppController to be tested
import { AppService } from './app.service'; // Import the AppService, which is a dependency for AppController

//----------------------it is unit testing file for the app.controller------
//i can write these unit testing for my article components for testing.

/*********************************************
 * This block describes the test suite for the `AppController`.
 * - It groups together tests related to the `AppController`.
 *********************************************/
describe('AppController', () => {
  let appController: AppController; // Declare a variable to hold the instance of AppController

  /*********************************************
   * `beforeEach` is a lifecycle method that runs before each test case.
   * - It sets up the testing environment before each test.
   * - It creates a TestingModule using `Test.createTestingModule()`.
   * - The TestingModule is configured with the controllers and providers needed for the tests.
   * - After compiling, it retrieves an instance of `AppController` and assigns it to `appController`.
   *********************************************/
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController], // Define the controller that will be tested
      providers: [AppService], // Define the service that the controller depends on
    }).compile(); // Compile the module to create an instance of the controller and its dependencies

    appController = app.get<AppController>(AppController); // Get the instance of `AppController` from the compiled module
  });

  /*********************************************
   * This block describes the specific test for the root route.
   * - It defines a test case to check if the `getHello()` method of `AppController`
   *   returns the string "Hello World!".
   *********************************************/
  describe('root', () => {
    /*********************************************
     * Test case: it should return "Hello World!".
     * - This test checks if the `getHello()` method in `AppController`
     *   returns the expected string "Hello World!".
     *********************************************/
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!'); // Expect the method `getHello()` to return "Hello World!"
    });
  });
});
