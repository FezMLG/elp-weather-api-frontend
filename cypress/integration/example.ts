describe("example", () => {
  it("shows data", () => {
    // given
    websiteIsOpened();

    // then
    const list = [
      "lat",
      "lon",
      "temp",
      "weather-desc",
      "temp_feel",
      "pressure",
      "humidity",
      "wind_speed",
      "wind_dir",
      "sunrise",
      "sunset",
      "ob_time",
      "source",
    ];
    checkForData(list);
  });

  it("shows data when changing source", () => {
    // given
    websiteIsOpened();

    // when
    cy.get(`#changeSourceSwitch`).click();

    // then
    const list = [
      "lat",
      "lon",
      "temp",
      "weather-desc",
      "temp_feel",
      "pressure",
      "humidity",
      "wind_speed",
      "wind_dir",
      "sunrise",
      "sunset",
      "ob_time",
      "source",
    ];
    checkForData(list);
  });

  it("shows data when changing location", () => {
    // given
    websiteIsOpened();

    // when
    cy.get(`#lat`).clear().type("32");
    cy.get(`#lon`).clear().type("45");
    cy.get(`[role=submit]`).click();

    // then
    cy.get(`#lat`).should("have.value", 32);
    cy.get(`#lon`).should("have.value", 45);
    const list = [
      "lat",
      "lon",
      "temp",
      "weather-desc",
      "temp_feel",
      "pressure",
      "humidity",
      "wind_speed",
      "wind_dir",
      "sunrise",
      "sunset",
      "ob_time",
      "source",
    ];
    checkForData(list);
  });
});

function websiteIsOpened() {
  cy.visit("http://localhost:3000");
}

function checkForData(dataObject: Array<String>) {
  dataObject.forEach((element) => {
    cy.get(`[data-cy=${element}]`).should("be.not.empty");
  });
}
