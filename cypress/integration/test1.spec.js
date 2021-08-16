/// <reference types="cypress" />

describe("todo app Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("test visit the page", () => {
    cy.get("h1").contains("Login");
    cy.then(() => {
      expect(window.localStorage.getItem("token")).to.be.null;
    });
  });
  it("test login with credentials", () => {
    cy.get("input[id=email]").type("quang@gmail.com");
    cy.get("input[id=password]").type("123");
    cy.get("button").contains("Submit").should("not.be.disabled").click();
  });
});

describe("testing with credential", () => {
  beforeEach(() => {
    cy.then(() => {
      window.localStorage.setItem(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTY5YzdiZTQ4MTEyNDJhODFlMGEzMyIsImlhdCI6MTYyODg3MTgwM30.74M-QlB7sJ7fm9edvwl1L1ylT8-n93r3iM5pLsexZV0"
      );
    }).then(() => {
      cy.visit("/");
    });
  });

  it("Check for logout button", () => {
    cy.get("ul li a").contains("Logout");
  });
  it("test content page with mock user", () => {
    cy.get("p").contains("this is my first task");
    cy.get("button").contains("Edit");
    cy.get("button").contains("Delete");
  });
});
