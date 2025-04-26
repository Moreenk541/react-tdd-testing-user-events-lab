import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "../App";

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);

  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);

  const techCheckbox = screen.getByRole('checkbox', { name: /tech/i });
  const travelCheckbox = screen.getByRole('checkbox', { name: /travel/i });
  const foodCheckbox = screen.getByRole('checkbox', { name: /food/i });

  expect(techCheckbox).toBeInTheDocument();
  expect(travelCheckbox).toBeInTheDocument();
  expect(foodCheckbox).toBeInTheDocument();
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);

  const techCheckbox = screen.getByRole('checkbox', { name: /tech/i });
  const travelCheckbox = screen.getByRole('checkbox', { name: /travel/i });
  const foodCheckbox = screen.getByRole('checkbox', { name: /food/i });

  expect(techCheckbox).not.toBeChecked();
  expect(travelCheckbox).not.toBeChecked();
  expect(foodCheckbox).not.toBeChecked();
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />);

  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });

  fireEvent.change(nameInput, { target: { value: "Alice" } });
  fireEvent.change(emailInput, { target: { value: "alice@example.com" } });

  expect(nameInput).toHaveValue("Alice");
  expect(emailInput).toHaveValue("alice@example.com");
});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />);

  const techCheckbox = screen.getByRole('checkbox', { name: /tech/i });
  const travelCheckbox = screen.getByRole('checkbox', { name: /travel/i });

  // Initially unchecked
  expect(techCheckbox).not.toBeChecked();
  expect(travelCheckbox).not.toBeChecked();

  // Click to check
  fireEvent.click(techCheckbox);
  fireEvent.click(travelCheckbox);

  expect(techCheckbox).toBeChecked();
  expect(travelCheckbox).toBeChecked();

  // Click again to uncheck
  fireEvent.click(techCheckbox);

  expect(techCheckbox).not.toBeChecked();
  expect(travelCheckbox).toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />);

  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.change(nameInput, { target: { value: "Alice" } });
  fireEvent.change(emailInput, { target: { value: "alice@example.com" } });
  fireEvent.click(submitButton);

  const thankYouMessage = screen.getByRole('alert');

  expect(thankYouMessage).toHaveTextContent("Thank you, Alice! You've signed up successfully.");
});
