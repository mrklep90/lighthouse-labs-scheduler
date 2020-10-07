import React from "react";
import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";
import "@testing-library/jest-dom";
import Application from "components/Application";

afterEach(cleanup);

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);
  
  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  
  // 3. Click the "Edit" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );
  
  fireEvent.click(queryByAltText(appointment, "Edit"));
  
  // 4. Enter a new name.
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Michael Klepac" }
  });
  
  // 5. Click the "Save" button on the confirmation.
  fireEvent.click(getByText(appointment, "Save"));
  
  // 6. Check that the element with the text "Saving" is displayed.
  expect(getByText(appointment, /Saving/i)).toBeInTheDocument();
  
  // 7. Wait until the element with the text "Michael Klepac" is displayed.
  await waitForElement(() => getByText(appointment, "Michael Klepac"));
  
  // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
  const day = getAllByTestId(container, "day").find(day => 
    queryByText(day, "Monday") 
  );
  
  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

});
  