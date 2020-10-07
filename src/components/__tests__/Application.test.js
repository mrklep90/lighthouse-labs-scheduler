import React from "react";
import axios from "axios";
import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId , getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";
import "@testing-library/jest-dom";
import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  //---------------------------------------------------------------------------------------
  // Test One
  //---------------------------------------------------------------------------------------
  it("changes the schedule when a new day is selected", async () => {
    // 1. Render the application
    const { getByText } = render(<Application />);

    // 2. Wait until the text "Monday" is displayed
    await waitForElement(() => getByText("Monday"));

    // 3. Click the element containing the text "Tuesday".
    fireEvent.click(getByText("Tuesday"));

    // 4. Check that the appointment for "Leopold Silvers" is displayed.
    expect(getByText("Leopold Silvers")).toBeInTheDocument();

  });
  //---------------------------------------------------------------------------------------
  // Test Two
  //---------------------------------------------------------------------------------------
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    // 3. Click the "Add" button on the first empty appointment.
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
   
    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, /Saving/i)).toBeInTheDocument();
    
    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    
    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".       
    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday") 
    );
    
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    
  });
  //---------------------------------------------------------------------------------------
  // Test Three --- Moved to Application_3.test.js
  //---------------------------------------------------------------------------------------
  // xit("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  //   // 1. Render the Application.
  //   const { container } = render(<Application />);
   
  //   // 2. Wait until the text "Archie Cohen" is displayed.
  //   await waitForElement(() => getByText(container, "Archie Cohen"));
    
  //   // 3. Click the "Delete" button on the booked appointment.
  //   const appointment = getAllByTestId(container, "appointment").find(
  //     appointment => queryByText(appointment, "Archie Cohen")
  //   );
    
  //   fireEvent.click(queryByAltText(appointment, "Delete"));
    
  //   // 4. Check that the confirmation message is shown.
  //   expect(getByText(appointment, /Delete Appointment/i)).toBeInTheDocument();
    
  //   // 5. Click the "Confirm" button on the confirmation.
  //   fireEvent.click(getByText(appointment, "Confirm"));
    
  //   // 6. Check that the element with the text "Deleting" is displayed.
  //   expect(getByText(appointment, /Deleting/i)).toBeInTheDocument();
    
  //   // 7. Wait until the element with the "Add" button is displayed.
  //   await waitForElement(() => getByAltText(appointment, "Add"));
  
  //   // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  //   const day = getAllByTestId(container, "day").find(day => 
  //     queryByText(day, "Monday") 
  //   );
    
  //   // The spot value increases from 0 to 1; starts this test at 0 due to previous test?!? 
  //   expect(getByText(day, '2 spots remaining')).toBeInTheDocument()
    
  // });
  //---------------------------------------------------------------------------------------
  // Test Four --- Moved to Application_4.test.js
  //---------------------------------------------------------------------------------------
  // xit("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  //   // 1. Render the Application.
  //   const { container } = render(<Application />);
    
  //   // 2. Wait until the text "Archie Cohen" is displayed.
  //   await waitForElement(() => getByText(container, "Archie Cohen"));
    
  //   // 3. Click the "Edit" button on the booked appointment.
  //   const appointment = getAllByTestId(container, "appointment").find(
  //     appointment => queryByText(appointment, "Archie Cohen")
  //   );
    
  //   fireEvent.click(queryByAltText(appointment, "Edit"));
    
  //   // 4. Enter a new name.
  //   fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
  //     target: { value: "Michael Klepac" }
  //   });
    
  //   // 5. Click the "Save" button on the confirmation.
  //   fireEvent.click(getByText(appointment, "Save"));
    
  //   // 6. Check that the element with the text "Saving" is displayed.
  //   expect(getByText(appointment, /Saving/i)).toBeInTheDocument();
    
  //   // 7. Wait until the element with the text "Michael Klepac" is displayed.
  //   await waitForElement(() => getByText(appointment, "Michael Klepac"));
    
  //   // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
  //   const day = getAllByTestId(container, "day").find(day => 
  //     queryByText(day, "Monday") 
  //   );
    
  //   expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  // });
  //---------------------------------------------------------------------------------------
  // Test Five
  //---------------------------------------------------------------------------------------
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    
    // 1. Render the Application.
    const { container } = render(<Application />);
    
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    // 3. Click the "Add" button on the first empty appointment.
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Return error when attempting to save.
    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Sorry, your appointment could not be saved at this time. Please try again later.")).toBeInTheDocument();
    
  });
  //---------------------------------------------------------------------------------------
  // Test Six
  //---------------------------------------------------------------------------------------
  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);
   
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    fireEvent.click(queryByAltText(appointment, "Delete"));
    
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, /Delete Appointment/i)).toBeInTheDocument();
    
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));
    
    // 6. Return error when attempting to delete
    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Sorry, your appointment could not be deleted at this time. Please try again later.")).toBeInTheDocument();
  });

});