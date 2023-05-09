import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NewsCard from "../NewsCard";

describe("NewsCard", () => {
  const user = { id: 1, email: "test@example.com" };
  const newsArticle = {
    _id: "1",
    headline: "Test Headline",
    genre: "Test Genre",
    description: "This is a test description that is longer than 33 characters.",
  };

  it("renders news article headline, genre, and first 33 characters of the description", () => {
    render(
      <MemoryRouter>
        <NewsCard newsArticle={newsArticle} user={user} />
      </MemoryRouter>
    );

    expect(screen.getByText(newsArticle.headline)).toBeInTheDocument();
    expect(screen.getByText(newsArticle.genre)).toBeInTheDocument();
    expect(screen.getByText(newsArticle.description.substr(0, 33)+" .....")).toBeInTheDocument();
  });
});
