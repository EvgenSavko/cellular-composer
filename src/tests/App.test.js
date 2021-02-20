import { render, screen } from "@testing-library/react";
import App from "../App";
import Btn from "@Components/Btn/Btn";

test("renders header title", () => {
  render(<App />);
  const linkElement = screen.getByText(/cellular composer/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders btn title", () => {
  render(<Btn title={"Test"} />);
  const btnElement = screen.getByText(/test/i);
  expect(btnElement).toBeInTheDocument();
});
