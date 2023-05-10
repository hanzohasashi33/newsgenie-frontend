import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PostComment from "../PostComment";

describe("PostComment", () => {
  it("shows error message if form is submitted with empty comment", () => {
    const props = {
      article: { _id: "123" },
      token: { user: { id: "456", email: "test@example.com" } },
    };
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <PostComment {...props} />
      </MemoryRouter>
    );

    const submitButton = getByText("Add Comment");
    fireEvent.click(submitButton);

    const errorMessage = getByText("please fill in all the fields correctly");
    expect(errorMessage).toBeInTheDocument();
  });
});
