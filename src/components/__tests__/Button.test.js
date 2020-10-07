import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Button from "components/Button";

afterEach(cleanup);
//---------------------------------------------------------------------------------------
// Test One
//---------------------------------------------------------------------------------------
it("renders without crashing", () => {
  render(<Button />);
});
//---------------------------------------------------------------------------------------
// Test Two
//---------------------------------------------------------------------------------------
it("renders its `children` prop as text", () => {
  const { getByText } = render(<Button>Default</Button>);
  expect(getByText("Default")).toBeInTheDocument();
});
//---------------------------------------------------------------------------------------
// Test Three
//---------------------------------------------------------------------------------------
it("renders a default button style", () => {
  const { getByText } = render(<Button>Default</Button>);
  expect(getByText("Default")).toHaveClass("button");
});
//---------------------------------------------------------------------------------------
// Test Four
//---------------------------------------------------------------------------------------
it("renders a confirm button", () => {
  const { getByText } = render(<Button confirm>Confirm</Button>);
  expect(getByText("Confirm")).toHaveClass("button--confirm");
});
//---------------------------------------------------------------------------------------
// Test Five
//---------------------------------------------------------------------------------------
it("renders a danger button", () => {
  const { getByText } = render(<Button danger>Danger</Button>);
  expect(getByText("Danger")).toHaveClass("button--danger");
});
//---------------------------------------------------------------------------------------
// Test Six
//---------------------------------------------------------------------------------------
it("renders a clickable button", () => {
  const handleClick = jest.fn();
  
  const { getByText } = render(
    <Button onClick={handleClick}>Clickable</Button>
  );

  const button = getByText("Clickable");

  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);

});
//---------------------------------------------------------------------------------------
// Test Seven
//---------------------------------------------------------------------------------------
it("renders a disabled button", () => {
  const handleClick = jest.fn();
  
  const { getByText } = render(
    <Button disabled onClick={handleClick}>
      Disabled
    </Button>
  );

  const button = getByText("Disabled");

  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(0);

});
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
