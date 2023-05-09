import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../Navbar";

describe("Navbar", () => {
  test("contains NewsGenie brand name", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    const brandName = screen.getByText("NewsGenie");
    expect(brandName).toBeInTheDocument();
  });

  test("contains Write Article link", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    const writeArticleLink = screen.getByText("Write Article");
    expect(writeArticleLink).toBeInTheDocument();
  });

  test("contains Rankings link", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    const rankingsLink = screen.getByText("Rankings");
    expect(rankingsLink).toBeInTheDocument();
  });

  test("contains Profile link", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    const profileLink = screen.getByText("Profile");
    expect(profileLink).toBeInTheDocument();
  });

  test("contains Sign Out link", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    const signOutLink = screen.getByText("Sign Out");
    expect(signOutLink).toBeInTheDocument();
  });
});
