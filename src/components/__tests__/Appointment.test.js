import React from "react";

import { render, cleanup, prettyDOM } from "@testing-library/react";
import "@testing-library/jest-dom";

import Appointment from "components/Appointment";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders Appointment component without crashing", () => {
    const { container } = render(<Appointment />);
  });
});
