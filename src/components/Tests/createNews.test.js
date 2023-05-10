import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Create from "../createNews";

describe("Create News Page", () => {
  test("renders the Create News page", () => {
    render(
      <MemoryRouter>
        <Create />
      </MemoryRouter>
    );
    const pageTitle = screen.getByText("Create new news article");
    expect(pageTitle).toBeInTheDocument();
  });

  test("form requires all fields to be filled", () => {
    render(
      <MemoryRouter>
        <Create />
      </MemoryRouter>
    );
    const submitButton = screen.getByRole("button", { name: "Add news article" });
    fireEvent.click(submitButton);
    const formError = screen.getByText("please fill in all the fields correctly");
    expect(formError).toBeInTheDocument();
  });

  test("form submits when all fields are filled", () => {
    const mockFetch = jest.fn();
    global.fetch = mockFetch;

    render(
      <MemoryRouter>
        <Create token={{ user: { id: 1, email: "test@example.com" } }} />
      </MemoryRouter>
    );
    
    const headlineInput = screen.getByLabelText("Headline:");
    fireEvent.change(headlineInput, { target: { value: "Test headline" } });

    const descriptionInput = screen.getByLabelText("News Article:");
    fireEvent.change(descriptionInput, { target: { value: "Test article description" } });

    const genreInput = screen.getByLabelText("Genre:");
    fireEvent.change(genreInput, { target: { value: "Test genre" } });

    const submitButton = screen.getByRole("button", { name: "Add news article" });
    fireEvent.click(submitButton);

    expect(mockFetch).toHaveBeenCalledWith("http://localhost:8000/create_article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: { id: 1, email: "test@example.com" },
        headline: "Test headline",
        description: "Test article description",
        genre: "Test genre",
        rating: 0
      }),
    });
  });
});

